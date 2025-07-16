import LandingPage from "@/components/LandingPage";
import SupplyDemandLesson from "./lesson/SupplyDemandLesson";

export default function ExampleLessonLandingPage() {
  return (
    <LandingPage
      teacherResources="https://docs.google.com/document/d/1KfcO3M2svgW2Fj6TG2URu0a40tJXV5PH4zLJfmf6YAo/edit?usp=sharing"
      lessonDescription="An interactive way to learn the basic economic concept of supply and demand, in addition to the basic computer science concept of for loops."
    >
      {" "}
      <SupplyDemandLesson />{" "}
    </LandingPage>
  );
}
