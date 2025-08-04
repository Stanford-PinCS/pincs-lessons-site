"use client";
import { Puck, Data } from "@measured/puck";
import "@measured/puck/puck.css";
import { useState, useEffect, useRef } from "react";
import { config } from "./puck.config";
import JSZip from "jszip";
import { saveAs } from "file-saver";
import landingPageTemplate from "@/template/auto-landing-page.template";
import lessonPageTemplate from "@/template/auto-lesson.template";

export default function Editor() {
  type Slide = { id: number; data: Data };

  const [slides, setSlides] = useState<Slide[]>([
    { id: 0, data: { content: [], root: {} } },
  ]);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [isMounted, setIsMounted] = useState(false);
  const [isSaveModalOpen, setIsSaveModalOpen] = useState(false);
  const [lessonTitle, setLessonTitle] = useState("");
  const [lessonDescription, setLessonDescription] = useState("");
  const [teacherResources, setTeacherResources] = useState("");
  const [confirmingDelete, setConfirmingDelete] = useState(false);
  const saveTimeout = useRef<NodeJS.Timeout | null>(null);
  const secondsBeforeAutoSave = 5; // It will wait 5 seconds after they stop changing stuff to update the sessionStorage.

  useEffect(() => {
    setIsMounted(true);
    const savedSlides = sessionStorage.getItem("slides");
    const savedIndex = sessionStorage.getItem("currentSlideIndex");
    const savedTitle = sessionStorage.getItem("lessonTitle");
    const savedDescription = sessionStorage.getItem("lessonDescription");
    const savedResources = sessionStorage.getItem("teacherResources");

    if (savedSlides) {
      const parsedSlides = JSON.parse(savedSlides);
      setSlides(
        parsedSlides.map((data: Data) => ({ id: Math.random(), data }))
      );
    }

    if (savedIndex) {
      setCurrentSlideIndex(parseInt(savedIndex, 10));
    }
    if (savedTitle) {
      setLessonTitle(savedTitle);
    }
    if (savedDescription) {
      setLessonDescription(savedDescription);
    }
    if (savedResources) {
      setTeacherResources(savedResources);
    }
  }, []);

  useEffect(() => {
    function saveToSessionStorage() {
      sessionStorage.setItem(
        "slides",
        JSON.stringify(slides.map((slide) => slide.data))
      );
      sessionStorage.setItem("currentSlideIndex", String(currentSlideIndex));
      sessionStorage.setItem("lessonTitle", lessonTitle);
      sessionStorage.setItem("lessonDescription", lessonDescription);
      sessionStorage.setItem("teacherResources", teacherResources);
      console.count("saved");
    }

    if (isMounted) {
      if (saveTimeout.current) {
        clearTimeout(saveTimeout.current);
      }

      saveTimeout.current = setTimeout(
        saveToSessionStorage,
        secondsBeforeAutoSave * 1000
      );
    }

    return () => {
      if (saveTimeout.current) {
        clearTimeout(saveTimeout.current);
      }
    };
  }, [slides, isMounted, lessonTitle, lessonDescription, teacherResources]);

  const handlePuckChange = (data: Data) => {
    const newSlides = [...slides];
    newSlides[currentSlideIndex] = { ...newSlides[currentSlideIndex], data };
    setSlides(newSlides);
  };

  const insertSlideBefore = () => {
    const newSlide = {
      id: Date.now(),
      data: { content: [], root: {} } as Data,
    };
    const newSlides = [...slides];
    newSlides.splice(currentSlideIndex, 0, newSlide);
    setSlides(newSlides);
  };

  const insertSlideAfter = () => {
    const newSlide = {
      id: Date.now(),
      data: { content: [], root: {} } as Data,
    };
    const newSlides = [...slides];
    newSlides.splice(currentSlideIndex + 1, 0, newSlide);
    setSlides(newSlides);
    setCurrentSlideIndex(currentSlideIndex + 1);
  };

  const deleteSlide = () => {
    if (slides.length > 1) {
      if (confirmingDelete) {
        const newSlides = slides.filter(
          (_, index) => index !== currentSlideIndex
        );
        setSlides(newSlides);
        setCurrentSlideIndex((prev) => (prev > 0 ? prev - 1 : 0));
        setConfirmingDelete(false);
      } else {
        setConfirmingDelete(true);
      }
    }
  };

  const prevSlide = () => {
    setCurrentSlideIndex((prev) => (prev > 0 ? prev - 1 : prev));
    setConfirmingDelete(false);
  };

  const nextSlide = () => {
    setCurrentSlideIndex((prev) =>
      prev < slides.length - 1 ? prev + 1 : prev
    );
    setConfirmingDelete(false);
  };

  const toKebabCase = (str: string) =>
    str.trim().toLowerCase().replace(/\s+/g, "-");

  const handleSaveZip = async () => {
    try {
      const zip = new JSZip();
      const folderName = toKebabCase(lessonTitle) || "lesson";
      const folder = zip.folder(folderName);
      if (!folder) throw new Error("Failed to create ZIP folder");

      const lessonJson = JSON.stringify({
        title: lessonTitle,
        description: lessonDescription,
        teacherResources: teacherResources,
        slides: slides.map((slide) => slide.data),
        version: "1.0",
      });

      folder.file("lesson/content.json", lessonJson);
      folder.file("page.tsx", landingPageTemplate);
      folder.file("lesson/page.tsx", lessonPageTemplate);

      const blob = await zip.generateAsync({ type: "blob" });
      saveAs(blob, `${folderName}.zip`);
      setIsSaveModalOpen(false);
    } catch (error) {
      console.error("Error generating ZIP:", error);
    }
  };

  const handleSaveContent = async () => {
    const lessonJson = JSON.stringify({
      title: lessonTitle,
      description: lessonDescription,
      teacherResources: teacherResources,
      slides: slides.map((slide) => slide.data),
      version: "1.0",
    });
    const blob = new Blob([lessonJson], { type: "application/json" });

    if (window && "showSaveFilePicker" in window) {
      // Try to use the file location picker.
      try {
        const showSaveFilePicker = window.showSaveFilePicker as (
          options: any
        ) => Promise<any>;
        const handle = await showSaveFilePicker({
          suggestedName: `content.json`,
          types: [
            {
              description: "JSON Files",
              accept: { "application/json": [".json"] },
            },
          ],
        });
        const writable = await handle.createWritable();
        await writable.write(blob);
        await writable.close();
        setIsSaveModalOpen(false);
      } catch (err) {
        // Handle errors, such as the user canceling the save dialog
        console.error("Error saving file:", err);
      }
    } else {
      // Fallback for browsers that do not support the API
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `content.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      setIsSaveModalOpen(false);
    }
  };

  const parseAndLoadLesson = (contents: string) => {
    try {
      const data = JSON.parse(contents);
      if (data.slides && Array.isArray(data.slides)) {
        setSlides(
          data.slides.map((data: Data, index: number) => ({
            id: index + Math.random(),
            data,
          }))
        );
        setLessonTitle(data.title || "");
        setLessonDescription(data.description || "");
        setTeacherResources(data.teacherResources || "");
        setCurrentSlideIndex(0);
      } else {
        alert("Invalid lesson file format.");
      }
    } catch (error) {
      alert("Error parsing lesson file.");
    }
  };

  const loadLesson = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.name.endsWith(".zip")) {
        // Load in .zip file.
        const reader = new FileReader();
        reader.onload = async (e) => {
          const contents = e.target?.result;
          if (contents) {
            try {
              const zip = await JSZip.loadAsync(contents);
              // Consider all possible paths.
              const lessonFilePaths = Object.keys(zip.files).filter(
                (path) =>
                  !zip.files[path].dir && path.endsWith("/lesson/content.json")
              );
              if (lessonFilePaths.length === 1) {
                // If there's one good path, use it.
                const lessonFile = zip.file(lessonFilePaths[0]);
                if (lessonFile) {
                  const lessonContents = await lessonFile.async("string");
                  parseAndLoadLesson(lessonContents);
                } else {
                  alert("Error reading lesson content from zip file.");
                }
              } else if (lessonFilePaths.length === 0) {
                // Invalid zip, missing the right stuff.
                alert(
                  "Could not find '*/lesson/content.json' in the zip file."
                );
              } else {
                // Invalid zip, having too many files.
                alert(
                  "Multiple '*/lesson/content.json' files found. Please provide a valid lesson zip file."
                );
              }
            } catch (error) {
              console.error("Error reading zip file:", error);
              alert("Error reading zip file.");
            }
          }
        };
        reader.readAsArrayBuffer(file);
      } else if (file.name.endsWith(".json")) {
        // Load in .json file.
        const reader = new FileReader();
        reader.onload = (e) => {
          const contents = e.target?.result as string;
          if (contents) {
            parseAndLoadLesson(contents);
          }
        };
        reader.readAsText(file);
      } else {
        alert("Unsupported file type. Please select a .json or .zip file.");
      }
    }
  };

  return (
    <div className="w-full h-screen flex flex-col">
      {/* Save Modal */}
      {isSaveModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-2xl w-full max-w-lg flex-col items-center justify-center">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">
              Save Lesson
            </h2>
            <div className="space-y-4">
              <div>
                <label
                  htmlFor="lessonTitle"
                  className="block text-sm font-medium text-gray-700"
                >
                  Lesson Title
                </label>
                <input
                  type="text"
                  id="lessonTitle"
                  value={lessonTitle}
                  onChange={(e) => setLessonTitle(e.target.value)}
                  className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
              <div>
                <label
                  htmlFor="lessonDescription"
                  className="block text-sm font-medium text-gray-700"
                >
                  Lesson Description
                </label>
                <textarea
                  id="lessonDescription"
                  value={lessonDescription}
                  onChange={(e) => setLessonDescription(e.target.value)}
                  rows={3}
                  className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
              <div>
                <label
                  htmlFor="teacherResources"
                  className="block text-sm font-medium text-gray-700"
                >
                  Teacher Resources (Optional Google Doc Link)
                </label>
                <input
                  type="url"
                  id="teacherResources"
                  value={teacherResources}
                  onChange={(e) => setTeacherResources(e.target.value)}
                  className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
            </div>
            <div className="mt-8 flex justify-center space-x-4">
              <button
                onClick={() => setIsSaveModalOpen(false)}
                className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveContent}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Update content
              </button>
              <button
                onClick={handleSaveZip}
                className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
              >
                Compile lesson
              </button>
            </div>
          </div>
        </div>
      )}
      {/* Tool Bar */}
      <div className="bg-gray-800 text-white p-4 flex items-center justify-between shadow-md">
        <div className="flex items-center gap-4">
          <h1 className="text-xl font-bold">PinCS Lesson Maker</h1>
        </div>
        <div className="flex items-center gap-4">
          <button
            onClick={insertSlideBefore}
            className="px-3 py-2 bg-blue-600 hover:bg-blue-700 rounded-md text-sm font-medium"
          >
            Insert Before
          </button>
          <button
            onClick={prevSlide}
            disabled={currentSlideIndex === 0}
            className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-md disabled:opacity-50"
          >
            &larr;
          </button>
          <span className="text-lg">
            Slide {currentSlideIndex + 1} / {slides.length}
          </span>
          <button
            onClick={nextSlide}
            disabled={currentSlideIndex === slides.length - 1}
            className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-md disabled:opacity-50"
          >
            &rarr;
          </button>
          <button
            onClick={insertSlideAfter}
            className="px-3 py-2 bg-blue-600 hover:bg-blue-700 rounded-md text-sm font-medium"
          >
            Insert After
          </button>
        </div>
        <div className="flex items-center gap-4">
          <button
            onClick={() => setIsSaveModalOpen(true)}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-md font-medium"
          >
            Save
          </button>
          <label
            htmlFor="load-lesson"
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-md font-medium cursor-pointer"
          >
            Load
          </label>
          <input
            id="load-lesson"
            type="file"
            accept=".json,.zip"
            className="hidden"
            onChange={loadLesson}
          />
        </div>
      </div>
      {/* Main Page */}
      {isMounted && (
        <Puck
          key={slides[currentSlideIndex].id}
          config={config}
          data={slides[currentSlideIndex].data}
          onChange={handlePuckChange}
        >
          <div className="w-full h-[calc(100svh-4.5rem)] p-4 flex gap-4 bg-gray-100">
            {/* Left Sidebar */}
            <div className="flex flex-col gap-4 bg-white p-4 rounded-lg shadow w-[280px]">
              <h2 className="text-lg font-semibold">Components</h2>
              <Puck.Components />
              <h2 className="text-lg font-semibold mt-4">Outline</h2>
              <Puck.Outline />
              <button
                onClick={deleteSlide}
                onMouseLeave={() => setConfirmingDelete(false)}
                disabled={slides.length <= 1}
                className={`px-3 py-2 border-2 rounded-md text-sm shadow-lg font-medium disabled:opacity-50 ${
                  confirmingDelete
                    ? "bg-red-500 text-white border-red-700"
                    : "hover:enabled:bg-red-500 border-red-500 text-red-500 hover:enabled:text-white"
                }`}
              >
                {confirmingDelete ? "Click again to delete" : "Delete Slide"}
              </button>
            </div>
            {/* Center Preview */}
            <div className="flex-grow border-2 border-white rounded-lg shadow-inner bg-white">
              <Puck.Preview />
            </div>
            {/* Right Sidebar */}
            <div className="flex flex-col gap-4 bg-white p-4 rounded-lg shadow w-[280px]">
              <h2 className="text-lg font-semibold">Component Fields</h2>
              <Puck.Fields />
            </div>
          </div>
        </Puck>
      )}
    </div>
  );
}
