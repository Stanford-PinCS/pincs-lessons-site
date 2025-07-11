import LessonWrapper from "@/components/LessonWrapper";
import { Metadata } from "next";
import MemoryModelVisualization from "./MemoryModelVisualization";

export const metadata: Metadata = {
  title: "Memory Model Lesson",
  description: "",
};

export default function MemoryModelLesson() {
  return (
    <LessonWrapper>
      <MemoryModelVisualization />
    </LessonWrapper>
  );
}
