"use client";
import { Puck, Data } from "@measured/puck";
import "@measured/puck/puck.css";
import { useState } from "react";
import { config } from "./puck.config";

// Render Puck editor
export default function Editor() {
  const [slides, setSlides] = useState<Data[]>([
    { content: [], root: {} }, // Initial slide
  ]);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

  const handlePuckChange = (data: Data) => {
    const newSlides = [...slides];
    newSlides[currentSlideIndex] = data;
    setSlides(newSlides);
    console.log("Saved slide:", currentSlideIndex, data);
  };

  const addSlide = () => {
    setSlides([...slides, { content: [], root: {} }]);
    setCurrentSlideIndex(slides.length);
  };

  const deleteSlide = () => {
    if (slides.length > 1) {
      const newSlides = slides.filter(
        (_, index) => index !== currentSlideIndex
      );
      setSlides(newSlides);
      setCurrentSlideIndex((prev) => (prev > 0 ? prev - 1 : 0));
    } else {
      console.log("Cannot delete the last slide.");
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

  return (
    <div>
      <div className="h-[80px] p-4 flex gap-4 justify-center items-center">
        <button
          onClick={prevSlide}
          disabled={currentSlideIndex === 0}
          className="px-4 py-2 bg-gray-200 rounded-md disabled:opacity-50"
        >
          Previous
        </button>
        <span>
          Slide {currentSlideIndex + 1} of {slides.length}
        </span>
        <button
          onClick={nextSlide}
          disabled={currentSlideIndex === slides.length - 1}
          className="px-4 py-2 bg-gray-200 rounded-md disabled:opacity-50"
        >
          Next
        </button>
        <button
          onClick={addSlide}
          className="px-4 py-2 bg-blue-500 text-white rounded-md"
        >
          Add Slide
        </button>
        <button
          onClick={deleteSlide}
          disabled={slides.length <= 1}
          className="px-4 py-2 bg-red-500 text-white rounded-md disabled:opacity-50"
        >
          Delete Slide
        </button>
      </div>
      <Puck
        key={currentSlideIndex}
        config={config}
        data={slides[currentSlideIndex]}
        onChange={handlePuckChange}
      >
        <div className="w-full h-[calc(100svh-80px)] px-4 grid grid-cols-6 gap-4">
          <div className="">
            <Puck.Components></Puck.Components>
          </div>
          <div className="col-span-4 border-1 border-gray-500 rounded-md shadow-lg">
            <Puck.Preview></Puck.Preview>
          </div>
          <div className="">
            <Puck.Fields></Puck.Fields>
          </div>
        </div>
      </Puck>
    </div>
  );
}