"use client";

import React, { JSX, useState } from "react";
import { ArrowUp, ArrowDown, ArrowLeft, ArrowRight, Trash } from "lucide-react";

type Direction = "up" | "down" | "left" | "right";
type ForceType = "gravity" | "friction" | "normal" | "spring";

interface Arrow {
  id: number;
  direction: Direction;
  label: ForceType;
  short: boolean;
}

const TARGET: Arrow[] = [
  { direction: "left", label: "spring", short: false, id: 0 },
  { direction: "right", label: "friction", short: true, id: 1 },
  { direction: "up", label: "normal", short: false, id: 2 },
  { direction: "down", label: "gravity", short: false, id: 3 },
];
const TARGET2: Arrow[] = [
  { direction: "left", label: "spring", short: false, id: 0 },
  { direction: "right", label: "friction", short: true, id: 1 },
  { direction: "up", label: "normal", short: true, id: 2 },
  { direction: "down", label: "gravity", short: true, id: 3 },
];

export default function FreeBodyDiagram() {
  const [arrows, setArrows] = useState<Arrow[]>([]);
  const [nextId, setNextId] = useState(4);
  const [feedback, setFeedback] = useState("");
  const CORRECT_MESSAGE = "Correct diagram! Great job!";

  const addArrow = () => {
    setArrows([
      ...arrows,
      { id: nextId, direction: "up", label: "gravity", short: false },
    ]);
    setNextId(nextId + 1);
    setFeedback("");
  };

  const updateArrow = (id: number, key: keyof Arrow, value: any) => {
    setArrows(arrows.map((a) => (a.id === id ? { ...a, [key]: value } : a)));
    setFeedback("");
  };

  const deleteArrow = (id: number) => {
    setArrows(arrows.filter((a) => a.id !== id));
    setFeedback("");
  };

  const checkDiagram = () => {
    // Give feeback if they didn't have 4 forces.
    if (arrows.length < 4) {
      setFeedback(
        "Think about all the forces acting on the object... what other forces could we add?"
      );
    } else if (arrows.length > 4) {
      setFeedback("We don't need more than four forces for this problem.");
    }
    // Give feedback if they have the wrong forces / directions.
    else if (!TARGET.every((t) => arrows.some((a) => a.label == t.label))) {
      // They are missing a type of force.
      setFeedback("Try to rethink what forces we are dealing with.");
    } else if (
      !TARGET.every((t) =>
        arrows.some((a) => a.label == t.label && a.direction == t.direction)
      )
    ) {
      // Their forces aren't in the right directions.
      setFeedback(
        "We've got the right forces, but let's make sure they're in the right directions."
      );
    } else if (
      ![TARGET, TARGET2].some((to) =>
        to.every((t) =>
          arrows.some(
            (a) =>
              a.label == t.label &&
              a.direction == t.direction &&
              a.short == t.short
          )
        )
      )
    ) {
      // They have messed up the shortnesses.
      setFeedback(
        "Make sure you consider the relative sizes of your forces. Are we accelerating up or down? Are we accelerating left or right?"
      );
    } else {
      setFeedback(CORRECT_MESSAGE);
    }
  };

  const renderArrow = (arrow: Arrow) => {
    const length = arrow.short ? 40 : 80;
    const shaftStyle: React.CSSProperties = {
      position: "absolute",
      left: "50%",
      top: "50%",
      transformOrigin: "center center",
      backgroundColor: "#334155", // slate-800
    };

    let shaft: JSX.Element;
    let arrowhead: JSX.Element;
    let label: JSX.Element;

    switch (arrow.direction) {
      case "up":
        shaft = (
          <div
            style={{
              ...shaftStyle,
              height: `${length}px`,
              width: "2px",
              transform: `translate(-50%, -100%) rotate(0deg)`,
            }}
          />
        );
        arrowhead = (
          <ArrowUp
            size={24}
            className="absolute"
            style={{
              left: "50%",
              top: `calc(50% - ${length + 12}px)`,
              transform: "translateX(-50%)",
              color: "#334155",
            }}
          />
        );
        label = (
          <div
            className="absolute text-sm"
            style={{
              left: "50%",
              top: `calc(50% - ${length + 30}px)`,
              transform: "translateX(-50%)",
            }}
          >
            {arrow.label}
          </div>
        );
        break;

      case "down":
        shaft = (
          <div
            style={{
              ...shaftStyle,
              height: `${length}px`,
              width: "2px",
              transform: `translate(-50%, 0%) rotate(0deg)`,
            }}
          />
        );
        arrowhead = (
          <ArrowDown
            size={24}
            className="absolute"
            style={{
              left: "50%",
              top: `calc(50% + ${length - 12}px)`,
              transform: "translateX(-50%)",
              color: "#334155",
            }}
          />
        );
        label = (
          <div
            className="absolute text-sm"
            style={{
              left: "50%",
              top: `calc(50% + ${length + 20}px)`,
              transform: "translateX(-50%)",
            }}
          >
            {arrow.label}
          </div>
        );
        break;

      case "left":
        shaft = (
          <div
            style={{
              ...shaftStyle,
              width: `${length}px`,
              height: "2px",
              transform: `translate(-100%, -50%) rotate(0deg)`,
            }}
          />
        );
        arrowhead = (
          <ArrowLeft
            size={24}
            className="absolute"
            style={{
              left: `calc(50% - ${length + 12}px)`,
              top: "50%",
              transform: "translateY(-50%)",
              color: "#334155",
            }}
          />
        );
        label = (
          <div
            className="absolute text-sm"
            style={{
              left: `calc(50% - ${length + 24}px)`,
              top: "50%",
              transform: "translateY(-150%)",
            }}
          >
            {arrow.label}
          </div>
        );
        break;

      case "right":
        shaft = (
          <div
            style={{
              ...shaftStyle,
              width: `${length}px`,
              height: "2px",
              transform: `translate(0%, -50%) rotate(0deg)`,
            }}
          />
        );
        arrowhead = (
          <ArrowRight
            size={24}
            className="absolute"
            style={{
              left: `calc(50% + ${length - 12}px)`,
              top: "50%",
              transform: "translateY(-50%)",
              color: "#334155",
            }}
          />
        );
        label = (
          <div
            className="absolute text-sm"
            style={{
              left: `calc(50% + ${length - 12}px)`,
              top: "50%",
              transform: "translateY(-150%)",
            }}
          >
            {arrow.label}
          </div>
        );
        break;
    }

    return (
      <React.Fragment key={arrow.id}>
        {shaft}
        {arrowhead}
        {label}
      </React.Fragment>
    );
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-row gap-4 justify-center">
        {/* Diagram */}
        <div className="">
          <div className="relative w-80 h-80 bg-gray-100 border rounded mx-auto">
            <div className="absolute left-1/2 top-1/2 w-2 h-2 bg-black rounded-full transform -translate-x-1/2 -translate-y-1/2" />
            {arrows.map(renderArrow)}
          </div>
        </div>

        {/* Controls */}
        <div className="flex flex-col gap-3 p-4">
          {arrows.map((arrow) => (
            <div
              key={arrow.id}
              className="flex items-center justify-center gap-2"
            >
              <select
                value={arrow.label}
                onChange={(e) => updateArrow(arrow.id, "label", e.target.value)}
                className="border rounded px-2 py-1"
              >
                <option value="gravity">Gravity</option>
                <option value="friction">Friction</option>
                <option value="normal">Normal</option>
                <option value="spring">Spring</option>
              </select>
              <select
                value={arrow.direction}
                onChange={(e) =>
                  updateArrow(arrow.id, "direction", e.target.value)
                }
                className="border rounded px-2 py-1"
              >
                <option value="up">Up</option>
                <option value="down">Down</option>
                <option value="left">Left</option>
                <option value="right">Right</option>
              </select>
              <select
                value={arrow.short ? "short" : "regular"}
                onChange={(e) =>
                  updateArrow(arrow.id, "short", e.target.value == "short")
                }
                className="border rounded px-2 py-1"
              >
                <option value="regular">Regular</option>
                <option value="short">Short</option>
              </select>
              <button
                onClick={() => deleteArrow(arrow.id)}
                className="text-red-600 hover:text-red-800 p-1"
                title="Delete"
              >
                <Trash size={18} />
              </button>
            </div>
          ))}
          <button
            onClick={addArrow}
            className="border border-blue-600 text-blue-600 px-20 py-2 rounded hover:bg-blue-100 self-center mx-14"
          >
            Add Arrow
          </button>
        </div>
      </div>
      <div className="flex flex-col items-center gap-4">
        {/* Check Button */}
        <div className="flex flex-row gap-4">
          <button
            onClick={checkDiagram}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Get Feedback
          </button>
        </div>

        {/* Feedback */}
        {feedback && (
          <div
            className={`text-center self-center text-lg font-semibold ${
              feedback == CORRECT_MESSAGE ? "text-green-700" : "text-blue-700"
            }`}
          >
            {feedback}
          </div>
        )}
      </div>
    </div>
  );
}
