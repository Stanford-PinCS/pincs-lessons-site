"use client";
import { Puck, Data } from "@measured/puck";
import "@measured/puck/puck.css";
import { useState, useEffect } from "react";
import { config } from "./puck.config";

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
    if (isMounted) {
      sessionStorage.setItem(
        "slides",
        JSON.stringify(slides.map((slide) => slide.data))
      );
      sessionStorage.setItem("currentSlideIndex", String(currentSlideIndex));
      sessionStorage.setItem("lessonTitle", lessonTitle);
      sessionStorage.setItem("lessonDescription", lessonDescription);
      sessionStorage.setItem("teacherResources", teacherResources);
    }
  }, [
    slides,
    currentSlideIndex,
    isMounted,
    lessonTitle,
    lessonDescription,
    teacherResources,
  ]);

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
      const newSlides = slides.filter(
        (_, index) => index !== currentSlideIndex
      );
      setSlides(newSlides);
      setCurrentSlideIndex((prev) => (prev > 0 ? prev - 1 : 0));
    }
  };

  const prevSlide = () => {
    setCurrentSlideIndex((prev) => (prev > 0 ? prev - 1 : prev));
  };

  const nextSlide = () => {
    setCurrentSlideIndex((prev) =>
      prev < slides.length - 1 ? prev + 1 : prev
    );
  };

  const handleSave = async () => {
    const options = {
      suggestedName: `${lessonTitle.replace(/\s+/g, "_") || "lesson"}.json`,
      types: [
        {
          description: "JSON Files",
          accept: {
            "application/json": [".json"],
          },
        },
      ],
    };

    try {
      // @ts-ignore
      const handle = await window.showSaveFilePicker(options);
      const writable = await handle.createWritable();
      const json = JSON.stringify({
        title: lessonTitle,
        description: lessonDescription,
        teacherResources: teacherResources,
        slides: slides.map((slide) => slide.data),
      });
      await writable.write(json);
      await writable.close();
      setIsSaveModalOpen(false);
    } catch (error) {
      console.error("Error saving file:", error);
    }
  };

  const loadLesson = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const contents = e.target?.result as string;
        try {
          const data = JSON.parse(contents);
          if (data.slides && Array.isArray(data.slides)) {
            setSlides(
              data.slides.map((d: Data) => ({ id: Date.now(), data: d }))
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
      reader.readAsText(file);
    }
  };

  return (
    <div className="w-full h-screen flex flex-col">
      {isSaveModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-2xl w-full max-w-md">
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
            <div className="mt-8 flex justify-end space-x-4">
              <button
                onClick={() => setIsSaveModalOpen(false)}
                className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
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
          <button
            onClick={deleteSlide}
            disabled={slides.length <= 1}
            className="px-3 py-2 bg-red-600 hover:bg-red-700 rounded-md text-sm font-medium disabled:opacity-50"
          >
            Delete
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
            accept=".json"
            className="hidden"
            onChange={loadLesson}
          />
        </div>
      </div>
      {isMounted && (
        <Puck
          key={slides[currentSlideIndex].id}
          config={config}
          data={slides[currentSlideIndex].data}
          onChange={handlePuckChange}
        >
          <div className="w-full h-[calc(100svh-80px)] px-4 grid grid-cols-6 gap-4 bg-gray-100 pt-4">
            <div className="flex flex-col gap-4 bg-white p-4 rounded-lg shadow">
              <h2 className="text-lg font-semibold">Components</h2>
              <Puck.Components />
              <h2 className="text-lg font-semibold mt-4">Outline</h2>
              <Puck.Outline />
            </div>
            <div className="col-span-4 border-2 border-gray-300 rounded-lg shadow-inner bg-white">
              <Puck.Preview />
            </div>
            <div className="flex flex-col gap-4 bg-white p-4 rounded-lg shadow">
              <h2 className="text-lg font-semibold">Component Fields</h2>
              <Puck.Fields />
            </div>
          </div>
        </Puck>
      )}
    </div>
  );
}
