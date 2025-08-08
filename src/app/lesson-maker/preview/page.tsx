"use client";
import { useEffect, useMemo, useState } from "react";
import { Render, Data, Config } from "@measured/puck";
import { config } from "../puck.config";
import Lesson from "@/components/Lesson";
import LessonWrapper from "@/components/LessonWrapper";
import Block from "@/components/Block";

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

export default function Preview() {
  const [lessonData, setLessonData] = useState<{ slides: Data[] } | null>(
    () => null
  );

  const slides = useMemo(() => {
    if (lessonData) {
      return lessonData.slides.map((slide: Data, index: number) => {
        return <Render key={index} config={lessonConfig} data={slide} />;
      });
    } else {
      return null;
    }
  }, [lessonData]);

  useEffect(() => {
    if (lessonData) return;
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

  if (!slides) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        Loading lesson preview...
      </div>
    );
  }

  return (
    <LessonWrapper>
      <Lesson slides={slides} />
    </LessonWrapper>
  );
}
