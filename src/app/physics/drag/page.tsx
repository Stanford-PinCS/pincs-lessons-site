import { Metadata } from "next";
import DragLesson from "./DragLesson";
import LessonWrapper from "@/components/LessonWrapper";

export const metadata: Metadata = {
  title: "Music Mood Analyzer",
  description: "",
};

export default function MusicAnalysisLesson() {
  return (
    <LessonWrapper>
      <DragLesson />
    </LessonWrapper>
  );
}
