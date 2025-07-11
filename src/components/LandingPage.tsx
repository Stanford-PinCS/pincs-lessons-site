"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import PincsButton from "./PincsButton";
import PincsHeader from "./PincsHeader";
import { PropsWithChildren, Suspense, useEffect, useState } from "react";

type LandingPageProps = {
  teacherResources: string | undefined;
  lessonDescription: string | undefined;
};

export default function ({
  teacherResources,
  lessonDescription,
  children,
}: PropsWithChildren<LandingPageProps>) {
  return (
    <Suspense>
      <LandingPage
        teacherResources={teacherResources}
        lessonDescription={lessonDescription}
      >
        {children}
      </LandingPage>
    </Suspense>
  );
}

function LandingPage({
  teacherResources, // Future: Link to external doc
  lessonDescription,
  children,
}: PropsWithChildren<LandingPageProps>) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const goToLesson = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete("preview");
    router.push(`${pathname}/lesson`, { scroll: false });
  };

  return (
    <div className="flex flex-col h-screen items-center gap-6">
      <PincsHeader />
      <div className="mx-[300px] text-center">
        <h2 className="text-xl font-semibold text-gray-800">Lesson Preview</h2>
        <div className="overflow-auto border border-gray-300 rounded-lg bg-white shadow-md px-8 py-6 h-64">
          {children}
        </div>
        <p className="mt-4">{lessonDescription}</p>
        <div className="flex flex-row justify-between mt-4">
          <PincsButton text="Go to full lesson" onClick={goToLesson} />
          <PincsButton text="Teacher resources" onClick={() => {}} />
        </div>
      </div>
    </div>
  );
}
