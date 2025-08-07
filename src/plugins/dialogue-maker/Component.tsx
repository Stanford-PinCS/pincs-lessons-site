import { observer } from "mobx-react-lite";
import React, { useEffect, useState, useRef } from "react";
import State from "./state";
import { Scene } from "./messages";

const Component = observer(({ state }: { state: State | undefined }) => {
  const scenes = state?.scenes || {};
  const [sceneName, setSceneName] = useState("start");
  const [updateKey, setUpdateKey] = useState(0);
  const curScene: Scene | undefined = scenes[sceneName];
  const [mode, setMode] = useState<"Regular" | "Developer">("Regular");
  const [displayedText, setDisplayedText] = useState("");
  const [visibleChoiceCount, setVisibleChoiceCount] = useState(0);
  const choiceTimeouts = useRef<NodeJS.Timeout[]>([]);

  useEffect(() => {
    choiceTimeouts.current.forEach(clearTimeout);
    choiceTimeouts.current = [];

    if (!curScene) return;

    // Reset visibility for the new scene
    setVisibleChoiceCount(0);

    // In Developer mode, skip all animations and show everything at once.
    if (mode !== "Regular" || !curScene.message) {
      setDisplayedText(curScene.message ?? "");
      setVisibleChoiceCount(curScene.choices.length);
      return;
    }

    // --- Logic for "Typing" Text Effect ---
    setDisplayedText("");
    const fullText = curScene.message;
    let count = 0;
    const typingInterval = setInterval(() => {
      count++;
      setDisplayedText(fullText.substring(0, count));

      // When text is finished, stop the typing and start showing choices.
      if (count > fullText.length) {
        clearInterval(typingInterval);

        curScene.choices.forEach((_, index) => {
          const timeoutId = setTimeout(() => {
            setVisibleChoiceCount((prevCount) => prevCount + 1);
          }, 500 * (index + 1)); // Stagger each choice by 500ms
          choiceTimeouts.current.push(timeoutId);
        });
      }
    }, 20);

    // The main cleanup function for the effect
    return () => {
      clearInterval(typingInterval);
      choiceTimeouts.current.forEach(clearTimeout);
    };
  }, [updateKey, mode, curScene]);

  // This function now also increments the updateKey to force a re-render.
  function updateSceneTo(newSceneName: string) {
    setSceneName(newSceneName);
    setUpdateKey((key) => key + 1);
  }

  if (!curScene) {
    return (
      <div className="text-lg p-6 space-y-6 text-red-700">
        <p>Error: Invalid scene name "{sceneName}".</p>
        <p>
          Valid scene names:{" "}
          <span className="text-black font-mono">
            {Object.keys(scenes).join(", ")}
          </span>
        </p>
        <button
          className="bg-blue-600 text-white rounded px-4 py-2 hover:bg-blue-700"
          onClick={() => updateSceneTo("start")}
        >
          Go back to "start"
        </button>
      </div>
    );
  }

  const devSyntax = (label: string, value: string, isString = true) => (
    <span className="font-mono text-sm">
      <span className="text-cyan-400">{label}</span>
      <span className="text-gray-500"> = </span>
      {isString ? (
        <span className="text-amber-400">"{value}"</span>
      ) : (
        <span className="text-amber-400">{value}</span>
      )}
    </span>
  );

  const devModeColors = {
    bg: "bg-slate-900",
    text: "text-gray-300",
    border: "border-slate-700",
    buttonBg: "bg-slate-800",
    buttonHover: "hover:bg-slate-700",
    buttonBorder: "border-slate-600",
  };

  const regularModeColors = {
    bg: "bg-[#f9f3e8]",
    text: "text-[#3b2f2f]",
    border: "border-[#d6c8a4]",
    buttonBg: "bg-[#b58e55]",
    buttonHover: "hover:bg-[#a47d40]",
    buttonBorder: "border-transparent",
  };

  const colors = mode === "Developer" ? devModeColors : regularModeColors;

  return (
    <div className="relative p-6 max-w-3xl mx-auto">
      {/* Mode Selector */}
      <div className="mb-6 bg-gray-100 p-4 rounded-md">
        <label htmlFor="mode-select" className="mr-3 font-semibold">
          Mode:
        </label>
        <select
          id="mode-select"
          value={mode}
          onChange={(e) => setMode(e.target.value as "Regular" | "Developer")}
          className="p-2 rounded border border-gray-400"
        >
          <option value="Regular">Play</option>
          <option value="Developer">Developer</option>
        </select>
      </div>

      {/* Scene Message */}
      <div
        className={`p-6 rounded-lg shadow-xl space-y-2 border ${colors.bg} ${colors.text} ${colors.border}`}
      >
        {mode === "Developer" && (
          <div className="mb-2">
            {devSyntax("scene", sceneName)}
            <br />
            <span className="text-cyan-400 font-mono text-sm">{`${sceneName}.message:`}</span>
          </div>
        )}
        <p className="text-lg leading-relaxed font-serif whitespace-pre-wrap">
          {displayedText}
        </p>
      </div>

      {/* Choices */}
      <div className="flex flex-col gap-4 mt-6">
        {curScene.choices.slice(0, visibleChoiceCount).map((choice, index) => {
          const next = scenes[choice.nextScene];
          return (
            <button
              key={index}
              onClick={() => updateSceneTo(choice.nextScene)}
              className={`p-4 rounded-md shadow-md w-full text-left transition border ${colors.buttonBg} ${colors.text} ${colors.buttonHover} ${colors.buttonBorder}`}
            >
              {mode === "Developer" && (
                <div
                  className={`mb-3 p-3 rounded text-sm font-mono ${devModeColors.bg} text-gray-400 border ${devModeColors.border}`}
                >
                  <div className="mb-1">
                    {devSyntax(`choices[${index}].nextScene`, choice.nextScene)}
                  </div>
                  <div className="pl-2 border-l-2 border-slate-700">
                    {next ? (
                      <>
                        <div className="text-cyan-400">{`${choice.nextScene}.message:`}</div>
                        <div className="text-gray-500 italic">
                          "{next.message}"
                        </div>
                      </>
                    ) : (
                      <div className="text-red-500 font-semibold">
                        Error: scene "{choice.nextScene}" not found.
                      </div>
                    )}
                  </div>
                </div>
              )}
              <span className="text-base font-serif">{choice.response}</span>
            </button>
          );
        })}

        {/* Reset Button */}
        {visibleChoiceCount === curScene.choices.length && (
          <button
            className="mt-4 bg-gray-700 text-white px-4 py-2 rounded hover:bg-gray-800 self-start"
            onClick={() => updateSceneTo("start")}
          >
            Reset
          </button>
        )}
      </div>
    </div>
  );
});

export default Component;
