"use client";
import { usePathname } from "next/navigation";
import React from "react";

export interface BlockProps {
  children: React.ReactNode;
  color: "green" | "blue" | "yellow" | "purple";
  title: string;
  mode?: "regular" | "fullscreen";
}

const Block: React.FC<BlockProps> = ({
  children,
  color,
  title,
  mode = "regular",
}) => {
  // Adding classes as hard-coded strings for Tailwind's just-in-time compiler.
  const borderClasses = {
    green: "border-green-500",
    blue: "border-blue-500",
    yellow: "border-yellow-500",
    purple: "border-purple-500",
  };
  const textClasses = {
    green: "text-green-500",
    blue: "text-blue-500",
    yellow: "text-yellow-500",
    purple: "text-purple-500",
  };

  const path = usePathname();
  const previewMode =
    !path.split("/").includes("lesson") && !path.includes("/preview");
  const lessonMakerMode =
    path.split("/").includes("lesson-maker") && !path.includes("/preview");

  const sectionFullscreenClasses =
    mode == "fullscreen" && !previewMode ? "w-screen mt-3 left-0 fixed" : "";
  const h1FullscreenClasses =
    mode == "fullscreen" && !previewMode
      ? "fixed top-7 -translate-x-10 text-center w-full text-[min(4vw,2rem)]"
      : "";

  const sectionLessonMakerStyle =
    mode == "fullscreen" && lessonMakerMode
      ? "fixed left-0 w-[calc(100%-30px)]!"
      : "";

  const h1LessonMakerStyle =
    mode == "fullscreen" && lessonMakerMode ? "text-center" : "";

  return (
    <section
      className={`border-l-4 pl-6 space-y-6 text-lg ${borderClasses[color]} ${sectionFullscreenClasses} ${sectionLessonMakerStyle}`}
    >
      <h1
        className={`text-3xl font-bold mb-4 ${textClasses[color]} ${h1FullscreenClasses} ${h1LessonMakerStyle}`}
      >
        {title}
      </h1>
      <div className="text-gray-700 space-y-4">{children}</div>
    </section>
  );
};

export default Block;
