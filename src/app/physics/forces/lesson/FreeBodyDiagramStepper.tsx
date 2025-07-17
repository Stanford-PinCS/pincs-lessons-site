"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const forceSteps = [
  {
    label: "Draw dot and move on",
    description: "First, let's draw a dot to represent our box.",
  },
  {
    label: "Draw gravitational force and move on",
    description:
      "Now, what forces can we draw? Oh... how about we put gravity?",
  },
  {
    label: "Draw normal force and move on",
    description:
      "What force would stop the box from falling through the floor?",
  },
  {
    label: "Draw applied force and move on",
    description: "What if we push the box to the right?",
  },
  {
    label: "Draw frictional force and move on",
    description: "Friction tries to stop sliding—let’s add it to the left.",
  },
];

const centerX = 150;
const centerY = 125;

export default function FreeBodyDiagramStepper() {
  const [step, setStep] = useState(0);

  const drawElement = (index: number) => {
    const common = {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      transition: { duration: 0.5 },
    };

    switch (index) {
      case 0:
        return (
          <motion.circle
            cx={centerX}
            cy={centerY}
            r="6"
            fill="black"
            {...common}
          />
        );

      case 1:
        return (
          <>
            <motion.line
              x1={centerX}
              y1={centerY}
              x2={centerX}
              y2={centerY + 50}
              stroke="blue"
              strokeWidth="3"
              markerEnd="url(#arrow-blue)"
              {...common}
            />
            <motion.text
              x={centerX + 12}
              y={centerY + 55}
              fill="blue"
              fontSize="14"
              {...common}
            >
              Gravity
            </motion.text>
          </>
        );

      case 2:
        return (
          <>
            <motion.line
              x1={centerX}
              y1={centerY}
              x2={centerX}
              y2={centerY - 50}
              stroke="green"
              strokeWidth="3"
              markerEnd="url(#arrow-green)"
              {...common}
            />
            <motion.text
              x={centerX + 12}
              y={centerY - 45}
              fill="green"
              fontSize="14"
              {...common}
            >
              Normal
            </motion.text>
          </>
        );

      case 3:
        return (
          <>
            <motion.line
              x1={centerX}
              y1={centerY}
              x2={centerX + 50}
              y2={centerY}
              stroke="orange"
              strokeWidth="3"
              markerEnd="url(#arrow-orange)"
              {...common}
            />
            <motion.text
              x={centerX + 45}
              y={centerY - 10}
              fill="orange"
              fontSize="14"
              {...common}
            >
              Push
            </motion.text>
          </>
        );

      case 4:
        return (
          <>
            <motion.line
              x1={centerX}
              y1={centerY}
              x2={centerX - 50}
              y2={centerY}
              stroke="red"
              strokeWidth="3"
              markerEnd="url(#arrow-red)"
              {...common}
            />
            <motion.text
              x={centerX - 90}
              y={centerY - 10}
              fill="red"
              fontSize="14"
              {...common}
            >
              Friction
            </motion.text>
          </>
        );

      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col items-start space-y-4">
      {step < forceSteps.length ? (
        <>
          <p className="text-lg">{forceSteps[step].description}</p>
          <button
            onClick={() => setStep((s) => s + 1)}
            className="px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-white rounded"
          >
            {forceSteps[step].label}
          </button>
        </>
      ) : (
        <p className="text-lg font-semibold text-green-700">
          Great! Now we have a free body diagram, so let's move into the math.
        </p>
      )}

      <svg width="300" height="250" className="mt-4 border rounded bg-white">
        <defs>
          <marker
            id="arrow-blue"
            markerWidth="10"
            markerHeight="10"
            refX="5"
            refY="3"
            orient="auto"
            markerUnits="strokeWidth"
          >
            <path d="M0,0 L0,6 L9,3 z" fill="blue" />
          </marker>
          <marker
            id="arrow-green"
            markerWidth="10"
            markerHeight="10"
            refX="5"
            refY="3"
            orient="auto"
            markerUnits="strokeWidth"
          >
            <path d="M0,0 L0,6 L9,3 z" fill="green" />
          </marker>
          <marker
            id="arrow-orange"
            markerWidth="10"
            markerHeight="10"
            refX="5"
            refY="3"
            orient="auto"
            markerUnits="strokeWidth"
          >
            <path d="M0,0 L0,6 L9,3 z" fill="orange" />
          </marker>
          <marker
            id="arrow-red"
            markerWidth="10"
            markerHeight="10"
            refX="5"
            refY="3"
            orient="auto"
            markerUnits="strokeWidth"
          >
            <path d="M0,0 L0,6 L9,3 z" fill="red" />
          </marker>
        </defs>
        <AnimatePresence>
          {[...Array(step).keys()].map((i) => (
            <g key={i}>{drawElement(i)}</g>
          ))}
        </AnimatePresence>
      </svg>
    </div>
  );
}
