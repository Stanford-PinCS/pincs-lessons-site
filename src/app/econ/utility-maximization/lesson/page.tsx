import LessonWrapper from "@/components/LessonWrapper";
import { Metadata } from "next";
import UtilityMaximizationLesson from "./UtilityMaximizationLesson";

export const metadata: Metadata = {
  title: "Utility Maximization",
  description:
    "This is a lesson that teaches how to apply the greedy algorithm to optimize for utility for economics.",
};

export default function ExampleLesson() {
  return (
    <LessonWrapper>
      <UtilityMaximizationLesson />
    </LessonWrapper>
  );
}
