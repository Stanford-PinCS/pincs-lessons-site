"use client";
import { useState, useEffect, useRef, useMemo } from "react";

// --- Mathematical & Simulation Constants ---
const trueFunction = (x: number): number =>
  175 - 50 * Math.cos(x / 50) - 0.3 * x;
const derivativeFunction = (x: number): number => Math.sin(x / 50) - 0.3;

const START_X = 50;
const END_X = 450;
const TOTAL_DISTANCE = END_X - START_X;

interface Point {
  x: number;
  y: number;
}
interface Step {
  approx: Point;
  truePt: Point;
  error: number;
}

/**
 * An interactive animator for the Forward Euler method. The user inputs the desired
 * number of steps, and the component calculates and animates the resulting path,
 * visually demonstrating the trade-off between step count and accuracy.
 */
export const EulerAnimator: React.FC = () => {
  const [numStepsInput, setNumStepsInput] = useState<string>("10");
  const [isAnimating, setIsAnimating] = useState<boolean>(false);
  const [animatedSteps, setAnimatedSteps] = useState<Step[]>([]);
  const [fullCalculatedPath, setFullCalculatedPath] = useState<Step[]>([]);

  const animationTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Cleanup effect to ensure timer is cleared if component unmounts
  useEffect(() => {
    return () => {
      if (animationTimerRef.current) clearTimeout(animationTimerRef.current);
    };
  }, []);

  // --- Core Logic ---
  const handleAnimate = () => {
    // 1. Stop any current animation
    if (animationTimerRef.current) {
      clearTimeout(animationTimerRef.current);
    }

    // 2. Validate and parse user input
    let steps = parseInt(numStepsInput, 10);
    if (isNaN(steps) || steps < 2) steps = 2;
    if (steps > 200) steps = 200;
    setNumStepsInput(String(steps));

    const deltaTime = TOTAL_DISTANCE / steps;

    // 3. Pre-calculate the entire path
    const path: Step[] = [];
    let currentPoint: Point = { x: START_X, y: trueFunction(START_X) };
    let currentSlope = derivativeFunction(START_X);

    path.push({
      approx: currentPoint,
      truePt: { x: START_X, y: trueFunction(START_X) },
      error: 0,
    });

    for (let i = 0; i < steps; i++) {
      const newX = currentPoint.x + deltaTime;
      const newY = currentPoint.y + currentSlope * deltaTime;
      currentPoint = { x: newX, y: newY };
      currentSlope = derivativeFunction(newX);
      path.push({
        approx: currentPoint,
        truePt: { x: newX, y: trueFunction(newX) },
        error: Math.abs(newY - trueFunction(newX)),
      });
    }
    setFullCalculatedPath(path);

    // 4. Set initial state and begin animation
    setIsAnimating(true);
    setAnimatedSteps([path[0]]);

    // Calculate time to delay such that it takes 2 seconds, plus a little for longer ones
    const DELAY = 2000 / steps + steps / 20;

    let stepIndex = 0;
    const animateStep = () => {
      if (stepIndex >= path.length) {
        setIsAnimating(false);
        return;
      }
      setAnimatedSteps((prev) => [...prev, path[stepIndex]]);
      stepIndex++;

      // Recurse with a delay.
      animationTimerRef.current = setTimeout(animateStep, DELAY);
    };

    animationTimerRef.current = setTimeout(animateStep, DELAY);
  };

  const totalError = useMemo(() => {
    if (isAnimating || animatedSteps.length < 2) return 0;
    return animatedSteps.reduce(
      (sum, step) => (step ? sum + step.error / animatedSteps.length : sum),
      0
    );
  }, [animatedSteps, isAnimating]);

  const truePathData = useMemo(
    () =>
      Array.from({ length: 400 })
        .map((_, i) => {
          const x = i + START_X;
          const y = trueFunction(x);
          return `${i === 0 ? "M" : "L"} ${x} ${y}`;
        })
        .join(" "),
    []
  );

  return (
    <div className="w-full p-4 my-6 bg-slate-100 rounded-lg border border-slate-300">
      <div className="flex flex-col md:flex-row justify-between md:items-center gap-4 mb-4">
        <div>
          <h3 className="text-xl font-bold text-slate-800">
            Euler Path Approximator
          </h3>
          <p className="text-sm text-slate-600 max-w-lg">
            Enter a number of steps and press 'Calculate' to see how your choice
            affects the accuracy of the final path.
          </p>
        </div>
        <div className="flex-shrink-0 flex items-center gap-2">
          <label
            htmlFor="steps-input"
            className="text-sm font-medium text-slate-700"
          >
            Steps:
          </label>
          <input
            id="steps-input"
            type="number"
            value={numStepsInput}
            onChange={(e) => setNumStepsInput(e.target.value)}
            disabled={isAnimating}
            className="w-24 p-2 border border-slate-300 rounded-md disabled:bg-slate-200"
            min="2"
            max="200"
          />
          <button
            onClick={handleAnimate}
            disabled={isAnimating}
            className="px-4 py-2 rounded-md font-semibold text-white bg-blue-600 hover:bg-blue-700 disabled:bg-slate-400 disabled:cursor-not-allowed"
          >
            {isAnimating ? "Calculating..." : "Calculate"}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* SVG Visualization */}
        <div className="md:col-span-3 bg-white rounded-md border border-slate-300">
          <svg viewBox="0 0 500 200" className="w-full">
            <path
              d={truePathData}
              stroke="#3b82f6"
              strokeWidth="2.5"
              fill="none"
            />

            {/* Dashed path during animation */}
            {isAnimating && (
              <path
                d={fullCalculatedPath
                  .map(
                    (p, i) =>
                      `${i === 0 ? "M" : "L"} ${p.approx.x} ${p.approx.y}`
                  )
                  .join(" ")}
                stroke="#ef4444"
                strokeWidth="2"
                strokeDasharray="2 4"
                fill="none"
                opacity="0.3"
              />
            )}

            <path
              d={animatedSteps
                ?.map((p, i) =>
                  p == undefined
                    ? ""
                    : `${i === 0 ? "M" : "L"} ${p.approx.x} ${p.approx.y}`
                )
                .join(" ")}
              stroke="#ef4444"
              strokeWidth="2"
              fill="none"
            />

            {animatedSteps.map((step, i) =>
              step ? (
                <circle
                  key={i}
                  cx={step.approx.x}
                  cy={step.approx.y}
                  r={i === 0 ? 3 : 2}
                  fill={i === 0 ? "black" : "#ef4444"}
                />
              ) : (
                ""
              )
            )}
          </svg>
        </div>

        {/* Info Panel */}
        <div className="flex flex-col gap-3 p-3 bg-white rounded-md border border-slate-200 text-center">
          <h4 className="font-bold text-slate-700">Results</h4>
          <div>
            <div className="text-xs text-slate-500">Timestep Size (Δt)</div>
            <div className="font-mono text-xl font-bold text-blue-700">
              {fullCalculatedPath.length > 1
                ? (TOTAL_DISTANCE / (fullCalculatedPath.length - 1)).toFixed(2)
                : "-"}
            </div>
          </div>
          <div>
            <div className="text-xs text-slate-500">
              Total Accumulated Error
            </div>
            <div
              className={`font-mono text-xl font-bold text-orange-600 transition-opacity duration-300 ${
                isAnimating ? "opacity-50" : "opacity-100"
              }`}
            >
              {totalError.toFixed(1)}
            </div>
          </div>
          <div className="flex-grow"></div>
          <p className="text-xs text-slate-500">
            {isAnimating
              ? "Watch the path unfold!"
              : "Try a different number of steps."}
          </p>
        </div>
      </div>
    </div>
  );
};
