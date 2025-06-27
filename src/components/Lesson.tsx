"use client";

import React, { useState } from "react";
import Slide from "./Slide";

interface LessonProps {
  slides: React.ReactNode[];
}

const Lesson: React.FC<LessonProps> = ({ slides }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const goToNextSlide = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    }
  };

  const goToPreviousSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
  };

  const progress = ((currentSlide + 1) / slides.length) * 100;

  return (
    <div className="relative w-full h-full min-h-[600px]">
      {/* Main content area */}
      <div className="relative w-full h-full">
        <Slide>{slides[currentSlide]}</Slide>
      </div>

      {/* Navigation arrows */}
      <button
        onClick={goToPreviousSlide}
        disabled={currentSlide === 0}
        className={`absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/80 hover:bg-white shadow-lg transition-all
          ${
            currentSlide === 0
              ? "opacity-50 cursor-not-allowed"
              : "hover:scale-110"
          }`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </button>

      <button
        onClick={goToNextSlide}
        disabled={currentSlide === slides.length - 1}
        className={`absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/80 hover:bg-white shadow-lg transition-all
          ${
            currentSlide === slides.length - 1
              ? "opacity-50 cursor-not-allowed"
              : "hover:scale-110"
          }`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </svg>
      </button>

      {/* Progress bar */}
      <div className="absolute bottom-0 left-0 w-full h-2 bg-gray-200">
        <div
          className="h-full bg-blue-600 transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Slide counter */}
      <div className="absolute bottom-4 right-4 text-sm text-gray-600">
        {currentSlide + 1} / {slides.length}
      </div>
    </div>
  );
};

export default Lesson;
