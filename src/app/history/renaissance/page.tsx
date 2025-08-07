import LandingPage from "@/components/LandingPage";
import lessonData from "./lesson/content.json";
import Lesson from "./lesson/page";

export default function ExampleLessonLandingPage() {
  return (
    <LandingPage
      teacherResources={lessonData.teacherResources}
      lessonDescription={lessonData.description}
    >
      <Lesson></Lesson>
    </LandingPage>
  );
}