import LessonWrapper from "@/components/LessonWrapper";
import { Metadata } from "next";
import FractalsRecursion from "./FractalsRecursion";

export const metadata: Metadata = {
  title: "Fractals and Recursion",
  description: "",
};

export default function FractalsLesson() {
  return (
    <LessonWrapper>
      <FractalsRecursion />
    </LessonWrapper>
  );
}
