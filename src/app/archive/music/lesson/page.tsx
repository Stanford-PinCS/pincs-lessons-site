import { Metadata } from "next";
import MusicMoodAnalyzer from "./MusicAnalysis";
import LessonWrapper from "@/components/LessonWrapper";

export const metadata: Metadata = {
  title: "Music Mood Analyzer",
  description: "",
};

export default function MusicAnalysisLesson() {
  return (
    <LessonWrapper>
      <MusicMoodAnalyzer />
    </LessonWrapper>
  );
}
