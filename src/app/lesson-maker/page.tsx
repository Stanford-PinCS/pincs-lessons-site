"use client";
import { Puck, Data } from "@measured/puck";
import "@measured/puck/puck.css";
import { useState, useEffect } from "react";
import { config } from "./puck.config";

// Render Puck editor
export default function Editor() {
  type Slide = { id: number; data: Data };

  const [slides, setSlides] = useState<Slide[]>([
    { id: 0, data: { content: [], root: {} } },
  ]);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const savedSlides = sessionStorage.getItem("slides");
    const savedIndex = sessionStorage.getItem("currentSlideIndex");

    if (savedSlides) {
      const parsedSlides = JSON.parse(savedSlides);
      setSlides(
        parsedSlides.map((data: Data) => ({ id: Math.random(), data }))
      );
    }

    if (savedIndex) {
      setCurrentSlideIndex(parseInt(savedIndex, 10));
    }
  }, []);

  useEffect(() => {
    if (isMounted) {
      sessionStorage.setItem(
        "slides",
        JSON.stringify(slides.map((slide) => slide.data))
      );
      sessionStorage.setItem("currentSlideIndex", String(currentSlideIndex));
    }
  }, [slides, currentSlideIndex, isMounted]);

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

  const saveLesson = async () => {
    const options = {
      suggestedName: "lesson.json",
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
      const json = JSON.stringify(slides.map((slide) => slide.data));
      await writable.write(json);
      await writable.close();
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
          if (
            Array.isArray(data) &&
            data.every((item) => "content" in item && "root" in item)
          ) {
            setSlides(data.map((d) => ({ id: Date.now(), data: d })));
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
      <div className="bg-gray-800 text-white p-4 flex items-center justify-between shadow-md">
        <div className="flex items-center gap-4">
          <h1 className="text-xl font-bold">PinCS Lesson Maker</h1>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={insertSlideBefore}
            className="px-3 py-2 bg-blue-600 hover:bg-blue-700 rounded-md text-sm font-medium"
          >
            Insert Before
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
            onClick={prevSlide}
            disabled={currentSlideIndex === 0}
            className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-md disabled:opacity-50"
          >
            &larr;
          </button>
          <span className="text-lg">
            {currentSlideIndex + 1} / {slides.length}
          </span>
          <button
            onClick={nextSlide}
            disabled={currentSlideIndex === slides.length - 1}
            className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-md disabled:opacity-50"
          >
            &rarr;
          </button>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={deleteSlide}
            disabled={slides.length <= 1}
            className="px-3 py-2 bg-red-600 hover:bg-red-700 rounded-md text-sm font-medium disabled:opacity-50"
          >
            Delete Slide
          </button>
        </div>
        <div className="flex items-center gap-4">
          <button
            onClick={saveLesson}
            className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-md font-medium"
          >
            Save
          </button>
          <label
            htmlFor="load-lesson"
            className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-md font-medium cursor-pointer"
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
