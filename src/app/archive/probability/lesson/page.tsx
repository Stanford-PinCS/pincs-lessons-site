import LessonWrapper from "@/components/LessonWrapper";
import { Metadata } from "next";
import ProbabilityIntro from "./ProbabilityIntro";

export const metadata: Metadata = {
  title: "Probability Lesson",
  description: "",
};

export default function ProbabilityLesson() {
  return (
    <LessonWrapper>
      <ProbabilityIntro />
    </LessonWrapper>
  );
}
