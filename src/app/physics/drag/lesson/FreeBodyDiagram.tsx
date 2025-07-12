"use client";
import React from "react";

interface FreeBodyDiagramProps {
  /** If true, drag and gravity vectors are equal length. Defaults to false. */
  isTerminalVelocity?: boolean;
}

/**
 * A React component that renders a Free Body Diagram for a falling object.
 * It visually represents the forces of gravity and drag.
 *
 * @param {isTerminalVelocity} - Controls whether the forces are balanced (terminal velocity)
 * or unbalanced (gravity is greater than drag).
 */
export const FreeBodyDiagram: React.FC<FreeBodyDiagramProps> = ({
  isTerminalVelocity = false,
}) => {
  // Define arrow heights based on the state.
  // Using Tailwind's arbitrary values for precise control, but could use h-16, h-28 etc.
  const gravityArrowHeight = "h-[120px]";
  const dragArrowHeight = isTerminalVelocity ? "h-[120px]" : "h-[70px]";

  return (
    // Main container for positioning. my-8 adds vertical margin.
    <div className="relative flex justify-center items-center my-8 h-80">
      {/* Optional: Label for direction of motion */}
      <div className="absolute top-0 text-slate-500 text-sm">
        (Motion is downward)
      </div>

      {/* The Object: A tennis ball */}
      <div className="relative z-10 w-24 h-24 bg-gradient-to-br from-yellow-200 to-yellow-400 rounded-full border-2 border-slate-700 flex justify-center items-center">
        <span className="font-bold text-slate-800">Ball</span>
      </div>

      {/* --- FORCES --- */}

      {/* Gravity Force (Downward) */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 z-0"
        aria-label="Gravity Force Vector"
      >
        {/* Arrow Line */}
        <div className={`w-1 bg-red-500 ${gravityArrowHeight}`} />
        {/* Arrowhead (CSS Triangle) */}
        <div
          className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-0 h-0"
          style={{
            borderLeft: "8px solid transparent",
            borderRight: "8px solid transparent",
            borderTop: "12px solid rgb(239 68 68)", // Tailwind's red-500
          }}
        />
        {/* Label */}
        <div className="absolute -bottom-6 left-4 text-red-600 font-bold text-lg">
          F<sub>g</sub>
        </div>
      </div>

      {/* Drag Force (Upward) */}
      <div
        className="absolute bottom-1/2 left-1/2 -translate-x-1/2 z-0"
        aria-label="Drag Force Vector"
      >
        {/* Arrow Line */}
        <div className={`w-1 bg-blue-500 ${dragArrowHeight}`} />
        {/* Arrowhead (CSS Triangle) */}
        <div
          className="absolute -top-1 left-1/2 -translate-x-1/2 w-0 h-0"
          style={{
            borderLeft: "8px solid transparent",
            borderRight: "8px solid transparent",
            borderBottom: "12px solid rgb(59 130 246)", // Tailwind's blue-500
          }}
        />
        {/* Label */}
        <div className="absolute -top-6 left-4 text-blue-600 font-bold text-lg">
          F<sub>D</sub>
        </div>
      </div>
    </div>
  );
};
