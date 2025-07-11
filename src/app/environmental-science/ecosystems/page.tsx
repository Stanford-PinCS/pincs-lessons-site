import LandingPage from "@/components/LandingPage";
import EcosystemsLesson from "./lesson/EcosystemsLesson";

export default function ExampleLessonLandingPage() {
  return (
    <LandingPage
      teacherResources=""
      lessonDescription="This lesson demonstrates how ecosystems work by having students create and simulate ecosystems. At the same time, this lesson explains how food webs can be represented by graph theory and different ways of navigating networks that are useful in and beyond environemntal science."
    >
      {" "}
      <EcosystemsLesson />{" "}
    </LandingPage>
  );
}
