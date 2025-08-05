"use client";
import { usePathname } from "next/navigation";
import { JSXElementConstructor, useState } from "react";

export default function Animation({
  slides,
}: {
  slides: { components: JSXElementConstructor<any> }[];
}) {
  if (slides.length <= 0) {
    return <>An animation must have at least one slide.</>;
  }
  const [index, setIndex] = useState(0);
  const pathname = usePathname();

  // Slides Preview (shows all slides).
  if (pathname.includes("/lesson-maker")) {
    return (
      <>
        {slides.map((slide, index) => {
          const Components: any = slide.components;
          return <Components key={index} />;
        })}
      </>
    );
  }

  function goBack() {
    if (index > 0) {
      setIndex(index - 1);
    }
  }

  function goNext() {
    if (index < slides.length - 1) {
      setIndex(index + 1);
    }
  }

  // Animation.
  const { components: Components } = slides[index];
  return (
    <div>
      <div className="flex justify-evenly items-center">
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
      <Components />
    </div>
  );
}
