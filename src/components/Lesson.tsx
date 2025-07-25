"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import Slide from "./Slide";

interface LessonProps {
  slides: React.ReactNode[];
}

const Lesson: React.FC<LessonProps> = ({ slides }) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [currentSlide, setCurrentSlide] = useState(0);
  // Set preview to TRUE by default (less jarring to remove the preview state).
  const [isPreview, setIsPreview] = useState(true);

  useEffect(() => {
    // On mount, set the slide # to what's in the URL, or 0 if not present.
    const slideParam = searchParams.get("slide");
    let slideFromUrl = slideParam ? parseInt(slideParam, 10) - 1 : 0;
    if (
      isNaN(slideFromUrl) ||
      slideFromUrl < 0 ||
      slideFromUrl >= slides.length
    ) {
      slideFromUrl = 0;
    }

    // Determine preview mode.
    if (pathname.split("/").includes("lesson")) {
      setIsPreview(false);
    }

    if (slideFromUrl !== currentSlide) {
      // Update current slide if needed.
      setCurrentSlide(slideFromUrl);
    } else if (!slideParam && slides.length > 0) {
      // Set the URL if unset.
      const params = new URLSearchParams(searchParams.toString());
      params.set("slide", "1");
      router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    }
  }, [searchParams, slides.length]);

  // This function handles the navigation logic.
  const navigateToSlide = (slideIndex: number) => {
    if (slideIndex >= 0 && slideIndex < slides.length) {
      // Update state.
      setCurrentSlide(slideIndex);

      // Update URL so that it's not in the browswer history.
      const params = new URLSearchParams(searchParams.toString());
      params.set("slide", String(slideIndex + 1));
      router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    }
  };

  const goToNextSlide = () => {
    navigateToSlide(currentSlide + 1);
  };

  const goToPreviousSlide = () => {
    navigateToSlide(currentSlide - 1);
  };

  const progress = ((currentSlide + 1) / slides.length) * 100;

  const navButtonStyle =
    "p-2 rounded-full text-slate-600 border border-slate-300 shadow-lg transition-all";

  const previewGlass =
    "bg-[rgba(200,230,240,0.3)] backdrop-saturate-130 backdrop-blur-xs";

  return (
    <div className="relative flex-grow flex flex-row w-full">
      {/* Main content area */}
      {isPreview && (
        <button
          onClick={goToPreviousSlide}
          disabled={currentSlide === 0}
          className={`sticky left-0 h-25 top-1/2 -translate-y-1/2 ${navButtonStyle} ${previewGlass}
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
      )}
      <div className="relative flex-grow flex flex-row">
        <Slide>{slides[currentSlide]}</Slide>
      </div>
      {isPreview && (
        <button
          onClick={goToNextSlide}
          disabled={currentSlide === slides.length - 1}
          className={`sticky right-0 h-25 top-1/2 -translate-y-1/2 ${navButtonStyle} ${previewGlass}
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
      )}
      {/* Navigation arrows */}
      {!isPreview && (
        <div>
          <button
            onClick={goToPreviousSlide}
            disabled={currentSlide === 0}
            className={`fixed left-4 top-6 bg-slate-100 ${navButtonStyle}
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
            className={`fixed right-4 top-6 bg-slate-100 ${navButtonStyle}
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
          <div className="fixed top-0 left-0 right-0 h-2 bg-gray-200 z-50">
            <div
              className="h-full bg-blue-600 transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>

          {/* Slide counter */}
          <div className="fixed top-9 right-20 text-sm text-gray-600">
            {currentSlide + 1} / {slides.length}
          </div>
        </div>
      )}
    </div>
  );
};

export default function (props: LessonProps) {
  return (
    <Suspense>
      <Lesson {...props}></Lesson>
    </Suspense>
  );
}
