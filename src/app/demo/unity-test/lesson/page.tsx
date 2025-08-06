import AutomaticLesson from "@/components/AutomaticLesson";
import lessonData from "./content.json";
import { Metadata } from "next";


export const metadata: Metadata = {
  title: lessonData.title,
  description: lessonData.description,
};

export default function () {
  return (
    <AutomaticLesson
      data={lessonData.slides}
      customComponents={{  }}
    ></AutomaticLesson>
  );
}
