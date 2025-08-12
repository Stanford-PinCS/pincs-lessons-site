"use client";
/*
 * Use VSCode's Monaco editor to support users typing code
 * Monaco provides syntax highlighting
 * This is a controlled component, the text and setText are provided by parent
 */

import Editor from "@monaco-editor/react";

export const TextEditor = ({
  text,
  setText,
  language,
}: {
  // The user's current code text
  text: string;
  // Update the current code text
  setText: (n: string) => void;
  // The language used for syntax highlighting
  language: "python" | "javascript";
}) => {
  return (
    <div className="w-full h-full" id="code-text-editor">
      <Editor
        height="100%"
        theme="vs-dark"
        options={{
          minimap: {
            enabled: false,
          },
          fontSize: 14,
          // Make tooltips descendants of body to escape monaco's nested stacking context
          // We tried to do any node other than body, none of them seemed to work
          //   overflowWidgetsDomNode: document.body,
          automaticLayout: true,
          wordWrap: "on",
        }}
        value={text}
        onChange={(n: string | undefined) => setText(n || "")}
        defaultLanguage={language}
      />
    </div>
  );
};
