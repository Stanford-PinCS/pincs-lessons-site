"use client";
import Emphasize from "@/components/Emphasize";
import React from "react";

/**
 * A React component that accurately visualizes the difference between low Reynolds number
 * (laminar flow) and high Reynolds number (turbulent flow), matching the provided
 * reference image in all details.
 */
export const ReynoldsDiagram: React.FC = () => {
  return (
    // Main container with light background and grid layout
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6 p-4 bg-gray-100/75 rounded-lg">
      {/* Column 1: Low Reynolds Number - Laminar Flow */}
      <div className="bg-white border border-gray-200 rounded-lg p-4 text-center flex flex-col">
        <h3 className="text-lg font-bold text-gray-800">
          Low Reynolds Number (Re {"<<"} 1)
        </h3>
        <p className="text-sm text-gray-500 mb-4">
          Smooth, orderly (laminar) flow
        </p>

        {/* SVG Diagram for Laminar Flow */}
        <div className="flex-grow flex items-center justify-center">
          <svg viewBox="0 0 100 80" aria-label="Laminar flow around a sphere">
            {/* Common styles for flow lines */}
            <defs>
              <style>{`
                .flow-line {
                  fill: none;
                  stroke: #9ca3af; /* gray-400 */
                  stroke-width: 3.5;
                  stroke-linecap: round;
                }
              `}</style>
            </defs>

            {/* The blue sphere */}
            <circle cx="40" cy="40" r="15" fill="#3b82f6" />

            {/* --- Flow Lines (Corrected) --- */}
            {/* Top and Bottom lines are continuous */}
            <path className="flow-line" d="M 0 15 H 100" />

            {/* Inner lines wrap correctly around the sphere */}
            <path
              className="flow-line"
              d="M 0 27.5 H 26 C 30 27.5, 30 25, 40 25 C 50 25, 50 27.5, 54 27.5 H 100"
            />

            {/* Middle line is interrupted by the sphere */}
            <path className="flow-line" d="M 0 40 H 25" />
            <path className="flow-line" d="M 55 40 H 100" />

            <path
              className="flow-line"
              d="M 0 52.5 H 26 C 30 52.5, 30 55, 40 55 C 50 55, 50 52.5, 54 52.5 H 100"
            />

            <path className="flow-line" d="M 0 65 H 100" />
          </svg>
        </div>

        {/* Analogy Box */}
        <div className="mt-4 p-2 bg-blue-100 text-blue-800 rounded-md text-sm">
          <Emphasize>Think:</Emphasize> A tiny bead falling in thick honey.
        </div>
      </div>

      {/* Column 2: High Reynolds Number - Turbulent Flow */}
      <div className="bg-white border border-gray-200 rounded-lg p-4 text-center flex flex-col">
        <h3 className="text-lg font-bold text-gray-800">
          High Reynolds Number (Re {">>"} 1)
        </h3>
        <p className="text-sm text-gray-500 mb-4">
          Chaotic, swirling (turbulent) flow
        </p>

        {/* SVG Diagram for Turbulent Flow */}
        <div className="flex-grow flex items-center justify-center">
          <svg viewBox="0 0 100 80" aria-label="Turbulent flow around a sphere">
            <defs>
              <style>{`
                .flow-line {
                  fill: none;
                  stroke: #9ca3af; /* gray-400 */
                  stroke-width: 3.5;
                  stroke-linecap: round;
                }
              `}</style>
            </defs>

            {/* The red sphere */}
            <circle cx="40" cy="40" r="15" fill="#ef4444" />

            {/* --- Flow Lines (Corrected) --- */}
            {/* Top and Bottom lines are continuous and extend fully */}
            <path className="flow-line" d="M 0 15 H 100" />

            {/* Incoming inner lines with stagnation effect */}
            <path className="flow-line" d="M 0 27.5 H 25" />
            <path className="flow-line" d="M 0 40 H 25" />
            <path className="flow-line" d="M 0 52.5 H 25" />

            <path className="flow-line" d="M 0 65 H 100" />

            {/* Turbulent wake with wavy, crossing lines */}
            <g className="flow-line" strokeWidth="2.5">
              <path d="M 55 40 C 65 30, 75 50, 85 40 S 95 30, 100 35" />
              <path d="M 55 28 C 65 20, 75 45, 85 30 S 95 45, 100 40" />
              <path d="M 55 52 C 65 60, 75 35, 85 50 S 95 35, 100 45" />
            </g>
          </svg>
        </div>

        {/* Analogy Box */}
        <div className="mt-4 p-2 bg-red-100 text-red-800 rounded-md text-sm">
          <Emphasize>Think:</Emphasize> A fast-moving baseball.
        </div>
      </div>
    </div>
  );
};
