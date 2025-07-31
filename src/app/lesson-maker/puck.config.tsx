"use client";
import Block from "@/components/Block";
import Lesson from "@/components/Lesson";
import LessonWrapper from "@/components/LessonWrapper";
import { Config } from "@measured/puck";
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

export const config: Config = {
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
  },
  root: {
    render: ({ children }) => {
      return <LessonWrapper>{children}</LessonWrapper>;
    },
  },
};
