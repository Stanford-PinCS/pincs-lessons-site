"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ReactKatex from "@pkasila/react-katex";
import "katex/dist/katex.min.css";

const bulletPoints = [
  `$F_{gravity} = mg$, where $m$ is our mass ($10kg$) and $g$ is our gravitational constant ($10\\frac{m}{s^2}$)`,
  `$F_{normal} = N$, where N is a variable`,
  `$F_{friction} = \\mu_s N$, where $\\mu_s$ is our coefficient of friction and $N$ is our normal force`,
  `$F_{push} = ???$ Newtons, what we're trying to solve for`,
  `$a_y = 0 \\frac{m}{s^2}$, since our box shouldn't accelerate up or down`,
  `$a_x > 0 \\frac{m}{s^2}$, since we want our box to start moving right`,
  `$F = ma$, which we can split up into vertical and horizontal equations`,
];

export default function ForcesBulletsWalkThrough() {
  const [visibleCount, setVisibleCount] = useState(0);

  return (
    <div className="flex flex-col space-y-4">
      <p className="mb-2">We have:</p>
      <ul className="list-disc list-inside space-y-1">
        <AnimatePresence>
          {bulletPoints.slice(0, visibleCount).map((text, i) => (
            <motion.li
              key={i}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <ReactKatex>{text}</ReactKatex>
            </motion.li>
          ))}
        </AnimatePresence>
      </ul>
      {visibleCount < bulletPoints.length && (
        <button
          onClick={() => setVisibleCount((c) => c + 1)}
          className="self-start px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-white rounded"
        >
          Reveal next step
        </button>
      )}
    </div>
  );
}
