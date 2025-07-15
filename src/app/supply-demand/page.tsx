import LessonWrapper from "@/components/LessonWrapper";
import { Metadata } from "next";
import SupplyDemandLesson from "./SupplyDemandLesson";

export const metadata: Metadata = {
  title: "Supply and Demand",
  description: "lorem ipsum dolor sit amet",
};

export default function ExampleLesson() {
  return (
    <LessonWrapper>
      <SupplyDemandLesson />
    </LessonWrapper>
  );
}
