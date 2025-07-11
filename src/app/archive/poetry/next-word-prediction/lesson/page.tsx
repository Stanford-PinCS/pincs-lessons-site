import { Metadata } from "next";
import LessonWrapper from "@/components/LessonWrapper";
import NextWordPoetryPredictor from "./NextWordPoetryPredictor";

export const metadata: Metadata = {
  title: "Next Word Prediction",
  description: "",
};

export default function NextWordLesson() {
  return (
    <LessonWrapper>
      <NextWordPoetryPredictor />
    </LessonWrapper>
  );
}
