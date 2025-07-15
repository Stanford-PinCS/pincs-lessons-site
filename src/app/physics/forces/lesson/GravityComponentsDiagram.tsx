import React from "react";

const GravityComponentsDiagram = () => {
  return (
    <svg
      viewBox="0 50 400 170"
      xmlns="http://www.w3.org/2000/svg"
      className="mx-auto my-4 bg-gray-100 rounded-lg shadow-inner"
    >
      <defs>
        <marker
          id="arrowhead-blue"
          markerWidth="4"
          markerHeight="3"
          refX="4"
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
          refX="4"
          refY="1.5"
          orient="auto"
          fill="red"
        >
          <polygon points="0 0, 4 1.5, 0 3" />
        </marker>
        <marker
          id="arrowhead-green"
          markerWidth="4"
          markerHeight="3"
          refX="4"
          refY="1.5"
          orient="auto"
          fill="green"
        >
          <polygon points="0 0, 4 1.5, 0 3" />
        </marker>
      </defs>

      {/* Slope */}
      <path d="M 20 200 L 380 100" stroke="black" strokeWidth="4" fill="none" />
      <path d="M 20 200 L 380 200 L 380 100 Z" fill="#e0e0e0" />

      {/* Object on slope */}
      <g transform="translate(200, 142) rotate(-15.5)">
        <rect
          x="-11"
          y="-30"
          width="30"
          height="30"
          fill="hsl(210, 80%, 60%)"
          stroke="black"
          strokeWidth="2"
        />
      </g>

      {/* Center point for vectors */}
      <circle cx="200" cy="127" r="3" fill="black" />

      {/* Gravity Vector */}
      <line
        x1="200"
        y1="127"
        x2="200"
        y2="200"
        stroke="blue"
        strokeWidth="3"
        markerEnd="url(#arrowhead-blue)"
      />
      <text x="130" y="180" fill="blue" fontSize="16" fontWeight="bold">
        Gravity
      </text>

      {/* Perpendicular Component */}
      <line
        x1="200"
        y1="127"
        x2="219"
        y2="195"
        stroke="red"
        strokeWidth="3"
        markerEnd="url(#arrowhead-red)"
      />
      <text x="225" y="190" fill="red" fontSize="16" fontWeight="bold">
        Component into slope
      </text>

      {/* Parallel Component */}
      <line
        x1="200"
        y1="127"
        x2="181"
        y2="132"
        stroke="green"
        strokeWidth="3"
        markerEnd="url(#arrowhead-green)"
      />
      <text x="20" y="108" fill="green" fontSize="16" fontWeight="bold">
        Component down slope
      </text>

      {/* Dashed lines to show components */}
      <line
        x1="219"
        y1="195"
        x2="200"
        y2="200"
        stroke="black"
        strokeWidth="1.5"
        strokeDasharray="5"
      />
      <line
        x1="181"
        y1="132"
        x2="200"
        y2="200"
        stroke="black"
        strokeWidth="1.5"
        strokeDasharray="5"
      />
    </svg>
  );
};

export default GravityComponentsDiagram;
