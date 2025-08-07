"use client";
import { CodeEditor } from "@/components/CodeEditor/CodeEditor";
import React from "react";

const instructionsMarkdown = `
# Hello world

\`print\` is very important

- Step 1
- Step 2
- Step 3
`;

export const CodeEditorExample: React.FC = () => {
  return (
    <div className="w-[100vw] h-[100vh] p-4">
      <h2 className="text-lg font-bold px-2 text-center">
        Try the coding lesson below!
      </h2>
      <CodeEditor
        instructionsMarkdown={instructionsMarkdown}
        lessonId="test-code-editor"
        pluginId="chat-demo"
        height={600}
        language={"python"}
      />
    </div>
  );
};

export default CodeEditorExample;
