"use client";
import { Config, Render } from "@measured/puck";
import { config } from "@/app/lesson-maker/puck.config";
import LessonWrapper from "./LessonWrapper";
import Lesson from "./Lesson";
import { Data } from "@measured/puck";
import { useState } from "react";

const lessonConfig: Config = {
  ...config,
  root: {
    render: ({ children }) => {
      return <>{children}</>;
    },
  },
};

/**
 * Note: Data cannot change, since it only loads in the data once to avoid rerenders.
 */
export default function ({ data }: { data: Data[] }) {
  // Only load once, otherwise it will try to reload every time the url changes,
  // causing glitchy behavior as <Text/> will take a few milliseconds to load in.
  const [slides, setSlides] = useState(() => {
    return data.map((slide: Data, index: number) => {
      return <Render key={index} config={lessonConfig} data={slide}></Render>;
    });
  });
  return (
    <LessonWrapper>
      <Lesson slides={slides}></Lesson>
    </LessonWrapper>
  );
}
