import { Lesson, Subject, Tag } from "./types"

export const AllLessons : Lesson[] = [
    { title: "Cell health", link: "/biology/cell-health", tags: [ {type: "subject", value: Subject.Biology} ]},
    { title: "Disease spread", link: "/biology/disease-spread", tags: [ {type: "subject", value: Subject.Biology} ] },
    { title: "Memory model", link: "/biology/memory", tags: [ {type: "subject", value: Subject.Biology} ] },
    { title: "Fractals+Recursion", link: "/geometry", tags: [ {type: "subject", value: Subject.Mathematics } ]},
    { title: "Arpanet", link: "/history/arpanet", tags: [ {type: "subject", value: Subject.History} ] },
    { title: "Cryptography", link: "/history/cryptography", tags: [ {type: "subject", value: Subject.History} ] },
    { title: "Music Analysis", link: "/music", tags: [ {type: "subject", value: Subject.Music} ] },
    { title: "Emoji Translator", link: "/poetry/emoji-translator", tags: [ {type: "subject", value: Subject.English} ] },
    { title: "Next Word Prediction", link: "/poetry/next-word-prediction", tags: [ {type: "subject", value: Subject.English} ] },
    { title: "Probability Intro", link: "/probability", tags: [ {type: "subject", value: Subject.Mathematics} ] },
    { title: "Marginal Utility", link: "/econ/marginal-utility", tags: [ {type: "subject", value: Subject.Economics} ] },
    { title: "Code Editor Example", link: "/code-editor-example", tags: [ {type: "subject", value: Subject.ComputerScience} ] },
  ];