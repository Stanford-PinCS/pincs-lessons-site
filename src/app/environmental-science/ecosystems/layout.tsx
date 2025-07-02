"use client";

import { ReactNode } from "react";

interface GrassBlade {
  left: string;
  transform: string;
  height: string;
  width: string;
  borderRadius: string;
}

// Pre-defined grass blade positions and rotations for consistency
const grassBlades: GrassBlade[] = Array.from({ length: 50 }).map((_, i) => ({
  left: `${i * 2}%`,
  transform: `rotate(${((i * 7) % 30) - 15}deg)`,
  height: `${20 + ((i * 3) % 15)}px`,
  width: `${2 + ((i * 2) % 3)}px`,
  borderRadius: `${50 + ((i * 3) % 20)}% ${50 + ((i * 3) % 20)}% 0 0`,
}));

export default function EcosystemsLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#c7edc5] text-[#262e26] relative">
      {/* Main content */}
      <div className="relative z-10">{children}</div>

      {/* Grass decoration at bottom */}
      <div className="fixed bottom-0 left-0 right-0 h-20 bg-[#7dbb7a] overflow-hidden">
        {/* Base grass layer */}
        <div className="absolute bottom-0 left-0 right-0 h-10 bg-[#7dbb7a]">
          {/* Grass blades */}
          {grassBlades.map((blade, i) => (
            <div
              key={i}
              className="absolute bottom-0 bg-[#7dbb7a]"
              style={{
                left: blade.left,
                transform: blade.transform,
                height: blade.height,
                width: blade.width,
                borderRadius: blade.borderRadius,
                transformOrigin: "bottom center",
              }}
            />
          ))}
        </div>

        {/* Additional grass layer for depth */}
        <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-[#6da86a] to-transparent" />

        {/* Top grass layer for more natural look */}
        <div className="absolute bottom-0 left-0 right-0 h-14">
          {grassBlades.map((blade, i) => (
            <div
              key={`top-${i}`}
              className="absolute bottom-0 bg-[#8dcc8a]"
              style={{
                left: blade.left,
                transform: `rotate(${((i * 7) % 30) - 15}deg)`,
                height: `${parseInt(blade.height) * 0.8}px`,
                width: `${parseInt(blade.width) * 0.8}px`,
                borderRadius: blade.borderRadius,
                transformOrigin: "bottom center",
                opacity: 0.7,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
