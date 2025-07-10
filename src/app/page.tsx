"use client";
import Link from "next/link";
import { Lesson, Subject, Tag, tagsMatch } from "./types";
import { useCallback, useState } from "react";
import TagFilterBox from "@/components/TagFilterBox";
import { AllLessons } from "./lessons";
import { ArrowLongLeftIcon, FunnelIcon } from "@heroicons/react/16/solid";
import PincsHeader from "@/components/PincsHeader";
import PincsButton from "@/components/PincsButton";

export default function Home() {
  const [filterDrawerOpen, setFilterDrawerOpen] = useState<boolean>(false);
  const [selectedSubjects, setSelectedSubjects] = useState<Tag[]>([]);
  const subjects = Object.values(Subject);

  /* TRUE iff the lesson has at least one tag in selectedSubjects AND it's not hidden*/
  const filterLesson = useCallback(
    (lesson: Lesson) => {
      if (
        lesson.tags.some((tag) => tag.type === "hidden" && tag.value === true)
      ) {
        return false;
      } else if (selectedSubjects.length === 0) {
        return true;
      }
      return lesson.tags.some((tag) =>
        selectedSubjects.some((sel) => tagsMatch(tag, sel))
      );
    },
    [selectedSubjects]
  );

  return (
    <div className="flex flex-col h-screen">
      <PincsHeader />
      <div className="flex flex-row h-full">
        <div
          className={`flex relative transition-all duration-500 ${
            filterDrawerOpen ? "pl-72" : "pl-0"
          }`}
        >
          {!filterDrawerOpen && (
            <PincsButton
              text="Filter"
              onClick={() => setFilterDrawerOpen((o) => !o)}
              iconRight={<FunnelIcon width={16} />}
            />
          )}
          <aside
            className={`
            absolute inset-y-0 left-0
            w-72 border-r border-gray-300
            transform transition-transform duration-500 ease-in-out
            ${filterDrawerOpen ? "translate-x-0" : "-translate-x-full"}
          `}
          >
            <div className="flex items-center justify-between p-4 bg-gray-100">
              <h2 className="text-lg">Filter Lessons</h2>
              <button
                className="cursor-pointer rounded-sm p-1 hover:bg-gray-200"
                onClick={() => setFilterDrawerOpen((o) => !o)}
              >
                <ArrowLongLeftIcon className="fill-gray-700 h-5" />
              </button>
            </div>
            <TagFilterBox
              selectedItems={selectedSubjects}
              setSelectedItems={setSelectedSubjects}
              allItems={subjects.map((subject) => ({
                type: "subject",
                value: subject,
              }))}
            />
          </aside>
        </div>

        <main className="flex flex-1 overflow-y-auto p-8 flex flex-col items-center gap-8">
          <h1 className="text-2xl font-bold">PinCS Interactive Lessons</h1>

          <div className="flex flex-wrap gap-4 justify-center">
            {AllLessons.filter((lesson) => {
              return filterLesson(lesson);
            }).map((l, i) => (
              <Link
                key={i}
                className="p-4 rounded-lg border border-slate-300 w-60 flex items-center justify-center hover:border-indigo-500 transition-colors"
                href={l.link}
              >
                {l.title}
              </Link>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
