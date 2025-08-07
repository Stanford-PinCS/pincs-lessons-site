"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import { TextEditor } from "./TextEditor";
import InstructionsRenderer from "./MarkdownRenderer";
import { ChevronDownIcon } from "lucide-react";
import CodeOutput from "./CodeOutput";

const getInitialEditorState = (
  lessonId: string,
  starterCode: string | undefined
): {
  initialCode: string;
  initialEditorSize: number;
  initialInstructionsHeight: number;
  initialInstructionsStep: string;
} => {
  const defaultEditorSize = 50;
  const defaultInstructionsHeight = 50;

  const editorStateFromLocalStorage = localStorage.getItem(lessonId);
  if (editorStateFromLocalStorage) {
    try {
      const lessonAndPreferences = JSON.parse(editorStateFromLocalStorage);
      return {
        initialCode: lessonAndPreferences["userCode"] || "",
        initialEditorSize:
          lessonAndPreferences["editorSize"] || defaultEditorSize,
        initialInstructionsHeight:
          lessonAndPreferences["instructionsHeight"] ||
          defaultInstructionsHeight,
        initialInstructionsStep: lessonAndPreferences["instructionsStep"] || "",
      };
    } catch (e) {
      console.error("invalid json for lesson ", lessonId);
    }
  }
  return {
    initialCode: starterCode || "",
    initialEditorSize: defaultEditorSize,
    initialInstructionsHeight: defaultInstructionsHeight,
    initialInstructionsStep: "",
  };
};

export const CodeEditor = ({
  lessonId,
  instructionsMarkdown,
  height,
  starterCode,
  language,
  pluginId,
}: {
  lessonId: string;
  instructionsMarkdown: string;
  height: number;
  starterCode?: string;
  language: "python" | "javascript";
  pluginId: string;
}) => {
  const [editorSize, setEditorSize] = useState(50);
  const [instructionsHeight, setInstructionsHeight] = useState(50);
  const [userCode, setUserCode] = useState("");
  const [instructionsStep, setInstructionsStep] = useState("");

  const editorContainerRef = useRef<HTMLDivElement>(null);
  const codeEditorContainerRef = useRef<HTMLDivElement>(null);

  // initialize editor
  useEffect(() => {
    const {
      initialCode,
      initialEditorSize,
      initialInstructionsHeight,
      initialInstructionsStep,
    } = getInitialEditorState(lessonId, starterCode);
    setEditorSize(initialEditorSize);
    setInstructionsHeight(initialInstructionsHeight);
    setUserCode(initialCode);
    setInstructionsStep(initialInstructionsStep);
  }, []);

  // Resizing code window
  const editorDividerRef = useRef<HTMLDivElement>(null);
  const [editorDividerMouseDown, setEditorDividerMouseDown] = useState(false);

  const onEditorDividerPointerDown = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      editorDividerRef.current?.setPointerCapture(e.pointerId);
      setEditorDividerMouseDown(true);
      const stopListening = () => {
        setEditorDividerMouseDown(false);
        editorDividerRef.current?.releasePointerCapture(e.pointerId);
        window.removeEventListener("pointerup", stopListening);
      };
      window.addEventListener("pointerup", stopListening);
    },
    [editorDividerRef, setEditorDividerMouseDown]
  );

  // Resizing instructions window
  const instructionsDividerRef = useRef<HTMLDivElement>(null);
  const [instructionsDividerMouseDown, setInstructionsDividerMouseDown] =
    useState(false);

  const onInstructionsDividerPointerDown = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      instructionsDividerRef.current?.setPointerCapture(e.pointerId);
      setInstructionsDividerMouseDown(true);
      const stopListening = () => {
        console.log("stopped listening");
        setInstructionsDividerMouseDown(false);
        instructionsDividerRef.current?.releasePointerCapture(e.pointerId);
        window.removeEventListener("pointerup", stopListening);
      };
      window.addEventListener("pointerup", stopListening);
    },
    [instructionsDividerRef, setInstructionsDividerMouseDown]
  );

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
    }
  };

  // Persist user code and preferences
  useEffect(() => {
    if (typeof window === undefined) return;
    localStorage.setItem(
      lessonId,
      JSON.stringify({
        userCode,
        editorSize,
        instructionsHeight,
        instructionsStep,
      })
    );
  }, [userCode, editorSize, instructionsHeight, instructionsStep]);

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
    >
      <div
        className={`w-full h-full min-w-[300px] md:min-w-0 rounded-lg bg-slate-900`}
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
          <TextEditor
            text={userCode}
            setText={setUserCode}
            language={language}
          />
        </div>
      </div>
      <div className={`flex flex-col items-center h-full w-1.5`}>
        <div
          ref={editorDividerRef}
          id="editor-divider"
          className={`bg-slate-400 rounded-full h-24 w-1.5 cursor-ew-resize my-auto`}
          onPointerDown={onEditorDividerPointerDown}
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
            <InstructionsRenderer
              instructionsText={instructionsMarkdown}
              changeStep={setInstructionsStep}
              // TODO: changing step broken
            />
          </div>
        )}
        {instructionsHeight > 0 ? (
          <div
            className={"flex flex-row justify-center items-center w-full h-2.5"}
          >
            <div
              className="bg-slate-400 rounded-full w-24 h-1.5 cursor-ns-resize"
              ref={instructionsDividerRef}
              onPointerDown={onInstructionsDividerPointerDown}
            ></div>
          </div>
        ) : (
          <div
            className="mx-auto my-0.5 py-0.5 px-1 hover:border-slate-300 cursor-pointer"
            // use pointer down instead of click since pointer up was firing
            // here when the resizer had its pointer up fire causing onClick to fire
            onPointerDown={() => {
              setInstructionsHeight(25);
            }}
          >
            <div className="flex flex-row items-center gap-1">
              <div className="text-sm text-slate-500">Show instructions</div>
              <ChevronDownIcon className="h-4 w-4 text-slate-500" />
            </div>
          </div>
        )}
        <div
          className="flex-col rounded-lg overflow-y-hidden border border-slate-300"
          style={{ height: `${100 - instructionsHeight}%` }}
        >
          <CodeOutput pluginId={pluginId} userCode={userCode} />
        </div>
      </div>
    </div>
  );
};
