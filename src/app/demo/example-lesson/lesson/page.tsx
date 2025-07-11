import LessonWrapper from "@/components/LessonWrapper";
import { Metadata } from "next";
import Example from "./Example";

export const metadata: Metadata = {
  title: "Example Lesson",
  description:
    "A lesson showcasing the various standard components at the disposal of lesson developers.",
};

export default function ExampleLesson() {
  return (
    <LessonWrapper>
      <Example />
    </LessonWrapper>
  );
}
