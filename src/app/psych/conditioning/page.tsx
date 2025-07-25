import LandingPage from "@/components/LandingPage";
import ConditioningLesson from "./lesson/ConditioningLesson";

export default function ExampleLessonLandingPage() {
  return (
    <LandingPage
      teacherResources="https://docs.google.com/document/d/1J8WhZ0jWdM5s1A5n-_vIYYcWcSrPBmWh71ZlL45Wk9U/edit?usp=sharing"
      lessonDescription="Conditioning lesson in progress. Feedback welcome!"
    >
      {" "}
      <ConditioningLesson />{" "}
    </LandingPage>
  );
}
