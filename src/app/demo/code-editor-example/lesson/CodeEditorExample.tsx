"use client";
import React from "react";

export const CodeEditorExample: React.FC = () => {
  return (
    <div className="w-[100vw] h-[100vh] p-4">
      <h2 className="text-lg font-bold px-2 text-center">
        Try the coding lesson below!
      </h2>
      <iframe
        src="https://dev.pickcode.io/lesson/cm9774muw002ecfpmc816v627"
        className="h-full w-full rounded-lg"
      ></iframe>
    </div>
  );
};

export default CodeEditorExample;
