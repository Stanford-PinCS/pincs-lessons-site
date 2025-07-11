import LessonWrapper from "@/components/LessonWrapper";
import { Metadata } from "next";
import UtilityOptimizationLesson from "./UtilityOptimizationLesson";

export const metadata: Metadata = {
  title: "Utility Optimization",
  description:
    "This is a lesson that teaches how to apply the greedy algorithm to optimize for utility for economics.",
};

export default function ExampleLesson() {
  return (
    <LessonWrapper>
      <UtilityOptimizationLesson />
    </LessonWrapper>
  );
}
