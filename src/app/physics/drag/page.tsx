import LandingPage from "@/components/LandingPage";
import DragLesson from "./lesson/DragLesson";

export default function ExampleLessonLandingPage() {
  return (
    <LandingPage
      teacherResources=""
      lessonDescription="This lesson teaches drag and numerical methods. It targets Topic 2.9 of AP Physics C: Mechanics, although it is designed to be accessible to any physics class. It contains an optional section to dive deep into the fundamentals of drag, which students can easily skip if desired. In the end, students will have gotten practice with solving drag problems using seperation of variables and numerical methods, even putting their logic into code!"
    >
      <DragLesson />
    </LandingPage>
  );
}
