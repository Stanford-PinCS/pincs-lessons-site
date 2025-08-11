"use client";
import Block from "@/components/Block";
import LessonWrapper from "@/components/LessonWrapper";
import { Config, Fields } from "@measured/puck";
import "katex/dist/katex.min.css";
import ColorBox from "@/components/ColorBox";
import QuizQuestion from "@/components/QuizQuestion";
import List from "@/components/List";
import Text from "@/components/Text";
import TextQuizQuestion from "@/components/TextQuizQuestion";
import MultiSelectQuizQuestion from "@/components/MultiSelectQuizQuestion";
import Pickcode from "@/components/Pickcode";
import UnityFrame from "@/components/UnityFrame";
import Placeholder from "@/components/Placeholder";
import Embed from "@/components/Embed";
import Animation from "@/components/Animation";
import Collapsible from "@/components/Collapsible";
import Image from "@/components/Image";
import ErrorMessage from "@/components/ErrorMessage";
import Diagram from "@/components/Diagram";

const BlockColor = {
  label: "Slide Color",
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
  label: "Color",
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
const Slot = { type: "slot" as const, label: "Content", disallow: ["Block"] };

function shorten(text: string, cutoff = 10) {
  if (!text) return "(Empty)";

  if (text.length > Math.max(cutoff, 3)) {
    return text.substring(0, cutoff - 2) + "...";
  } else {
    return text;
  }
}

// Note: Certain tailwind features break down, so styles may need to be slightly different here than in coding React.
// Ex: spacing-y-4 will add 1rem between items of a container, which adds a margin to the bottom of each component
// except the last one. However, here, with the way it's rendered, tailwind doesn't find the children to add margin
// to the bottom.
export const config: Config = {
  components: {
    "Color box": {
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
        text: { ...TextArea, label: "Text" },
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
          label: "Type",
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
          label: "Items",
          type: "array",
          arrayFields: {
            text: { ...TextType, label: "Text" },
          },
          min: 1,
          getItemSummary: (item) => shorten(item.text),
        },
      },
      defaultProps: {
        type: "bulleted",
        items: [{ text: "This is a list item" }],
      },
      render: ({ items, type }) => {
        const mappedItems = items.map((item: { text: string }) => item.text);
        return <List type={type} items={mappedItems} />;
      },
    },
    "Multiple choice quiz": {
      fields: {
        mode: {
          label: "Mode",
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
        question: { ...TextType, label: "Question" },
        choices: {
          label: "Choices",
          type: "array",
          arrayFields: {
            text: { ...TextType, label: "Text" },
            isCorrect: {
              label: "Is correct?",
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
            explanation: { ...TextType, label: "Explanation" },
          },
          defaultItemProps: {
            text: "",
            isCorrect: false,
            explanation: "",
          },
          min: 1,
          getItemSummary: (item) =>
            (item.isCorrect ? "✅" : "❌") + shorten(item.text, 9),
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
    "Text response": {
      fields: {
        question: { ...TextArea, label: "Question" },
        answer: { ...TextType, label: "Answer" },
        placeholder: { ...TextType, label: "Placeholder" },
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
        name: { ...TextType, label: "Name" },
        src: { ...TextType, label: "Pickcode URL" },
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
        projectName: { ...TextType, label: "Project name" },
        fullscreen: {
          label: "Mode",
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
        name: { ...TextType, label: "Name" },
      },
      defaultProps: {
        name: "custom",
      },
      render: ({ name }) => {
        return <Placeholder name={`Custom Component - ${name}`} />;
      },
    },
    Embed: {
      fields: {
        src: { ...TextType, label: "Embed URL (not code)" },
        type: {
          label: "Type",
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
          label: "Slides",
          type: "array",
          arrayFields: {
            content: Slot,
          },
          min: 1,
          getItemSummary: (item, index) => `Slide #${(index || 0) + 1}`,
        },
        animationType: {
          label: "Animation type",
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
        shown: { ...TextType, label: "Initial text" },
        hidden: { ...TextType, label: "Collapsed text" },
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
    Image: {
      fields: {
        // TODO: Make custom so that we can add ERRORS where they type!
        url: { ...TextType, label: "URL" },
        description: { ...TextType, label: "Description" },
        caption: {
          label: "Caption mode",
          type: "radio",
          options: [
            {
              label: "On",
              value: true,
            },
            {
              label: "Off",
              value: false,
            },
          ],
        },
        aspectRatio: {
          label: "Aspect ratio",
          type: "radio",
          options: [
            {
              label: "Auto",
              value: "auto",
            },
            {
              label: "16/9",
              value: "16/9",
            },
            {
              label: "4/3",
              value: "4/3",
            },
            {
              label: "Square",
              value: "1/1",
            },
          ],
        },
        widthMode: {
          label: "Width mode",
          type: "radio",
          options: [
            {
              label: "Half",
              value: "half",
            },
            {
              label: "Full",
              value: "full",
            },
          ],
        },
        rights: {
          label: "Rights confirmation",
          type: "radio",
          options: [
            {
              label:
                "I have rights to use this image and have given it the proper attribution.",
              value: true,
            },
            {
              label: "I don't have rights to this image.",
              value: false,
            },
          ],
        },
      },
      defaultProps: {
        url: "",
        description: "",
        aspectRatio: "auto",
        widthMode: "half",
        rights: false,
        caption: true,
      },
      render: ({
        url,
        description,
        aspectRatio,
        widthMode,
        rights,
        caption,
      }) => {
        if (url == "" || description == "") {
          return (
            <ErrorMessage
              message="An image must have a URL and description (the description helps with accessibility)."
              pulsing={true}
            />
          );
        }
        if (rights == false) {
          return (
            <ErrorMessage
              message="Please confirm you have rights to use this photo (at the bottom of the right menu for the image settings)."
              pulsing={true}
            />
          );
        }
        return (
          <Image
            src={url}
            alt={description}
            aspectRatio={aspectRatio}
            widthMode={widthMode}
            captionMode={caption}
          />
        );
      },
    },
    Diagram: {
      fields: {
        title: { ...TextType, label: "Title" },
        svg: { ...TextArea, label: "SVG content" },
        actions: {
          label: "Actions",
          type: "array",
          arrayFields: {
            svgElementId: { ...TextType, label: "SVG element ID" },
            description: { ...TextArea, label: "Description" },
          },
          getItemSummary: (item) => item.svgElementId || "Action",
        },
      },
      defaultProps: {
        title: "",
        svg: "",
        actions: [],
      },
      render: ({ title, svg, actions }) => {
        return <Diagram title={title} svg={svg} actions={actions} />;
      },
    },
  },
  categories: {
    basics: {
      title: "Text",
      components: ["Color box", "Paragraph", "List"],
    },
    quizzes: {
      components: ["Multiple choice quiz", "Text response"],
    },
    engagement: {
      components: ["Pickcode", "Embed", "Animation", "Collapsible", "Image"],
    },
    advanced: {
      components: ["Custom", "Unity", "Diagram"],
    },
  },
  root: {
    fields: {
      mode: {
        label: "Mode",
        type: "radio",
        options: [
          { label: "Regular", value: "regular" },
          { label: "Fullscreen", value: "fullscreen" },
        ],
      },
      title: { ...TextArea, label: "Title" },
      color: BlockColor,
    },
    defaultProps: {
      color: "green",
      title: "Title",
      mode: "regular",
    },
    render: ({ children, color, title, mode }) => {
      return (
        <LessonWrapper>
          <div className="w-full max-w-[100svh] m-0 p-0">
            <Block color={color} title={title} mode={mode}>
              {children}
            </Block>
          </div>
        </LessonWrapper>
      );
    },
  },
};
