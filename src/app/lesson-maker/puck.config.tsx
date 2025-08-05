"use client";
import Block from "@/components/Block";
import LessonWrapper from "@/components/LessonWrapper";
import { Config, WithId, WithPuckProps } from "@measured/puck";
import "katex/dist/katex.min.css";
import ColorBox from "@/components/ColorBox";
import QuizQuestion from "@/components/QuizQuestion";
import List from "@/components/List";
import Text from "@/components/Text";
import TextQuizQuestion from "@/components/TextQuizQuestion";
import MultiSelectQuizQuestion from "@/components/MultiSelectQuizQuestion";
import Pickcode from "@/components/Pickcode";
import UnityFrame from "@/components/UnityFrame";
import { JSX } from "react";
import PlaceHolder from "@/components/PlaceHolder";
import Embed from "@/components/Embed";
import Animation from "@/components/Animation";
import Collapsible from "@/components/Collapsible";

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
const TextType = { type: "text" as const };
const TextArea = { type: "textarea" as const };
const Slot = { type: "slot" as const };

// Note: Certain tailwind features break down, so styles may need to be slightly different here than in coding React.
// Ex: spacing-y-4 will add 1rem between items of a container, which adds a margin to the bottom of each component
// except the last one. However, here, with the way it's rendered, tailwind doesn't find the children to add margin
// to the bottom.
export const config: Config = {
  components: {
    Block: {
      fields: {
        mode: {
          type: "radio",
          options: [
            { label: "Regular", value: "regular" },
            { label: "Full Screen", value: "fullscreen" },
          ],
        },
        title: TextArea,
        color: BlockColor,
        children: Slot,
      },
      defaultProps: {
        color: "green",
        title: "Title",
        mode: "regular",
      },
      render: ({ children: Children, color, title, mode }) => {
        return (
          <div className="my-2">
            <Block color={color} title={title} mode={mode}>
              <Children />
            </Block>
          </div>
        );
      },
    },
    "Color Box": {
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
    Paragraph: {
      fields: {
        text: TextArea,
      },
      defaultProps: {
        text: "This is a paragraph.",
      },
      render: ({ text }) => {
        return (
          <div className="my-2">
            <Text>{text}</Text>
          </div>
        );
      },
    },
    List: {
      fields: {
        type: {
          type: "radio",
          options: [
            {
              label: "Bulleted",
              value: "bulleted",
            },
            {
              label: "Numbered",
              value: "numbered",
            },
          ],
        },
        items: {
          type: "array",
          arrayFields: {
            text: TextType,
          },
        },
      },
      defaultProps: {
        type: "bulleted",
        items: [{ text: "This is a list item" }],
      },
      render: ({ items, type }) => {
        items = items.map((item: { text: string }) => item.text);
        return <List type={type} items={items} />;
      },
    },
    "Multiple Choice Quiz": {
      fields: {
        mode: {
          type: "radio",
          options: [
            {
              label: "Single-Select",
              value: "single",
            },
            {
              label: "Multi-Select",
              value: "multi",
            },
          ],
        },
        question: TextType,
        choices: {
          type: "array",
          arrayFields: {
            text: TextType,
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
            explanation: TextType,
          },
        },
      },
      defaultProps: {
        mode: "single",
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
      render: ({ question, choices, mode }) => {
        if (mode === "single") {
          return <QuizQuestion question={question} choices={choices} />;
        } else {
          return (
            <MultiSelectQuizQuestion question={question} choices={choices} />
          );
        }
      },
    },
    "Text Response": {
      fields: {
        question: TextArea,
        answer: TextType,
        placeholder: TextType,
      },
      defaultProps: {
        question: "What's 1 + 2?",
        answer: "3",
        placeholder: "",
      },
      render: ({ question, answer, placeholder }) => {
        //TODO: expose more of the regex to teachers.
        //@ts-ignore (for some reason it thinks RegExp.escape isn't a function).
        let pattern = "^" + RegExp.escape(answer.replace(/\s+/g, "")) + "$";
        return (
          <TextQuizQuestion
            question={<Text>{question}</Text>}
            pattern={pattern}
            placeholder={placeholder}
          />
        );
      },
    },
    Pickcode: {
      fields: {
        name: TextType,
        src: TextType,
      },
      defaultProps: {
        name: "Example Pickcode Plugin",
        src: "https://dev.pickcode.io/lesson/create-your-own-story-lesson-cmcdpn8cs000ek3y1wegxmemi-2025-07-29-09-38-49",
      },
      render: ({ name, src }) => {
        return <Pickcode name={name} src={src}></Pickcode>;
      },
    },
    Unity: {
      fields: {
        projectName: TextType,
        fullscreen: {
          type: "radio",
          options: [
            {
              label: "fullscreen",
              value: true,
            },
            {
              label: "inline",
              value: false,
            },
          ],
        },
      },
      defaultProps: {
        projectName: "name",
        fullscreen: true,
      },
      render: ({ projectName, fullscreen }) => {
        return <UnityFrame projectName={projectName} fullscreen={fullscreen} />;
      },
    },
    Custom: {
      fields: {
        name: TextType,
      },
      defaultProps: {
        name: "custom",
      },
      render: ({ name }) => {
        return <PlaceHolder name={name} />;
      },
    },
    Embed: {
      fields: {
        src: TextType,
        type: {
          type: "radio",
          options: [
            {
              label: "YouTube",
              value: "youtube",
            },
            {
              label: "OpenProcessing",
              value: "openprocessing",
            },
            {
              label: "Desmos",
              value: "desmos",
            },
            {
              label: "Other",
              value: "",
            },
          ],
        },
      },
      defaultProps: {
        src: "",
        type: "",
      },
      render: ({ src, type }) => {
        return <Embed src={src} type={type} />;
      },
    },
    Animation: {
      fields: {
        slides: {
          type: "array",
          arrayFields: {
            content: Slot,
          },
        },
        animationType: {
          type: "radio",
          options: [
            {
              label: "Slides",
              value: "slides",
            },
            {
              label: "Cumulative",
              value: "cumulative",
            },
          ],
        },
      },
      defaultProps: {
        slides: [],
        animationType: "slides",
      },
      render: ({ slides, animationType }) => {
        return <Animation slides={slides} animationType={animationType} />;
      },
    },
    Collapsible: {
      fields: {
        shown: TextType,
        hidden: TextType,
      },
      defaultProps: {
        shown: "This is always visible",
        hidden: "This is visible when you click on the component.",
      },
      render: ({ shown, hidden }) => {
        return (
          <Collapsible
            children={
              <div className="inline-block">
                <Text>{shown}</Text>
              </div>
            }
            ExampleContent={<Text>{hidden}</Text>}
          />
        );
      },
    },
  },
  categories: {
    basics: {
      title: "Containers / Text",
      components: ["Block", "Color Box", "Paragraph", "List"],
    },
    quizzes: {
      components: ["Multiple Choice Quiz", "Text Response"],
    },
    interactives: {
      components: ["Pickcode", "Embed", "Animation", "Collapsible"],
    },
    advanced: {
      components: ["Custom", "Unity"],
    },
  },
  root: {
    fields: {},
    render: ({ children }) => {
      return <LessonWrapper>{children}</LessonWrapper>;
    },
  },
};
