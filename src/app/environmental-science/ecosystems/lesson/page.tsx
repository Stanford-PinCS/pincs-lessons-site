import LessonWrapper from "@/components/LessonWrapper";
import { Metadata } from "next";
import EcosystemsLesson from "./EcosystemsLesson";

export const metadata: Metadata = {
  title: "Ecosystems Lesson",
  description:
    "This is a lesson that teaches fundamental ideas of how ecosystems work.",
};

export default function ExampleLesson() {
  return (
    <div className="container mx-auto px-4 py-8 pb-32">
      <h1 className="ml-14 text-3xl font-bold mb-6">Ecosystems x Algorithms</h1>
      <EcosystemsLesson />
    </div>
  );
}
