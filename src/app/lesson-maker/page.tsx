"use client";
import Block from "@/components/Block";
import Lesson from "@/components/Lesson";
import LessonWrapper from "@/components/LessonWrapper";
import { Config, Puck, Data } from "@measured/puck";
import "@measured/puck/puck.css";
import { useState } from "react";
import { BlockProps } from "../../components/Block";

const BlockColor = {
  type: "radio" as const,
  options: [
    {
      label: "Green (use for lesson overview and recap)",
      value: "green",
    },
    {
      label: "Blue (use for background information and definitions)",
      value: "blue",
    },
    { label: "Yellow (use for interactive portions)", value: "yellow" },
    { label: "Purple (use for quizzes)", value: "purple" },
  ],
};
const Text = { type: "text" as const };
const TextArea = { type: "textarea" as const };
const Slot = { type: "slot" as const };

const config: Config = {
  components: {
    Paragraph: {
      fields: {
        text: TextArea,
      },
      defaultProps: {
        text: "This is a paragraph.",
      },
      render: ({ text }) => {
        return <p>{text}</p>;
      },
    },
    Block: {
      fields: {
        title: TextArea,
        color: BlockColor,
        children: Slot,
      },
      defaultProps: {
        color: "green",
        title: "Title",
      },
      render: ({ children: Children, color, title }) => {
        return (
          <Block color={color} title={title}>
            <Children />
          </Block>
        );
      },
    },
    Lesson: {
      fields: {
        slideIndex: {
          type: "number",
        },
        slides: {
          type: "array",
          arrayFields: {
            title: TextArea,
            color: BlockColor,
            children: Slot,
          },
        },
      },
      defaultProps: {
        blocks: [],
        slideIndex: 0,
      },
      render: ({ blocks, slideIndex }) => {
        if (!blocks || typeof blocks !== "object") {
          return <>Error: Lesson component must have slides.</>;
        }
        const blockArray = [
          { color: "green" as const, title: "Title", children: undefined },
          { color: "blue" as const, title: "Title2", children: undefined },
        ];
        const slides = blockArray.map(
          ({ children, color, title }: BlockProps) => {
            children = children || <p>This is a paragraph</p>;
            return (
              <Block children={children} color={color} title={title}></Block>
            );
          }
        );

        return <Lesson slideIndex={slideIndex - 1} slides={slides} />;
      },
    },
  },
  root: {
    render: ({ children }) => {
      return <LessonWrapper>{children}</LessonWrapper>;
    },
  },
};

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
