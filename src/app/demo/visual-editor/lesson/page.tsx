import AutomaticLesson from "@/components/AutomaticLesson";
import lessonData from "./lesson.json";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: lessonData.title,
  description: lessonData.description,
};

export default function () {
  console.log("reload", lessonData);
  return <AutomaticLesson data={lessonData.slides}></AutomaticLesson>;
}
