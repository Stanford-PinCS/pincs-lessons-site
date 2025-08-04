import { useEffect, useRef, useState } from "react";
import { TextEditor } from "./TextEditor";
import InstructionsRenderer from "./MarkdownRenderer";
import { ChevronDownIcon } from "lucide-react";
import CodeOutput from "./CodeOutput";

export const CodeEditor = ({
  lessonId,
  instructionsMarkdown,
  height,
}: {
  lessonId: string;
  instructionsMarkdown: string;
  height: number;
}) => {
  const [editorDividerMouseDown, setEditorDividerMouseDown] = useState(false);
  const [instructionsDividerMouseDown, setInstructionsDividerMouseDown] =
    useState(false);
  const [editorSize, setEditorSize] = useState(50);
  const [codeEditorHeight, setCodeEditorHeight] = useState(0);
  const [instructionsHeight, setInstructionsHeight] = useState(50);

  const editorDividerRef = useRef<HTMLDivElement>(null);
  const previewDividerRef = useRef<HTMLDivElement>(null);
  const editorContainerRef = useRef<HTMLDivElement>(null);
  const codeEditorContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (codeEditorContainerRef.current) {
      setCodeEditorHeight(codeEditorContainerRef.current.clientHeight);
    }
  }, [codeEditorContainerRef]);

  //   useOnOutside([editorDividerRef], () => {
  //     setEditorDividerMouseDown(false);
  //   });

  //   useOnOutside([previewDividerRef], () => {
  //     setInstructionsDividerMouseDown(false);
  //   });

  const resizeEditor = (newX: number, newY: number) => {
    if (!editorContainerRef.current) {
      return;
    }
    if (editorDividerMouseDown) {
      const containerBox = editorContainerRef.current.getBoundingClientRect();
      const totalW = containerBox.width;
      if (totalW <= 180) return;
      // make sure no pane is smaller than 360px
      const minPanePercent = (180 / totalW) * 100;

      setEditorSize(
        Math.max(
          Math.min(
            ((newX - containerBox.left) / totalW) * 100,
            100 - minPanePercent
          ),
          minPanePercent
        )
      );
    }
    if (instructionsDividerMouseDown) {
      const containerBox = editorContainerRef.current.getBoundingClientRect();
      const totalH = containerBox.height;
      const intendedPercent = ((newY - containerBox.top) / totalH) * 100;
      // if you drag too small, fully collapse
      const newPercent =
        intendedPercent < 15 ? 0 : Math.min(intendedPercent, 80);

      setInstructionsHeight(newPercent);
      if (newPercent === 0) {
        // divider will be hidden now so mouseup won't fire
        setInstructionsDividerMouseDown(false);
      }
    }
    if (codeEditorContainerRef.current) {
      setCodeEditorHeight(codeEditorContainerRef.current.clientHeight);
    }
  };

  return (
    <div
      ref={editorContainerRef}
      className={
        "flex gap-1 items-center grow w-full bg-transparent relative overflow-x-scroll md:overflow-x-hidden lg:overflow-x-hidden flex-row rounded-lg"
      }
      style={{ height: `${height}px` }}
      onMouseMove={(e) => {
        resizeEditor(e.clientX, e.clientY);
      }}
      onTouchMove={(e) => {
        const touch = e.touches.item(0);
        resizeEditor(touch.clientX, touch.clientY);
      }}
    >
      <div
        className={`w-full h-full min-w-[300px] md:min-w-0 rounded-lg shadow-md bg-slate-900`}
        style={{
          width: `${Math.min(Math.max(editorSize ?? 50, 0), 100)}%`,
          height: "100%",
        }}
      >
        <div
          className="flex flex-col w-full h-full grow shrink"
          ref={codeEditorContainerRef}
          id="code-editor"
        >
          <TextEditor />
        </div>
      </div>
      <div className={`flex flex-col items-center h-full w-1.5`}>
        <div
          ref={editorDividerRef}
          id="editor-divider"
          className={`bg-slate-400 rounded-full h-24 w-1.5 cursor-ew-resize my-auto`}
          onMouseDown={() => {
            setEditorDividerMouseDown(true);
          }}
          onTouchStart={() => {
            setEditorDividerMouseDown(true);
          }}
          onMouseUp={() => setEditorDividerMouseDown(false)}
          onTouchEnd={() => setEditorDividerMouseDown(false)}
        ></div>
      </div>
      <div
        className={`flex flex-col max-w-full w-full grow shrink overflow-hidden min-w-[360px] md:min-w-0 rounded-lg relative gap-1`}
        style={{
          width: `${Math.min(Math.max(100 - (editorSize ?? 50), 0), 100)}%`,
          height: "100%",
        }}
      >
        {instructionsHeight > 0 && (
          <div
            style={{
              height: `${instructionsHeight}%`,
            }}
            className="flex min-w-[200px] border border-slate-300 rounded-lg"
          >
            <InstructionsRenderer instructionsText={instructionsMarkdown} />
          </div>
        )}
        {instructionsHeight > 0 ? (
          <div
            className={"flex flex-row justify-center items-center w-full h-2.5"}
          >
            <div
              className="bg-slate-400 rounded-full w-24 h-1.5 cursor-ns-resize"
              ref={previewDividerRef}
              onMouseDown={() => {
                setInstructionsDividerMouseDown(true);
              }}
              onTouchStart={() => {
                setInstructionsDividerMouseDown(true);
              }}
              onMouseUp={() => setInstructionsDividerMouseDown(false)}
              onTouchEnd={() => setInstructionsDividerMouseDown(false)}
            ></div>
          </div>
        ) : (
          <div
            className="mx-auto my-0.5 py-0.5 px-1 hover:border-slate-300 cursor-pointer"
            onClick={() => setInstructionsHeight(25)}
          >
            <div className="flex flex-row items-center gap-1">
              <div className="text-sm text-slate-500">Show instructions</div>
              <ChevronDownIcon className="h-4 w-4 text-slate-500" />
            </div>
          </div>
        )}
        <div className="w-full h-full">
          <div className="flex-col h-full w-full rounded-lg overflow-y-hidden border border-slate-300">
            <CodeOutput />
          </div>
        </div>
      </div>
    </div>
  );
};
