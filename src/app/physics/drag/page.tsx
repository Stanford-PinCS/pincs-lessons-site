import { Metadata } from "next";
import DragLesson from "./DragLesson";
import LessonWrapper from "@/components/LessonWrapper";

export const metadata: Metadata = {
  title: "Modeling Drag",
  description:
    "This lesson teaches how to model drag and use numerical methods to predict motion.",
};

export default function MusicAnalysisLesson() {
  return (
    <LessonWrapper>
      <DragLesson />
    </LessonWrapper>
  );
}
