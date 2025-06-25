import { Metadata } from "next";
import { HoyoonsFirstLesson } from "./HoyoonsLesson";
import LessonWrapper from "@/components/LessonWrapper";

export const metadata: Metadata = {
  title: "Code Editor Example",
  description: "",
};

export default function () {
  return (
    <LessonWrapper>
      <HoyoonsFirstLesson />
    </LessonWrapper>
  );
}
