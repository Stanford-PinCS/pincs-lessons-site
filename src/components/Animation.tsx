"use client";
import { usePathname } from "next/navigation";
import { JSXElementConstructor, useState } from "react";

export default function Animation({
  slides,
  animationType = "slides",
}: {
  slides: { content: JSXElementConstructor<any> }[];
  animationType?: "slides" | "cumulative";
}) {
  if (slides.length <= 0) {
    return <>An animation must have at least one slide.</>;
  }
  const [index, setIndex] = useState(0);
  const pathname = usePathname();

  // Slides Preview (shows all slides).
  if (pathname.includes("/lesson-maker") && !pathname.includes("/preview")) {
    return (
      <>
        {slides.map((slide, index) => {
          return <slide.content key={index} />;
        })}
      </>
    );
  }

  function goNext() {
    if (index < slides.length - 1) {
      setIndex(index + 1);
    }
  }

  if (animationType === "cumulative") {
    const visibleSlides = slides.slice(0, index + 1);
    return (
      <div>
        {visibleSlides.map((slide, i) => {
          return <slide.content key={i} />;
        })}
        {index < slides.length - 1 && (
          <div className="flex justify-center items-center mt-4">
            <button
              className="bg-blue-500 p-3 rounded-md text-white"
              onClick={goNext}
            >
              Next
            </button>
          </div>
        )}
      </div>
    );
  }

  // Default to "slides" animation
  function goBack() {
    if (index > 0) {
      setIndex(index - 1);
    }
  }

  const { content: Content } = slides[index];
  return (
    <div>
      <div className="flex justify-evenly gap-4 items-center mb-2">
        <button
          className="bg-blue-500 p-3 rounded-md text-white"
          onClick={goBack}
          disabled={index <= 0}
        >
          Back
        </button>
        <span>
          Slide {index + 1} / {slides.length}{" "}
        </span>
        <button
          className="bg-blue-500 p-3 rounded-md text-white"
          onClick={goNext}
          disabled={index >= slides.length - 1}
        >
          Next
        </button>
      </div>
      <Content />
    </div>
  );
}
