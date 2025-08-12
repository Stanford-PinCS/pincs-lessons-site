"use client";
import { CodeEditor } from "@/components/CodeEditor/CodeEditor";
import React from "react";

const instructionsMarkdown = `


<Slide>
# Hello world
<Step>Welcome to the lesson</Step>
<Step>\`print\` is very important</Step>

</Slide>
<Slide>
# Part 2
- Step 1
- Step 2
- Step 3
</Slide>
`;

export const CodeEditorExample: React.FC = () => {
  return (
    <div className="w-[100vw] h-[100vh] p-4">
      <h2 className="text-lg font-bold px-2 text-center">
        Try the coding lesson below!
      </h2>
      <CodeEditor
        instructionsMarkdown={instructionsMarkdown}
        lessonId="particle-simulation-lesson"
        pluginId="particle-simulation"
        height={600}
        language={"javascript"}
      />
    </div>
  );
};

export default CodeEditorExample;
