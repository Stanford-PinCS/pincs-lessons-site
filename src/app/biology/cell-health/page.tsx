import LessonWrapper from "@/components/LessonWrapper";
import { Metadata } from "next";
import CellHealthVisualizer from "./CellHealthVisualizer";

export const metadata: Metadata = {
  title: "Cell Health Visualizer",
  description: "",
};

export default function CellHealthLesson() {
  return (
    <LessonWrapper>
      <CellHealthVisualizer />
    </LessonWrapper>
  );
}
