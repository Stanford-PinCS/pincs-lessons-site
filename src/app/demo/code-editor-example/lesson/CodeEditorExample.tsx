"use client";
import { CodeEditor } from "@/components/CodeEditor/CodeEditor";
import React from "react";

export const CodeEditorExample: React.FC = () => {
  return (
    <div className="w-[100vw] h-[100vh] p-4">
      <h2 className="text-lg font-bold px-2 text-center">
        Try the coding lesson below!
      </h2>
      <CodeEditor
        instructionsMarkdown="Hello world"
        lessonId="test-code-editor"
      />
    </div>
  );
};

export default CodeEditorExample;
