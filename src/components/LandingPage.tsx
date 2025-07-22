"use client";

import { usePathname, useRouter } from "next/navigation";
import PincsButton from "./PincsButton";
import PincsHeader from "./PincsHeader";
import { PropsWithChildren } from "react";

type LandingPageProps = {
  teacherResources: string | undefined;
  lessonDescription: string | undefined;
};

export default function LandingPage({
  teacherResources,
  lessonDescription,
  children,
}: PropsWithChildren<LandingPageProps>) {
  const router = useRouter();
  const pathname = usePathname();

  const goToLesson = () => {
    router.push(`${pathname}/lesson`, { scroll: false });
  };

  const goToResources = () => {
    if (teacherResources) {
      window.open(teacherResources);
    }
  };

  return (
    <div className="flex flex-col h-screen items-center gap-6">
      <PincsHeader />
      <div className="px-5 sm:px-[20vw] w-full">
        <h2 className="text-xl font-semibold text-center text-gray-800">
          Lesson Preview
        </h2>
        <div className="overflow-auto border border-gray-300 rounded-lg bg-white shadow-md px-8 py-6 h-64">
          {children}
        </div>
        <br />
        <h2 className="text-xl font-semibold text-center text-gray-800">
          Lesson Description
        </h2>
        <p className="mt-4">{lessonDescription}</p>
        <div className="flex flex-row justify-between mt-4">
          <PincsButton text="Go to full lesson" onClick={goToLesson} />
          <PincsButton text="Teacher resources " onClick={goToResources} />
        </div>
      </div>
    </div>
  );
}
