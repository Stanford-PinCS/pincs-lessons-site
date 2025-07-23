import React from "react";

const FootballComponentsDiagram = () => {
  return (
    <svg
      viewBox="0 50 400 180"
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

      {/* Ground */}
      <line x1="50" y1="200" x2="350" y2="200" stroke="black" strokeWidth="2" />
      <text x="190" y="220" fontSize="14" textAnchor="middle">
        Ground
      </text>

      {/* Soccer Ball */}
      <text x="100" y="190" fontSize="40" textAnchor="middle" fill="black">
        ⚽
      </text>

      {/* Kick Force Vector */}
      <line
        x1="100"
        y1="180"
        x2="240"
        y2="80"
        stroke="blue"
        strokeWidth="3"
        markerEnd="url(#arrowhead-blue)"
      />
      <text
        x="190"
        y="70"
        fill="blue"
        fontSize="16"
        fontWeight="bold"
        textAnchor="middle"
      >
        Kick Force (F)
      </text>

      {/* Angle Theta */}
      <path
        d="M 140 180 A 40 40 0 0 0 132.56 156.76"
        fill="none"
        stroke="black"
        strokeWidth="2"
      />
      <text x="140" y="168" fontSize="14" fill="black">
        θ
      </text>

      {/* Horizontal Component (Fx) */}
      <line
        x1="100"
        y1="180"
        x2="240"
        y2="180"
        stroke="green"
        strokeWidth="3"
        markerEnd="url(#arrowhead-green)"
      />
      <text
        x="190"
        y="195"
        fill="green"
        fontSize="16"
        fontWeight="bold"
        textAnchor="middle"
      >
        Fₓ
      </text>

      {/* Vertical Component (Fy) */}
      <line
        x1="240"
        y1="180"
        x2="240"
        y2="80"
        stroke="red"
        strokeWidth="3"
        markerEnd="url(#arrowhead-red)"
      />
      <text
        x="245"
        y="130"
        fill="red"
        fontSize="16"
        fontWeight="bold"
        textAnchor="start"
      >
        Fᵧ
      </text>
    </svg>
  );
};

export default FootballComponentsDiagram;
