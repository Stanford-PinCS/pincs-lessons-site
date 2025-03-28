import LessonWrapper from "@/components/LessonWrapper";
import { Metadata } from "next";
import ArpanetSimulation from "./ArpanetSimulation";

export const metadata: Metadata = {
  title: "Arpanet Simulation",
  description: "",
};

export default function ArpanetLesson() {
  return (
    <LessonWrapper>
      <ArpanetSimulation />
    </LessonWrapper>
  );
}
