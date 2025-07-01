"use client";
import React from "react";

interface EmphasizeProps {
  children: React.ReactNode;
}

const Emphasize: React.FC<EmphasizeProps> = ({ children }) => {
  return (
    <span className="font-semibold">
        {children}
    </span>
  );
};

export default Emphasize;