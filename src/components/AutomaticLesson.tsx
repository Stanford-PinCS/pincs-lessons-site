"use client";
import { Config, Render } from "@measured/puck";
import { config } from "@/app/lesson-maker/puck.config";
import LessonWrapper from "./LessonWrapper";
import Lesson from "./Lesson";
import { Data } from "@measured/puck";

const lessonConfig: Config = {
  ...config,
  root: {
    render: ({ children }) => {
      return <>{children}</>;
    },
  },
};

export default function ({ data }: { data: Data[] }) {
  const slides = data.map((slide: Data, index: number) => {
    console.log(slide);
    return <Render key={index} config={lessonConfig} data={slide}></Render>;
  });
  return (
    <LessonWrapper>
      <Lesson slides={slides}></Lesson>
    </LessonWrapper>
  );
}
