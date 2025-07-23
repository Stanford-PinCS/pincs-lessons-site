import React from "react";

const PersonFreeBodyDiagram = () => {
  return (
    <svg
      viewBox="0 0 800 200"
      xmlns="http://www.w3.org/2000/svg"
      className="mx-auto my-4 bg-gray-100 rounded-lg shadow-inner"
    >
      <defs>
        <marker
          id="arrowhead-blue"
          markerWidth="4"
          markerHeight="3"
          refX="0"
          refY="1.5"
          orient="auto"
          fill="blue"
        >
          <polygon points="0 0, 4 1.5, 0 3" />
        </marker>
        <marker
          id="arrowhead-red"
          markerWidth="4"
          markerHeight="3"
          refX="0"
          refY="1.5"
          orient="auto"
          fill="red"
        >
          <polygon points="0 0, 4 1.5, 0 3" />
        </marker>
        <marker
          id="arrowhead-black"
          markerWidth="4"
          markerHeight="3"
          refX="0"
          refY="1.5"
          orient="auto"
          fill="black"
        >
          <polygon points="0 0, 4 1.5, 0 3" />
        </marker>
      </defs>

      {/* Gravity Vector */}
      <line
        x1="400"
        y1="100"
        x2="400"
        y2="170"
        stroke="blue"
        strokeWidth="3"
        markerEnd="url(#arrowhead-blue)"
      />
      <text x="410" y="140" fill="blue" fontSize="16" fontWeight="bold">
        Gravity
      </text>

      {/* Normal Force Vector */}
      <line
        x1="400"
        y1="100"
        x2="400"
        y2="30"
        stroke="red"
        strokeWidth="3"
        markerEnd="url(#arrowhead-red)"
      />
      <text x="410" y="60" fill="red" fontSize="16" fontWeight="bold">
        Normal Force
      </text>

      {/* Center point */}
      <circle cx="400" cy="100" r="5" fill="black" />

      {/* Up direction indicator */}
      <line
        x1="600"
        y1="100"
        x2="600"
        y2="50"
        stroke="black"
        strokeWidth="2"
        markerEnd="url(#arrowhead-black)"
      />
      <text x="590" y="30" fill="black" fontSize="14">
        Up
      </text>
    </svg>
  );
};

export default PersonFreeBodyDiagram;
