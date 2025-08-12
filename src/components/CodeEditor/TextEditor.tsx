import Editor from "@monaco-editor/react";
import { useEffect } from "react";

export const TextEditor = ({
  text,
  setText,
  language,
}: {
  text: string;
  setText: (n: string) => void;
  language: "python" | "javascript";
}) => {
  useEffect(() => {
    // For tooltip styling. See index.css
    document.body.classList.add("monaco-editor");
  }, []);

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
