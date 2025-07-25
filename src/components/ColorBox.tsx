"use client";
import React from "react";

interface ColorBoxProps {
  children: React.ReactNode;
  color: "green" | "blue" | "yellow" | "purple" | "gray";
  mode?: "default" | "center";
}

const ColorBox: React.FC<ColorBoxProps> = ({
  children,
  color,
  mode = "default",
}) => {
  // Adding classes as hard-coded strings for Tailwind's just-in-time compiler.
  const colorClasses = {
    green: "bg-green-50 border-green-200",
    blue: "bg-blue-50 border-blue-200",
    yellow: "bg-yellow-50 border-yellow-200",
    purple: "bg-purple-50 border-purple-200",
    gray: "bg-gray-50 border-gray-200",
  };

  const flex = mode == "center" ? "flex flex-row justify-center" : "";

  return (
    <div
      className={`border rounded-lg p-4 mt-4 text-lg ${colorClasses[color]} ${flex}`}
    >
      {children}
    </div>
  );
};

export default ColorBox;
