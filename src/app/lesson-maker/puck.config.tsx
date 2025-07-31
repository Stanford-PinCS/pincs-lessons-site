"use client";
import Block from "@/components/Block";
import Lesson from "@/components/Lesson";
import LessonWrapper from "@/components/LessonWrapper";
import { Config } from "@measured/puck";
import { BlockProps } from "../../components/Block";
import ReactKatex from "@pkasila/react-katex";
import "katex/dist/katex.min.css";
import katex from "katex";
import { Checkbox } from "@headlessui/react";
import ColorBox from "@/components/ColorBox";
import QuizQuestion from "@/components/QuizQuestion";

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
const ColorBoxColor = {
  type: "radio" as const,
  options: [
    {
      label: "Green",
      value: "green",
    },
    {
      label: "Blue",
      value: "blue",
    },
    {
      label: "Yellow",
      value: "yellow",
    },
    {
      label: "Purple",
      value: "purple",
    },
    {
      label: "Gray",
      value: "gray",
    },
  ],
};
const Text = { type: "text" as const };
const TextArea = { type: "textarea" as const };
const Slot = { type: "slot" as const };

// Note: Certain tailwind features break down, so styles may need to be slightly different here than in coding React.
// Ex: spacing-y-4 will add 1rem between items of a container, which adds a margin to the bottom of each component
// except the last one. However, here, with the way it's rendered, tailwind doesn't find the children to add margin
// to the bottom.
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
        // TODO: Give hypertext superpowers: (e.g. ReactKatex, Emphasize, KeyTerm, Code, etc.)
        return <p className="my-2">{text}</p>;
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
          <div className="my-2">
            <Block color={color} title={title}>
              <Children />
            </Block>
          </div>
        );
      },
    },
    LaTeXParagraph: {
      fields: {
        text: TextArea,
      },
      defaultProps: {
        text: "We can write stuff like this: $f=ma$.",
      },
      render: ({ text }) => {
        // TODO: Check that text is valid.
        return (
          <p className="my-2">
            <ReactKatex>{text}</ReactKatex>
          </p>
        );
      },
    },
    ColorBox: {
      fields: {
        children: Slot,
        color: ColorBoxColor,
      },
      defaultProps: {
        children: [],
        color: "yellow",
      },
      render: ({ children: Children, color }) => {
        return (
          <div className="my-2">
            <ColorBox color={color}>
              <Children />
            </ColorBox>
          </div>
        );
      },
    },
    MultipleChoiceQuiz: {
      fields: {
        question: Text,
        choices: {
          type: "array",
          arrayFields: {
            text: Text,
            isCorrect: {
              type: "radio",
              options: [
                {
                  label: "Correct",
                  value: true,
                },
                {
                  label: "Incorrect",
                  value: false,
                },
              ],
            },
            explanation: Text,
          },
        },
      },
      defaultProps: {
        question: "What's 1 + 1?",
        choices: [
          {
            text: "1",
            isCorrect: false,
            explanation: "Nope, that's too small.",
          },
          {
            text: "2",
            isCorrect: true,
            explanation: "You've got it!",
          },
        ],
      },
      render: ({ question, choices }) => {
        return <QuizQuestion question={question} choices={choices} />;
      },
    },
  },
  root: {
    fields: {},
    render: ({ children }) => {
      return <LessonWrapper>{children}</LessonWrapper>;
    },
  },
};
