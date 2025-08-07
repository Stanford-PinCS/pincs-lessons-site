"use client";
import { ReactNode, useEffect, useState } from "react";
import { Render, Data, PuckComponent, Config } from "@measured/puck";
import { config } from "../puck.config";
import Lesson from "@/components/Lesson";
import LessonWrapper from "@/components/LessonWrapper";
import Block from "@/components/Block";

export default function Preview() {
  const [lessonData, setLessonData] = useState<{ slides: Data[] } | null>(null);

  useEffect(() => {
    const data = localStorage.getItem("lessonPreview");
    if (data) {
      const parsedData = JSON.parse(data);
      setLessonData(parsedData);
      sessionStorage.setItem("lessonPreview", data);
      localStorage.removeItem("lessonPreview");
    } else {
      const sessionData = sessionStorage.getItem("lessonPreview");
      if (sessionData) {
        setLessonData(JSON.parse(sessionData));
      }
    }
  }, []);

  if (!lessonData) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        Loading lesson preview...
      </div>
    );
  }

  const lessonConfig: Config = {
    ...config,
    root: {
      render: ({ children, color, title, mode }) => {
        return (
          <Block color={color} title={title} mode={mode}>
            {children}
          </Block>
        );
      },
    },
  };

  const slides = lessonData.slides.map((slide: Data, index: number) => {
    return <Render key={index} config={lessonConfig} data={slide} />;
  });

  return (
    <LessonWrapper>
      <Lesson slides={slides} />
    </LessonWrapper>
  );
}
