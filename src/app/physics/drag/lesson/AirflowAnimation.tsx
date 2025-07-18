"use client";
import React from "react";

export function AirflowAnimation() {
  // Define the smooth paths for the wind particles to follow.
  const windPaths = [
    // Paths flowing over the top
    {
      id: "p-top-1",
      d: "M -10,60 C 80,60 100,20 150,20 C 200,20 220,60 310,60",
    },
    {
      id: "p-top-2",
      d: "M -10,80 C 80,80 110,50 150,50 C 190,50 220,80 310,80",
    },
    // Paths flowing under the bottom
    {
      id: "p-bottom-1",
      d: "M -10,140 C 80,140 100,180 150,180 C 200,180 220,140 310,140",
    },
    {
      id: "p-bottom-2",
      d: "M -10,120 C 80,120 110,150 150,150 C 190,150 220,120 310,120",
    },
  ];

  // Increased particle count for a denser, more fluid visual.
  const particlesPerPath = 30;

  return (
    <div
      className="
        font-sans max-w-lg mx-auto my-8 p-6 bg-white 
        rounded-lg border border-slate-200 shadow-lg
      "
    >
      <h3 className="text-center text-xl font-medium text-slate-700 mb-4">
        Airflow Around a Sphere
      </h3>
      <svg
        className="w-full h-auto block"
        viewBox="0 0 300 200"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* SVG definitions are not styled by Tailwind, they use attributes */}
        <defs>
          {windPaths.map((path) => (
            <path
              key={path.id}
              id={path.id}
              d={path.d}
              fill="none"
              stroke="rgba(150, 150, 150, 0.3)" // Fainter stroke for denser particles
            />
          ))}
          <radialGradient id="grad-ball-light">
            <stop offset="0%" stopColor="#f0f0f0" />
            <stop offset="100%" stopColor="#a0a0a0" />
          </radialGradient>
        </defs>

        {/* The Ball/Sphere */}
        <circle
          cx="150"
          cy="100"
          r="40"
          fill="url(#grad-ball-light)"
          stroke="#b0b0b0"
          strokeWidth="1"
        />

        {/* Animated Wind Particles */}
        {windPaths.map(({ id }) =>
          Array.from({ length: particlesPerPath }).map((_, i) => (
            <circle key={`${id}-particle-${i}`} r="1.5" fill="#3b82f6">
              <animateMotion
                dur={`7s`}
                begin={`-${i * (7 / particlesPerPath)}s`}
                repeatCount="indefinite"
              >
                <mpath href={`#${id}`} />
              </animateMotion>
            </circle>
          ))
        )}
      </svg>
    </div>
  );
}
