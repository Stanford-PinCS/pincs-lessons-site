"use client";
import Block from "@/components/Block";
import Lesson from "@/components/Lesson";
import LessonWrapper from "@/components/LessonWrapper";
import { Config, Puck, WithId, WithPuckProps } from "@measured/puck";
import "@measured/puck/puck.css";
import { JSX, ReactNode } from "react";
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

// Describe the initial data
const initialData = {};

// Save the data to your database
const saveSlide = (data: any) => {
  console.log({ data });
};

// Render Puck editor
export default function Editor() {
  return (
    <Puck config={config} data={initialData} onChange={saveSlide}>
      <div className="w-full h-[90svh] p-6 grid grid-cols-6 gap-4">
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
  );
}
