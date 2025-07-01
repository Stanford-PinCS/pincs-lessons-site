"use client";
import React from "react";

interface ColorBoxProps {
  children: React.ReactNode;
  color: string;
}

const ColorBox: React.FC<ColorBoxProps> = ({ children, color }) => {
  return (
    <div className={`bg-${color}-50 border border-${color}-200 rounded-lg p-4 mt-4 text-lg`}>
      {children}
    </div>
  );
};

export default ColorBox;