"use client";
import { usePathname } from "next/navigation";
import { JSXElementConstructor, useState } from "react";
import ErrorMessage from "./ErrorMessage";
import Emphasize from "./Emphasize";

function Content({ slides, lessonEditorMode, index }: any) {
  if (!lessonEditorMode) {
    const C = slides[index].content;
    return <C />;
  }
  return slides.map((slide: any, i: number) => {
    if (slide.title) {
      return (
        <div key={i}>
          <p>
            <Emphasize>{slide.title}</Emphasize>
          </p>
          <slide.content key={i} />
        </div>
      );
    }
    return <slide.content key={i} />;
  });
}

export default function Animation({
  slides,
  animationType = "slides",
}: {
  slides: { content: JSXElementConstructor<any>; title?: string }[];
  animationType?: "slides" | "cumulative";
}) {
  if (slides.length <= 0) {
    return (
      <ErrorMessage
        message="An animation must have at least one slide."
        pulsing={true}
      />
    );
  }
  const [index, setIndex] = useState(0);
  const pathname = usePathname();
  const lessonEditorMode =
    pathname.split("/").includes("lesson-maker") &&
    !pathname.includes("/preview");

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

  const buttonBaseClasses =
    "bg-blue-500 text-white border-none py-3 px-6 mx-2 rounded-full cursor-pointer text-base font-semibold transition-all duration-300 ease-in-out shadow-lg";
  const buttonHoverClasses = "hover:-translate-y-0.5 hover:shadow-xl";
  const buttonDisabledClasses =
    "disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-lg";

  if (animationType === "cumulative") {
    const visibleSlides = lessonEditorMode
      ? slides
      : slides.slice(0, index + 1);
    return (
      <div>
        {visibleSlides.map((slide, i) => {
          return <slide.content key={i} />;
        })}
        {index < slides.length - 1 && (
          <div className="flex justify-center items-center mt-4">
            <button
              className={`${buttonBaseClasses} ${buttonHoverClasses} ${buttonDisabledClasses}`}
              onClick={goNext}
            >
              Next
            </button>
          </div>
        )}
      </div>
    );
  }

  const getTitle = () => {
    // Lesson editor mode (shows all slides).
    if (lessonEditorMode) {
      return `All ${slides.length} slides (editor preview)`;
    }
    // Show the title or "Slide" if thre is no title.
    if (slides[index].title) {
      return `${slides[index].title} (${index + 1}/${slides.length})`;
    } else {
      return `Slide ${index + 1} / ${slides.length}`;
    }
  };

  // Default to "slides" animation
  return (
    <div>
      <div className="flex justify-center gap-4 items-center mb-2">
        <button
          className={`${buttonBaseClasses} ${buttonHoverClasses} ${buttonDisabledClasses}`}
          onClick={goBack}
          disabled={index <= 0}
        >
          ← Back
        </button>
        <span className="text-lg font-semibold">{getTitle()}</span>
        <button
          className={`${buttonBaseClasses} ${buttonHoverClasses} ${buttonDisabledClasses}`}
          onClick={goNext}
          disabled={index >= slides.length - 1}
        >
          Next →
        </button>
      </div>
      <Content
        slides={slides}
        lessonEditorMode={lessonEditorMode}
        index={index}
      />
    </div>
  );
}
