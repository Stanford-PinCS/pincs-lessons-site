import LandingPage from "@/components/LandingPage";
import Example from "./lesson/Example";

export default function ExampleLessonLandingPage() {
  return (
    <LandingPage
      teacherResources=""
      lessonDescription="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
    >
      {" "}
      <Example />{" "}
    </LandingPage>
  );
}
