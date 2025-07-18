import React from "react";

const Code = ({ children }: { children: React.ReactNode }) => {
  return (
    <code
      style={{
        backgroundColor: "black",
        color: "white",
        padding: "2px 6px",
        borderRadius: "4px",
        fontSize: "14px",
      }}
    >
      {children}
    </code>
  );
};

export default Code;
