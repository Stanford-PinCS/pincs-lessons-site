import LandingPage from "@/components/LandingPage";
import DragLesson from "./lesson/DragLesson";

export default function ExampleLessonLandingPage() {
  return (
    <LandingPage
      teacherResources="https://docs.google.com/document/d/1MYFIR0p_AOkndjrMBBGdp6Z9KuZNBKA1TiXDsL9-ieQ/edit?usp=sharing"
      lessonDescription="This lesson teaches drag and numerical methods. It targets Topic 2.9 of AP Physics C: Mechanics, although it is designed to be accessible to any physics class. It contains an optional section to dive deep into the fundamentals of drag, which students can easily skip depending on the desired depth of your course. In the end, students will have gotten practice with solving drag problems using seperation of variables and numerical methods, even putting their logic and formulas into a fun code module!"
    >
      <DragLesson />
    </LandingPage>
  );
}
