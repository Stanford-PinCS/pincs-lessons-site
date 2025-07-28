import LandingPage from "@/components/LandingPage";
import RenaissanceLesson from "./lesson/RenaissanceLesson";

export default function ExampleLessonLandingPage() {
  return (
    <LandingPage
      teacherResources=""
      lessonDescription="This lesson takes students on a deep dive about the Renaissance."
    >
      {" "}
      <RenaissanceLesson />{" "}
    </LandingPage>
  );
}
