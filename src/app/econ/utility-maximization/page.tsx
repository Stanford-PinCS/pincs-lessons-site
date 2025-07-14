import LandingPage from "@/components/LandingPage";
import UtilityLesson from "./lesson/UtilityMaximizationLesson";

export default function ExampleLessonLandingPage() {
  return (
    <LandingPage
      teacherResources=""
      lessonDescription="This lesson targets topics 1.5 and 1.6 of AP Microeconomics, although it can be suitable for non-AP level economics students too. Specifically, it teaches students about Marginal Utility, Marginal Cost, and Marginal Benefit. It also builds intuition for the Law of Diminishing Maringal Utility and teaches students about how to optimize for utility using the MU/P ratio. In the end, student's will code up the logic for a greedy algorithm, solidifying their understanding of all of these topics."
    >
      {" "}
      <UtilityLesson />{" "}
    </LandingPage>
  );
}
