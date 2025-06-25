"use client";

import React from "react";

interface SlideProps {
  children: React.ReactNode;
}

const Slide: React.FC<SlideProps> = ({ children }) => {
  return (
    <div className="w-full h-full flex items-center justify-center p-8">
      <div className="w-full max-w-4xl">{children}</div>
    </div>
  );
};

export default Slide;
