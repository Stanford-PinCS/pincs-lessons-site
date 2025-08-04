import LessonWrapper from "@/components/LessonWrapper";
import { Metadata } from "next";
import RenaissanceLesson from "./RenaissanceLesson";

export const metadata: Metadata = {
  title: "Renaissance Lesson",
  description:
    "This lesson takes students on a deep dive about the Renaissance.",
};

export default function ExampleLesson() {
  return (
    <LessonWrapper>
      <RenaissanceLesson />
    </LessonWrapper>
  );
}
