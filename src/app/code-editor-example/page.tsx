import { Metadata } from "next";
import MusicMoodAnalyzer from "./CodeEditorExample";
import LessonWrapper from "@/components/LessonWrapper";

export const metadata: Metadata = {
  title: "Code Editor Example",
  description: "",
};

export default function () {
  return (
    <LessonWrapper>
      <MusicMoodAnalyzer />
    </LessonWrapper>
  );
}
