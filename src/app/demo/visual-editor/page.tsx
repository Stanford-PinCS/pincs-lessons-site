import LandingPage from "@/components/LandingPage";
import lessonData from "./lesson/lesson.json";
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
