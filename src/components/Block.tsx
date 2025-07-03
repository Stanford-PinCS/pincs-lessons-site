"use client";
import React from "react";

interface BlockProps {
  children: React.ReactNode;
  color: "green" | "blue" | "yellow" | "purple";
  title: string;
}

const Block: React.FC<BlockProps> = ({ children, color, title }) => {
  // Adding classes as hard-coded strings for Tailwind's just-in-time compiler.
  const borderClasses = {
    green: "border-green-500",
    blue: "border-blue-500",
    yellow: "border-yellow-500",
    purple: "border-purple-500",
  };
  const textClasses = {
    green: "text-green-500",
    blue: "text-blue-500",
    yellow: "text-yellow-500",
    purple: "text-purple-500",
  };

  return (
    <section
      className={`border-l-4 pl-6 space-y-6 text-lg ${borderClasses[color]}`}
    >
      <h1 className={`text-3xl font-bold mb-4 ${textClasses[color]}`}>
        {title}
      </h1>
      <div className="text-gray-700 space-y-4">{children}</div>
    </section>
  );
};

export default Block;
