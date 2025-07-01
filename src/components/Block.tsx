"use client";
import React from "react";

interface BlockProps {
  children: React.ReactNode;
  color: string;
  title: string;
}

const Block: React.FC<BlockProps> = ({ children, color, title }) => {
  return (
    <section className={`border-l-4 border-${color}-500 pl-6 space-y-6 text-lg`}>
        <h1 className={`text-3xl font-bold text-${color}-500 mb-4`}>{title}</h1>
        <div className="text-gray-700 space-y-4">
          {children}
        </div>
    </section>
  );
};

export default Block;