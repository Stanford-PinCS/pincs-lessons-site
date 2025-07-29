import { useCallback, useContext, useEffect, useRef, useState } from "react";
import Editor from "@monaco-editor/react";

export const TextEditor = () => {
  const [monacoEditor, setMonacoEditor] = useState<typeof editor | undefined>(
    undefined
  );
  const [editorRef, setEditorRef] = useState<editor.IStandaloneCodeEditor>();

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
          // Make tooltips descendants of body to escape monaco's nested stacking context
          // We tried to do any node other than body, none of them seemed to work
          //   overflowWidgetsDomNode: document.body,
          automaticLayout: true,
          wordWrap: "on",
        }}
      />
    </div>
  );
};
