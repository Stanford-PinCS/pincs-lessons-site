"use client";
import React from "react";

interface KeyTermProps {
  children: React.ReactNode;
}

const KeyTerm: React.FC<KeyTermProps> = ({ children }) => {
  return <span className="font-bold text-yellow-600">{children}</span>;
};

export default KeyTerm;
