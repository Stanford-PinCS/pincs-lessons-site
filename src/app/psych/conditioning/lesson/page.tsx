import LessonWrapper from "@/components/LessonWrapper";
import { Metadata } from "next";
import ConditioningLesson from "./ConditioningLesson";

export const metadata: Metadata = {
  title: "Conditioning Lesson",
  description:
    "An interactive lesson on the principles of classical and operant conditioning.",
};

export default function ConditioningLessonPage() {
  return (
    <LessonWrapper>
      <ConditioningLesson />
    </LessonWrapper>
  );
}
