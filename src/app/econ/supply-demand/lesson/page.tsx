import LessonWrapper from "@/components/LessonWrapper";
import { Metadata } from "next";
import SupplyDemandLesson from "./SupplyDemandLesson";

export const metadata: Metadata = {
  title: "Supply and Demand",
  description:
    "An interactive way to learn the basic economic concept of supply and demand, in addition to the basic computer science concept of for loops.",
};

export default function ExampleLesson() {
  return (
    <LessonWrapper>
      <SupplyDemandLesson />
    </LessonWrapper>
  );
}
