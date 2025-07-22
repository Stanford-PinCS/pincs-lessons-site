import LandingPage from "@/components/LandingPage";
import ForcesLesson from "./lesson/ForcesLesson";

export default function ExampleLessonLandingPage() {
  return (
    <LandingPage
      teacherResources="https://docs.google.com/document/d/15WGKIbQEHPWGp4cyRWQAMTp8okSxzOi6hhinJ8qXPzE/edit?usp=sharing"
      lessonDescription="This lesson teaches the basics of forces, useful for any high school physics class. It will walk students through what a force is, how to deal with vectors (breaking down a force vector into its components), how to make a free body diagram, and how to add forces. Along the way, students will have put the steps of adding forces into logic, strengthening the steps of component-wise vector addition."
    >
      <ForcesLesson />
    </LandingPage>
  );
}
