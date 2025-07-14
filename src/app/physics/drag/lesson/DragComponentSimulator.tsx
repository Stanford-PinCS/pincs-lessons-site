"use client";
import { useState } from "react";

/**
 * A fully interactive simulation demonstrating the relationship between an object's
 * shape, the type of fluid flow, and the two main components of drag:
 * Friction (Shear) Drag and Form (Pressure) Drag.
 */
export const DragComponentSimulator: React.FC = () => {
  // State to hold the "bluffness" of the object, from 0 (streamlined) to 100 (bluff).
  const [bluffness, setBluffness] = useState(50);

  // --- Simplified Drag Model ---
  // This is an educational model, not a physically perfect one.
  // Form drag increases exponentially with bluffness.
  const formDrag = Math.pow(bluffness / 100, 2) * 100 + 1;
  // Friction drag is always present but is more significant for streamlined shapes.
  const frictionDrag = (1 - bluffness / 100) * 30 + 5;

  const totalDrag = formDrag + frictionDrag;
  const formPercentage = (formDrag / totalDrag) * 100;
  const frictionPercentage = (frictionDrag / totalDrag) * 100;

  // --- SVG Shape Calculation ---
  // The object's height and width changes based on the bluffness slider.
  const rectHeight = 4 + (bluffness / 100) * 50;
  const rectWidth = 20 - (bluffness / 100) * 10;
  const rectY = 30 - rectHeight / 2;

  return (
    <div className="w-full p-4 md:p-6 my-6 bg-slate-100 rounded-lg border border-slate-300">
      {/* --- Main Grid: Visuals on left, Controls/Data on right --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
        {/* Left Side: SVG Visualization */}
        <div className="border border-slate-300 rounded-md bg-white p-2">
          <svg
            viewBox="0 0 100 60"
            aria-label="Flow around an object changing shape"
          >
            {/* --- ADDED: Airflow Direction Arrow --- */}
            <g className="text-slate-500">
              <line
                x1="35"
                y1="5"
                x2="55"
                y2="5"
                stroke="currentColor"
                strokeWidth="1"
              />
              <path
                d="M 52 2 L 55 5 L 52 8"
                stroke="currentColor"
                strokeWidth="1"
                fill="none"
              />
              <text
                x="60"
                y="7"
                fill="currentColor"
                className="text-[5px] font-sans"
              >
                Airflow
              </text>
            </g>
            {/* --- END ADDED SECTION --- */}

            {/* Inflow lines (always visible) */}
            <g stroke="#64748b" strokeWidth="1">
              <line x1="0" y1="10" x2="30" y2="10" />
              <line x1="0" y1="20" x2="30" y2="20" />
              <line x1="0" y1="30" x2="20" y2="30" />
              <line x1="0" y1="40" x2="30" y2="40" />
              <line x1="0" y1="50" x2="30" y2="50" />
            </g>

            {/* Laminar Flow Lines (fade out as bluffness increases) */}
            <g
              stroke="#64748b"
              strokeWidth="1"
              style={{ opacity: 1 - bluffness / 100 }}
            >
              <path d={`M 30 ${10} H 100`} fill="none" />
              <path d={`M 30 ${20} Q 35 20, 100 20`} fill="none" />
              <path d={`M 30 ${30} H 100`} fill="none" />
              <path d={`M 30 ${40} Q 35 40, 100 40`} fill="none" />
              <path d={`M 30 ${50} H 100`} fill="none" />
            </g>

            {/* Turbulent Wake (fades in as bluffness increases) */}
            <g
              stroke="#64748b"
              strokeWidth="0.8"
              fill="none"
              style={{ opacity: bluffness / 100 }}
            >
              <path d="M 35 30 C 45 20, 55 40, 65 30 S 75 20, 85 40 S 95 25, 100 35" />
              <path d="M 40 20 C 50 10, 60 30, 70 20 S 80 10, 90 30 S 100 15, 100 25" />
              <path d="M 40 40 C 50 50, 60 30, 70 40 S 80 50, 90 30 S 100 45, 100 35" />
            </g>

            {/* The object itself, which changes height */}
            <rect
              x="20"
              y={rectY}
              width={rectWidth}
              height={rectHeight}
              rx="2"
              ry="2"
              fill="#CD8900"
            />
          </svg>
        </div>

        {/* Right Side: Controls and Data Readout */}
        <div className="flex flex-col gap-4">
          {/* Slider Control */}
          <div>
            <label
              htmlFor="bluffness-slider"
              className="block text-sm font-medium text-slate-700"
            >
              Object Shape
            </label>
            <div className="flex items-center gap-2 text-xs text-slate-500">
              <span>Streamlined</span>
              <input
                id="bluffness-slider"
                type="range"
                min="0"
                max="100"
                value={bluffness}
                onChange={(e) => setBluffness(Number(e.target.value))}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer"
              />
              <span>Bluff</span>
            </div>
          </div>

          {/* Data Readout and Bar Chart */}
          <div>
            <h3 className="font-bold text-lg text-slate-800">
              Drag Components
            </h3>
            <div className="w-full flex h-8 mt-2 rounded-md overflow-hidden border border-slate-400">
              {/* Friction Drag Bar */}
              <div
                className="flex items-center justify-center bg-blue-500 text-white font-bold text-sm transition-all duration-150"
                style={{ width: `${frictionPercentage}%` }}
                title={`Friction Drag: ${frictionPercentage.toFixed(0)}%`}
              >
                {frictionPercentage > 15 && `${frictionPercentage.toFixed(0)}%`}
              </div>
              {/* Form Drag Bar */}
              <div
                className="flex items-center justify-center bg-red-500 text-white font-bold text-sm transition-all duration-150"
                style={{ width: `${formPercentage}%` }}
                title={`Form Drag: ${formPercentage.toFixed(0)}%`}
              >
                {formPercentage > 15 && `${formPercentage.toFixed(0)}%`}
              </div>
            </div>
            {/* Legend */}
            <div className="flex justify-between mt-2 text-sm">
              <div className="flex items-center">
                <span className="w-3 h-3 rounded-full bg-blue-500 mr-2"></span>
                <span>Friction Drag</span>
              </div>
              <div className="flex items-center">
                <span className="w-3 h-3 rounded-full bg-red-500 mr-2"></span>
                <span>Form Drag</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
