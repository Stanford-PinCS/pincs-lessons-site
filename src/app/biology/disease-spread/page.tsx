import LessonWrapper from "@/components/LessonWrapper";
import { Metadata } from "next";
import BFSDiseaseSpread from "./BFSDiseaseSpread";

export const metadata: Metadata = {
  title: "Disease Spread Lesson",
  description: "",
};

export default function BFSDiseaseSpreadLesson() {
  return (
    <LessonWrapper>
      <BFSDiseaseSpread />
    </LessonWrapper>
  );
}
