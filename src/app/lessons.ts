import { Lesson, Subject, Tag } from "./types";

export const AllLessons: Lesson[] = [
  {
    title: "Cell health",
    link: "/biology/cell-health",
    tags: [
      { type: "subject", value: Subject.Biology },
      { type: "hidden", value: false },
    ],
  },
  {
    title: "Disease spread",
    link: "/biology/disease-spread",
    tags: [
      { type: "subject", value: Subject.Biology },
      { type: "hidden", value: false },
    ],
  },
  {
    title: "Memory model",
    link: "/biology/memory",
    tags: [
      { type: "subject", value: Subject.Biology },
      { type: "hidden", value: false },
    ],
  },
  {
    title: "Fractals+Recursion",
    link: "/geometry",
    tags: [
      { type: "subject", value: Subject.Mathematics },
      { type: "hidden", value: false },
    ],
  },
  {
    title: "Arpanet",
    link: "/history/arpanet",
    tags: [
      { type: "subject", value: Subject.History },
      { type: "hidden", value: false },
    ],
  },
  {
    title: "Cryptography",
    link: "/history/cryptography",
    tags: [
      { type: "subject", value: Subject.History },
      { type: "hidden", value: false },
    ],
  },
  {
    title: "Music Analysis",
    link: "/music",
    tags: [
      { type: "subject", value: Subject.Music },
      { type: "hidden", value: false },
    ],
  },
  {
    title: "Emoji Translator",
    link: "/poetry/emoji-translator",
    tags: [
      { type: "subject", value: Subject.English },
      { type: "hidden", value: false },
    ],
  },
  {
    title: "Next Word Prediction",
    link: "/poetry/next-word-prediction",
    tags: [
      { type: "subject", value: Subject.English },
      { type: "hidden", value: false },
    ],
  },
  {
    title: "Probability Intro",
    link: "/probability",
    tags: [
      { type: "subject", value: Subject.Mathematics },
      { type: "hidden", value: false },
    ],
  },
  {
    title: "Code Editor Example",
    link: "/code-editor-example",
    tags: [
      { type: "subject", value: Subject.ComputerScience },
      { type: "hidden", value: false },
    ],
  },

  {
    title: "Ecosystems",
    link: "/environmental-science/ecosystems",
    tags: [
      { type: "subject", value: Subject.EnvironmentalScience },
      { type: "hidden", value: false },
    ],
  },
  {
    title: "Marginal Utility",
    link: "/econ/marginal-utility",
    tags: [
      { type: "subject", value: Subject.Economics },
      { type: "hidden", value: false }
    ] },
  {
    title: "Example Lesson",
    link: "/example-lesson",
    tags: [{ type: "hidden", value: true }],
  },
];
