import { Lesson, Subject, Tag } from "./types";

const Lessons: Lesson[] = [
  {
    title: "Ecosystems",
    link: "/environmental-science/ecosystems",
    tags: [
      { type: "subject", value: Subject.EnvironmentalScience },
      { type: "hidden", value: false },
    ],
  },
  {
    title: "Cryptography",
    link: "/history/cryptography/lesson",
    tags: [
      { type: "subject", value: Subject.History },
      { type: "hidden", value: false },
    ],
  },
  {
    title: "Utility Optimization",
    link: "/econ/utility-optimization",
    tags: [
      { type: "subject", value: Subject.Economics },
      { type: "hidden", value: false },
    ],
  },
  {
    title: "Example Lesson",
    link: "/example-lesson",
    tags: [{ type: "hidden", value: true }],
  },
];

const ArchivedLessons: Lesson[] = [
  {
    title: "Cell health",
    link: "/archive/biology/cell-health/lesson",
    tags: [
      { type: "subject", value: Subject.Biology },
      { type: "hidden", value: true },
    ],
  },
  {
    title: "Disease spread",
    link: "/archive/biology/disease-spread/lesson",
    tags: [
      { type: "subject", value: Subject.Biology },
      { type: "hidden", value: true },
    ],
  },
  {
    title: "Memory model",
    link: "/archive/biology/memory/lesson",
    tags: [
      { type: "subject", value: Subject.Biology },
      { type: "hidden", value: true },
    ],
  },
  {
    title: "Fractals+Recursion",
    link: "/archive/geometry/lesson",
    tags: [
      { type: "subject", value: Subject.Mathematics },
      { type: "hidden", value: true },
    ],
  },
  {
    title: "Arpanet",
    link: "/archive/history/arpanet/lesson",
    tags: [
      { type: "subject", value: Subject.History },
      { type: "hidden", value: true },
    ],
  },

  {
    title: "Music Analysis",
    link: "/archive/music/lesson",
    tags: [
      { type: "subject", value: Subject.Music },
      { type: "hidden", value: true },
    ],
  },
  {
    title: "Emoji Translator",
    link: "/archive/poetry/emoji-translator/lesson",
    tags: [
      { type: "subject", value: Subject.English },
      { type: "hidden", value: true },
    ],
  },
  {
    title: "Next Word Prediction",
    link: "/archive/poetry/next-word-prediction/lesson",
    tags: [
      { type: "subject", value: Subject.English },
      { type: "hidden", value: true },
    ],
  },
  {
    title: "Probability Intro",
    link: "/archive/probability/lesson",
    tags: [
      { type: "subject", value: Subject.Mathematics },
      { type: "hidden", value: true },
    ],
  },
  {
    title: "Code Editor Example",
    link: "/archive/code-editor-example/lesson",
    tags: [
      { type: "subject", value: Subject.ComputerScience },
      { type: "hidden", value: true },
    ],
  },
];

export const AllLessons: Lesson[] = [...Lessons, ...ArchivedLessons];
