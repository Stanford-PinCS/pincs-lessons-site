"use client";
import Block from "@/components/Block";
import ColorBox from "@/components/ColorBox";
import Emphasize from "@/components/Emphasize";
import KeyTerm from "@/components/KeyTerm";
import Lesson from "@/components/Lesson";
import QuizQuestion from "@/components/QuizQuestion";
import {
  useState,
  useEffect,
  useRef,
  useCallback,
  Suspense,
  MouseEvent,
  useMemo,
} from "react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  ReferenceLine,
  Label,
  Customized,
  Tooltip,
  Legend,
} from "recharts";
import type { CartesianViewBox } from "recharts/types/util/types";

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
            Euler Path Animator
          </h3>
          <p className="text-sm text-slate-600 max-w-lg">
            Enter a number of steps and press 'Animate' to see how your choice
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
            {isAnimating ? "Animating..." : "Animate"}
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

/**
 * A React component that accurately visualizes the difference between low Reynolds number
 * (laminar flow) and high Reynolds number (turbulent flow), matching the provided
 * reference image in all details.
 */
export const ReynoldsDiagram: React.FC = () => {
  return (
    // Main container with light background and grid layout
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6 p-4 bg-gray-100/75 rounded-lg">
      {/* Column 1: Low Reynolds Number - Laminar Flow */}
      <div className="bg-white border border-gray-200 rounded-lg p-4 text-center flex flex-col">
        <h3 className="text-lg font-bold text-gray-800">
          Low Reynolds Number (Re {"<<"} 1)
        </h3>
        <p className="text-sm text-gray-500 mb-4">
          Smooth, orderly (laminar) flow
        </p>

        {/* SVG Diagram for Laminar Flow */}
        <div className="flex-grow flex items-center justify-center">
          <svg viewBox="0 0 100 80" aria-label="Laminar flow around a sphere">
            {/* Common styles for flow lines */}
            <defs>
              <style>{`
                .flow-line {
                  fill: none;
                  stroke: #9ca3af; /* gray-400 */
                  stroke-width: 3.5;
                  stroke-linecap: round;
                }
              `}</style>
            </defs>

            {/* The blue sphere */}
            <circle cx="40" cy="40" r="15" fill="#3b82f6" />

            {/* --- Flow Lines (Corrected) --- */}
            {/* Top and Bottom lines are continuous */}
            <path className="flow-line" d="M 0 15 H 100" />

            {/* Inner lines wrap correctly around the sphere */}
            <path
              className="flow-line"
              d="M 0 27.5 H 26 C 30 27.5, 30 25, 40 25 C 50 25, 50 27.5, 54 27.5 H 100"
            />

            {/* Middle line is interrupted by the sphere */}
            <path className="flow-line" d="M 0 40 H 25" />
            <path className="flow-line" d="M 55 40 H 100" />

            <path
              className="flow-line"
              d="M 0 52.5 H 26 C 30 52.5, 30 55, 40 55 C 50 55, 50 52.5, 54 52.5 H 100"
            />

            <path className="flow-line" d="M 0 65 H 100" />
          </svg>
        </div>

        {/* Analogy Box */}
        <div className="mt-4 p-2 bg-blue-100 text-blue-800 rounded-md text-sm">
          <Emphasize>Think:</Emphasize> A tiny bead falling in thick honey.
        </div>
      </div>

      {/* Column 2: High Reynolds Number - Turbulent Flow */}
      <div className="bg-white border border-gray-200 rounded-lg p-4 text-center flex flex-col">
        <h3 className="text-lg font-bold text-gray-800">
          High Reynolds Number (Re {">>"} 1)
        </h3>
        <p className="text-sm text-gray-500 mb-4">
          Chaotic, swirling (turbulent) flow
        </p>

        {/* SVG Diagram for Turbulent Flow */}
        <div className="flex-grow flex items-center justify-center">
          <svg viewBox="0 0 100 80" aria-label="Turbulent flow around a sphere">
            <defs>
              <style>{`
                .flow-line {
                  fill: none;
                  stroke: #9ca3af; /* gray-400 */
                  stroke-width: 3.5;
                  stroke-linecap: round;
                }
              `}</style>
            </defs>

            {/* The red sphere */}
            <circle cx="40" cy="40" r="15" fill="#ef4444" />

            {/* --- Flow Lines (Corrected) --- */}
            {/* Top and Bottom lines are continuous and extend fully */}
            <path className="flow-line" d="M 0 15 H 100" />

            {/* Incoming inner lines with stagnation effect */}
            <path className="flow-line" d="M 0 27.5 H 25" />
            <path className="flow-line" d="M 0 40 H 25" />
            <path className="flow-line" d="M 0 52.5 H 25" />

            <path className="flow-line" d="M 0 65 H 100" />

            {/* Turbulent wake with wavy, crossing lines */}
            <g className="flow-line" strokeWidth="2.5">
              <path d="M 55 40 C 65 30, 75 50, 85 40 S 95 30, 100 35" />
              <path d="M 55 28 C 65 20, 75 45, 85 30 S 95 45, 100 40" />
              <path d="M 55 52 C 65 60, 75 35, 85 50 S 95 35, 100 45" />
            </g>
          </svg>
        </div>

        {/* Analogy Box */}
        <div className="mt-4 p-2 bg-red-100 text-red-800 rounded-md text-sm">
          <Emphasize>Think:</Emphasize> A fast-moving baseball.
        </div>
      </div>
    </div>
  );
};

/**
 * A fully interactive simulation demonstrating the relationship between an object's
 * shape, the type of fluid flow, and the two main components of drag:
 * Friction (Shear) Drag and Form (Pressure) Drag.
 */
export const DragComponentSimulator: React.FC = () => {
  // State to hold the "bluffness" of the object, from 0 (streamlined) to 100 (bluff).
  const [bluffness, setBluffness] = useState(50);

  // --- Simplified Drag Model ---
  // This is an educational model, not a physically perfect one.
  // Form drag increases exponentially with bluffness.
  const formDrag = Math.pow(bluffness / 100, 2) * 100 + 1;
  // Friction drag is always present but is more significant for streamlined shapes.
  const frictionDrag = (1 - bluffness / 100) * 30 + 5;

  const totalDrag = formDrag + frictionDrag;
  const formPercentage = (formDrag / totalDrag) * 100;
  const frictionPercentage = (frictionDrag / totalDrag) * 100;

  // --- SVG Shape Calculation ---
  // The object's height and width changes based on the bluffness slider.
  const rectHeight = 4 + (bluffness / 100) * 50;
  const rectWidth = 20 - (bluffness / 100) * 10;
  const rectY = 30 - rectHeight / 2;

  return (
    <div className="w-full p-4 md:p-6 my-6 bg-slate-100 rounded-lg border border-slate-300">
      {/* --- Main Grid: Visuals on left, Controls/Data on right --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
        {/* Left Side: SVG Visualization */}
        <div className="border border-slate-300 rounded-md bg-white p-2">
          <svg
            viewBox="0 0 100 60"
            aria-label="Flow around an object changing shape"
          >
            {/* --- ADDED: Airflow Direction Arrow --- */}
            <g className="text-slate-500">
              <line
                x1="35"
                y1="5"
                x2="55"
                y2="5"
                stroke="currentColor"
                strokeWidth="1"
              />
              <path
                d="M 52 2 L 55 5 L 52 8"
                stroke="currentColor"
                strokeWidth="1"
                fill="none"
              />
              <text
                x="60"
                y="7"
                fill="currentColor"
                className="text-[5px] font-sans"
              >
                Airflow
              </text>
            </g>
            {/* --- END ADDED SECTION --- */}

            {/* Inflow lines (always visible) */}
            <g stroke="#64748b" strokeWidth="1">
              <line x1="0" y1="10" x2="30" y2="10" />
              <line x1="0" y1="20" x2="30" y2="20" />
              <line x1="0" y1="30" x2="20" y2="30" />
              <line x1="0" y1="40" x2="30" y2="40" />
              <line x1="0" y1="50" x2="30" y2="50" />
            </g>

            {/* Laminar Flow Lines (fade out as bluffness increases) */}
            <g
              stroke="#64748b"
              strokeWidth="1"
              style={{ opacity: 1 - bluffness / 100 }}
            >
              <path d={`M 30 ${10} H 100`} fill="none" />
              <path d={`M 30 ${20} Q 35 20, 100 20`} fill="none" />
              <path d={`M 30 ${30} H 100`} fill="none" />
              <path d={`M 30 ${40} Q 35 40, 100 40`} fill="none" />
              <path d={`M 30 ${50} H 100`} fill="none" />
            </g>

            {/* Turbulent Wake (fades in as bluffness increases) */}
            <g
              stroke="#64748b"
              strokeWidth="0.8"
              fill="none"
              style={{ opacity: bluffness / 100 }}
            >
              <path d="M 35 30 C 45 20, 55 40, 65 30 S 75 20, 85 40 S 95 25, 100 35" />
              <path d="M 40 20 C 50 10, 60 30, 70 20 S 80 10, 90 30 S 100 15, 100 25" />
              <path d="M 40 40 C 50 50, 60 30, 70 40 S 80 50, 90 30 S 100 45, 100 35" />
            </g>

            {/* The object itself, which changes height */}
            <rect
              x="20"
              y={rectY}
              width={rectWidth}
              height={rectHeight}
              rx="2"
              ry="2"
              fill="#CD8900"
            />
          </svg>
        </div>

        {/* Right Side: Controls and Data Readout */}
        <div className="flex flex-col gap-4">
          {/* Slider Control */}
          <div>
            <label
              htmlFor="bluffness-slider"
              className="block text-sm font-medium text-slate-700"
            >
              Object Shape
            </label>
            <div className="flex items-center gap-2 text-xs text-slate-500">
              <span>Streamlined</span>
              <input
                id="bluffness-slider"
                type="range"
                min="0"
                max="100"
                value={bluffness}
                onChange={(e) => setBluffness(Number(e.target.value))}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer"
              />
              <span>Bluff</span>
            </div>
          </div>

          {/* Data Readout and Bar Chart */}
          <div>
            <h3 className="font-bold text-lg text-slate-800">
              Drag Components
            </h3>
            <div className="w-full flex h-8 mt-2 rounded-md overflow-hidden border border-slate-400">
              {/* Friction Drag Bar */}
              <div
                className="flex items-center justify-center bg-blue-500 text-white font-bold text-sm transition-all duration-150"
                style={{ width: `${frictionPercentage}%` }}
                title={`Friction Drag: ${frictionPercentage.toFixed(0)}%`}
              >
                {frictionPercentage > 15 && `${frictionPercentage.toFixed(0)}%`}
              </div>
              {/* Form Drag Bar */}
              <div
                className="flex items-center justify-center bg-red-500 text-white font-bold text-sm transition-all duration-150"
                style={{ width: `${formPercentage}%` }}
                title={`Form Drag: ${formPercentage.toFixed(0)}%`}
              >
                {formPercentage > 15 && `${formPercentage.toFixed(0)}%`}
              </div>
            </div>
            {/* Legend */}
            <div className="flex justify-between mt-2 text-sm">
              <div className="flex items-center">
                <span className="w-3 h-3 rounded-full bg-blue-500 mr-2"></span>
                <span>Friction Drag</span>
              </div>
              <div className="flex items-center">
                <span className="w-3 h-3 rounded-full bg-red-500 mr-2"></span>
                <span>Form Drag</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const chartData = [
  { time: 0, truePath: 100, approxPath: 100 },
  { time: 2.5, truePath: 135 },
  { time: 5, truePath: 160 },
  { time: 7.5, truePath: 175 },
  { time: 10, truePath: 180, approxPath: 240 },
];
const startPoint = chartData[0];
const endPoint = chartData[chartData.length - 1];

/**
 * Renders the custom Y-Axis ticks with specific text and colors.
 * This component receives calculated props from Recharts, including x, y coordinates.
 */
const CustomYAxisTick = (props: any) => {
  const { x, y, payload } = props;
  let text = "";
  let color = "#1e293b";

  switch (payload.value) {
    case startPoint.truePath:
      text = "xₙ";
      break;
    case endPoint.truePath:
      text = "xₙ₊₁ (true)";
      color = "#3b82f6";
      break;
    case endPoint.approxPath:
      text = "xₙ₊₁ (approx)";
      color = "#ef4444";
      break;
    default:
      return null;
  }

  return (
    <g transform={`translate(${x},${y})`}>
      <text
        x={-10}
        y={0}
        dy={4}
        textAnchor="end"
        fill={color}
        className="font-mono text-lg"
      >
        {text}
      </text>
    </g>
  );
};

/**
 * A responsive, explanatory diagram of the Forward Euler method, built with Recharts.
 * This version is robust and avoids using the 'viewBox' property.
 */
export const EulerMethodDiagram: React.FC = () => {
  return (
    <div className="flex flex-col items-center p-4 my-6 bg-slate-50 rounded-lg border border-slate-200 w-full max-w-2xl mx-auto">
      <ResponsiveContainer width="100%" aspect={2}>
        <LineChart
          data={chartData}
          margin={{ top: 40, right: 80, left: 100, bottom: 60 }}
        >
          {/* --- AXES --- */}
          <XAxis
            dataKey="time"
            type="number"
            domain={["dataMin - 1", "dataMax + 1"]}
            axisLine={{ stroke: "#475569", strokeWidth: 2 }}
            tickLine={false}
            ticks={[startPoint.time, endPoint.time]}
            tick={{ fill: "#1e293b", fontSize: 16, fontFamily: "monospace" }}
            tickFormatter={(value) =>
              value === startPoint.time ? "tₙ" : "tₙ₊₁"
            }
          >
            <Label
              value="Time"
              position="bottom"
              offset={25}
              className="text-xl fill-slate-700"
            />
          </XAxis>
          <YAxis
            type="number"
            domain={[80, "dataMax + 20"]}
            axisLine={{ stroke: "#475569", strokeWidth: 2 }}
            tickLine={false}
            tick={<CustomYAxisTick />} // Use the custom tick component
          >
            <Label
              value="Position"
              angle={-90}
              position="left"
              offset={-30}
              className="text-xl fill-slate-700"
            />
          </YAxis>

          {/* --- REFERENCE LINES & LABELS --- */}
          <ReferenceLine
            x={startPoint.time}
            stroke="#94a3b8"
            strokeDasharray="3 3"
          />
          <ReferenceLine
            x={endPoint.time}
            stroke="#94a3b8"
            strokeDasharray="3 3"
          />
          <ReferenceLine
            y={startPoint.truePath}
            stroke="#ef4444"
            strokeDasharray="3 3"
          />

          {/* --- DATA LINES --- */}
          <Line
            dataKey="truePath"
            type="monotone"
            stroke="#3b82f6"
            strokeWidth={3}
            dot={{ r: 4, fill: "#3b82f6" }}
            activeDot={false}
            isAnimationActive={false}
          >
            <Label
              value="True Path"
              position="top"
              offset={10}
              className="fill-[#3b82f6] font-bold text-2xl"
            />
          </Line>
          <Line
            dataKey="approxPath"
            stroke="#ef4444"
            strokeWidth={3}
            activeDot={false}
            connectNulls={true}
            isAnimationActive={false}
          />

          {/* Rise / Run Labels (positioned relative to chart area) */}
          <Label
            position="insideBottom"
            content={() => (
              <text
                x="50%"
                y="81%"
                className="fill-[#ef4444] font-mono text-lg"
                textAnchor="middle"
              >
                run ≈ Δt
              </text>
            )}
          />
          <Label
            position="insideRight"
            content={() => (
              <text
                x="85%"
                y="60%"
                className="fill-[#ef4444] font-mono text-lg"
              >
                rise ≈ vₙ * Δt
              </text>
            )}
          />
        </LineChart>
      </ResponsiveContainer>

      <div className="mt-4 text-center text-slate-700 max-w-lg">
        {/* Explanatory text remains the same */}
        <p>
          The <strong className="text-red-600">Forward Euler method</strong>{" "}
          approximates the next step by assuming the velocity (the slope of the
          graph) is constant over the whole time interval{" "}
          <strong className="font-mono">Δt</strong>.
        </p>
        <p className="mt-2">
          It uses the slope calculated at the{" "}
          <strong className="font-semibold">start</strong> of the interval,
          which leads to some error compared to the{" "}
          <strong className="text-blue-600">True Path</strong>.
        </p>
      </div>
    </div>
  );
};

interface FreeBodyDiagramProps {
  /** If true, drag and gravity vectors are equal length. Defaults to false. */
  isTerminalVelocity?: boolean;
}

/**
 * A React component that renders a Free Body Diagram for a falling object.
 * It visually represents the forces of gravity and drag.
 *
 * @param {isTerminalVelocity} - Controls whether the forces are balanced (terminal velocity)
 * or unbalanced (gravity is greater than drag).
 */
export const FreeBodyDiagram: React.FC<FreeBodyDiagramProps> = ({
  isTerminalVelocity = false,
}) => {
  // Define arrow heights based on the state.
  // Using Tailwind's arbitrary values for precise control, but could use h-16, h-28 etc.
  const gravityArrowHeight = "h-[120px]";
  const dragArrowHeight = isTerminalVelocity ? "h-[120px]" : "h-[70px]";

  return (
    // Main container for positioning. my-8 adds vertical margin.
    <div className="relative flex justify-center items-center my-8 h-80">
      {/* Optional: Label for direction of motion */}
      <div className="absolute top-0 text-slate-500 text-sm">
        (Motion is downward)
      </div>

      {/* The Object: A tennis ball */}
      <div className="relative z-10 w-24 h-24 bg-gradient-to-br from-yellow-200 to-yellow-400 rounded-full border-2 border-slate-700 flex justify-center items-center">
        <span className="font-bold text-slate-800">Ball</span>
      </div>

      {/* --- FORCES --- */}

      {/* Gravity Force (Downward) */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 z-0"
        aria-label="Gravity Force Vector"
      >
        {/* Arrow Line */}
        <div className={`w-1 bg-red-500 ${gravityArrowHeight}`} />
        {/* Arrowhead (CSS Triangle) */}
        <div
          className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-0 h-0"
          style={{
            borderLeft: "8px solid transparent",
            borderRight: "8px solid transparent",
            borderTop: "12px solid rgb(239 68 68)", // Tailwind's red-500
          }}
        />
        {/* Label */}
        <div className="absolute -bottom-6 left-4 text-red-600 font-bold text-lg">
          F<sub>g</sub>
        </div>
      </div>

      {/* Drag Force (Upward) */}
      <div
        className="absolute bottom-1/2 left-1/2 -translate-x-1/2 z-0"
        aria-label="Drag Force Vector"
      >
        {/* Arrow Line */}
        <div className={`w-1 bg-blue-500 ${dragArrowHeight}`} />
        {/* Arrowhead (CSS Triangle) */}
        <div
          className="absolute -top-1 left-1/2 -translate-x-1/2 w-0 h-0"
          style={{
            borderLeft: "8px solid transparent",
            borderRight: "8px solid transparent",
            borderBottom: "12px solid rgb(59 130 246)", // Tailwind's blue-500
          }}
        />
        {/* Label */}
        <div className="absolute -top-6 left-4 text-blue-600 font-bold text-lg">
          F<sub>D</sub>
        </div>
      </div>
    </div>
  );
};

const FluidDragSimulator = () => {
  const NUM_PARTICLES = 250;
  const CONTAINER_WIDTH = 600;
  const CONTAINER_HEIGHT = 400;
  const BALL_SIZE = 80;
  const PARTICLE_SIZE = 10;

  const BALL_REPULSION = 100;
  const BALL_DRAG = 0.25;
  const DAMPING = 0.95;
  const PARTICLE_REPULSION = 0.5;
  const PARTICLE_INTERACTION_RADIUS = 30;
  interface Vector2D {
    x: number;
    y: number;
  }

  interface Particle extends Vector2D {
    vx: number;
    vy: number;
  }

  const [ballPosition, setBallPosition] = useState<Vector2D>({
    x: CONTAINER_WIDTH / 2,
    y: CONTAINER_HEIGHT / 2,
  });

  const [particles, setParticles] = useState<Particle[]>(() =>
    Array.from({ length: NUM_PARTICLES }, () => ({
      x: Math.random() * CONTAINER_WIDTH,
      y: Math.random() * CONTAINER_HEIGHT,
      vx: 0,
      vy: 0,
    }))
  );

  const [isDragging, setIsDragging] = useState(false);

  const dragOffsetRef = useRef<Vector2D>({ x: 0, y: 0 });
  const prevBallPositionRef = useRef<Vector2D>(ballPosition);
  const ballPositionRef = useRef<Vector2D>(ballPosition);
  const animationFrameId = useRef<number | null>(null);

  useEffect(() => {
    ballPositionRef.current = ballPosition;
  }, [ballPosition]);

  useEffect(() => {
    const animate = () => {
      const currentBallPos = ballPositionRef.current;
      const ballVelocity = {
        x: currentBallPos.x - prevBallPositionRef.current.x,
        y: currentBallPos.y - prevBallPositionRef.current.y,
      };

      setParticles((prevParticles: Particle[]) => {
        const nextParticles = [...prevParticles];
        const forces = nextParticles.map(() => ({ x: 0, y: 0 }));

        for (let i = 0; i < nextParticles.length; i++) {
          for (let j = i + 1; j < nextParticles.length; j++) {
            const p1 = nextParticles[i];
            const p2 = nextParticles[j];
            const dx = p1.x - p2.x;
            const dy = p1.y - p2.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < PARTICLE_INTERACTION_RADIUS && distance > 0) {
              const force = PARTICLE_REPULSION / (distance * distance);
              const forceX = (dx / distance) * force;
              const forceY = (dy / distance) * force;
              // Apply force to both particles in opposite directions
              forces[i].x += forceX;
              forces[i].y += forceY;
              forces[j].x -= forceX;
              forces[j].y -= forceY;
            }
          }
        }

        // B) Ball interaction (repulsion and drag)
        for (let i = 0; i < nextParticles.length; i++) {
          const p = nextParticles[i];
          const dx = p.x - currentBallPos.x;
          const dy = p.y - currentBallPos.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          const interactionRadius = BALL_SIZE / 2 + PARTICLE_SIZE / 2 + 10;

          if (distance < interactionRadius) {
            const force = BALL_REPULSION / (distance * distance);
            forces[i].x += (dx / distance) * force;
            forces[i].y += (dy / distance) * force;
          }
          if (distance < interactionRadius * 1.5) {
            forces[i].x += ballVelocity.x * BALL_DRAG;
            forces[i].y += ballVelocity.y * BALL_DRAG;
          }
        }

        // --- Apply forces to update particle positions ---
        return nextParticles.map((p, i) => {
          let newVx = (p.vx + forces[i].x) * DAMPING;
          let newVy = (p.vy + forces[i].y) * DAMPING;
          let newX = p.x + newVx;
          let newY = p.y + newVy;

          // Boundary collision
          if (newX < 0 || newX > CONTAINER_WIDTH - PARTICLE_SIZE) {
            newVx *= -0.8;
            newX = Math.max(0, Math.min(newX, CONTAINER_WIDTH - PARTICLE_SIZE));
          }
          if (newY < 0 || newY > CONTAINER_HEIGHT - PARTICLE_SIZE) {
            newVy *= -0.8;
            newY = Math.max(
              0,
              Math.min(newY, CONTAINER_HEIGHT - PARTICLE_SIZE)
            );
          }

          return { x: newX, y: newY, vx: newVx, vy: newVy };
        });
      });

      prevBallPositionRef.current = currentBallPos;
      animationFrameId.current = requestAnimationFrame(animate);
    };

    animationFrameId.current = requestAnimationFrame(animate);

    return () => {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, []); // Run this effect only once on mount

  // --- Mouse Event Handlers (no changes) ---
  const handleMouseDown = (e: MouseEvent<HTMLDivElement>) => {
    setIsDragging(true);
    const rect = e.currentTarget.getBoundingClientRect();
    dragOffsetRef.current = {
      x: e.clientX - rect.left - BALL_SIZE / 2,
      y: e.clientY - rect.top - BALL_SIZE / 2,
    };
    e.preventDefault();
  };

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    const containerRect = e.currentTarget.getBoundingClientRect();
    const newX = e.clientX - containerRect.left - dragOffsetRef.current.x;
    const newY = e.clientY - containerRect.top - dragOffsetRef.current.y;
    setBallPosition({
      x: Math.max(0, Math.min(newX, CONTAINER_WIDTH)),
      y: Math.max(0, Math.min(newY, CONTAINER_HEIGHT)),
    });
  };

  const handleMouseUp = () => setIsDragging(false);
  const handleMouseLeave = () => setIsDragging(false);

  // --- Component Render (no changes) ---
  return (
    <div
      style={{
        width: `${CONTAINER_WIDTH}px`,
        height: `${CONTAINER_HEIGHT}px`,
        border: "2px solid #444",
        borderRadius: "8px",
        position: "relative",
        overflow: "hidden",
        backgroundColor: "#1a1a1a",
        cursor: isDragging ? "grabbing" : "default",
        touchAction: "none",
      }}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseLeave}
    >
      {particles.map((p: Particle, i: number) => (
        <div
          key={i}
          style={{
            position: "absolute",
            width: `${PARTICLE_SIZE}px`,
            height: `${PARTICLE_SIZE}px`,
            backgroundColor: "#00bfff",
            borderRadius: "50%",
            left: `${p.x}px`,
            top: `${p.y}px`,
            opacity: 0.7,
            willChange: "transform",
          }}
        />
      ))}
      <div
        onMouseDown={handleMouseDown}
        style={{
          position: "absolute",
          width: `${BALL_SIZE}px`,
          height: `${BALL_SIZE}px`,
          backgroundColor: "#ff4500",
          borderRadius: "50%",
          left: `${ballPosition.x - BALL_SIZE / 2}px`,
          top: `${ballPosition.y - BALL_SIZE / 2}px`,
          cursor: "grab",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "white",
          fontWeight: "bold",
          userSelect: "none",
          boxShadow: isDragging
            ? "0 0 25px rgba(255, 69, 0, 0.8)"
            : "0 0 10px rgba(0,0,0,0.5)",
          transition: "box-shadow 0.2s ease-in-out",
          willChange: "transform, box-shadow",
        }}
      >
        Drag Me
      </div>
    </div>
  );
};

function AirflowAnimation() {
  // Define the smooth paths for the wind particles to follow.
  const windPaths = [
    // Paths flowing over the top
    {
      id: "p-top-1",
      d: "M -10,60 C 80,60 100,20 150,20 C 200,20 220,60 310,60",
    },
    {
      id: "p-top-2",
      d: "M -10,80 C 80,80 110,50 150,50 C 190,50 220,80 310,80",
    },
    // Paths flowing under the bottom
    {
      id: "p-bottom-1",
      d: "M -10,140 C 80,140 100,180 150,180 C 200,180 220,140 310,140",
    },
    {
      id: "p-bottom-2",
      d: "M -10,120 C 80,120 110,150 150,150 C 190,150 220,120 310,120",
    },
  ];

  // Increased particle count for a denser, more fluid visual.
  const particlesPerPath = 30;

  return (
    <div
      className="
        font-sans max-w-lg mx-auto my-8 p-6 bg-white 
        rounded-lg border border-slate-200 shadow-lg
      "
    >
      <h3 className="text-center text-xl font-medium text-slate-700 mb-4">
        Airflow Around a Sphere
      </h3>
      <svg
        className="w-full h-auto block"
        viewBox="0 0 300 200"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* SVG definitions are not styled by Tailwind, they use attributes */}
        <defs>
          {windPaths.map((path) => (
            <path
              key={path.id}
              id={path.id}
              d={path.d}
              fill="none"
              stroke="rgba(150, 150, 150, 0.3)" // Fainter stroke for denser particles
            />
          ))}
          <radialGradient id="grad-ball-light">
            <stop offset="0%" stopColor="#f0f0f0" />
            <stop offset="100%" stopColor="#a0a0a0" />
          </radialGradient>
        </defs>

        {/* The Ball/Sphere */}
        <circle
          cx="150"
          cy="100"
          r="40"
          fill="url(#grad-ball-light)"
          stroke="#b0b0b0"
          strokeWidth="1"
        />

        {/* Animated Wind Particles */}
        {windPaths.map(({ id }) =>
          Array.from({ length: particlesPerPath }).map((_, i) => (
            <circle key={`${id}-particle-${i}`} r="1.5" fill="#3b82f6">
              <animateMotion
                dur={`7s`}
                begin={`-${i * (7 / particlesPerPath)}s`}
                repeatCount="indefinite"
              >
                <mpath href={`#${id}`} />
              </animateMotion>
            </circle>
          ))
        )}
      </svg>
    </div>
  );
}

export default function DragLesson() {
  const slides = [
    // Slide 1: Learning targets.
    <Block color="green" title="Modeling Drag">
      <p>
        <Emphasize>In this lesson, you'll...</Emphasize>
      </p>
      <ul className="list-disc list-inside">
        <li>Learn what drag is.</li>
        <li>Understand and apply the equations surrounding drag.</li>
        <li>Use numerical methods to predict motion.</li>
      </ul>
      <AirflowAnimation />
      <p>
        <Emphasize>
          Click the arrow at the top right to continue with the lesson.
        </Emphasize>
      </p>
    </Block>,
    // Slide 2: Defining Drag
    <Block color="blue" title="What is drag?">
      <p>
        <KeyTerm>Drag</KeyTerm>, also known as fluid resistance,{" "}
        <Emphasize>
          is a resistive force caused by movement through fluids
        </Emphasize>
        .
      </p>
      <ColorBox color="blue">
        "Resistive" means opposing, so this force{" "}
        <Emphasize>goes in the opposite direction of motion</Emphasize>.
      </ColorBox>
      <p>
        <KeyTerm>Air drag </KeyTerm>(or aerodynamic drag) is the drag caused by
        an object interacting with air, so either an object moving through air,
        wind hitting an object, or both!
      </p>
      <p>
        Here, you can see how air moves around an object. Since air can't go
        through this object, it's path bends around the object.
      </p>
      <AirflowAnimation />
    </Block>,
    // Slide 3: Feeling drag.
    <Block color="yellow" title="Why is there a drag force?">
      <p>
        Use the interactive demo below to see what happens when you click and
        drag to move an object through a fluid.
      </p>
      <p>
        You can think of this like sticking your finger in a jar of honey or
        peanut butter and trying to move it.
      </p>
      <FluidDragSimulator />
    </Block>,
    // Slide 4: Free Body Diagram.
    <Block color="blue" title="Forces on a Falling Object">
      <p>
        Let's look at the forces acting on a tennis ball falling through the
        air.
      </p>
      <p>
        Gravity (
        <KeyTerm>
          F<sub>g</sub>
        </KeyTerm>
        ) constantly pulls the ball downward. As the ball's{" "}
        <Emphasize>speed increases</Emphasize>, the ball is pushing more air out
        of the way, so the <Emphasize>drag force</Emphasize> (
        <KeyTerm>
          F<sub>D</sub>
        </KeyTerm>
        ) pushing upward <Emphasize>grows stronger</Emphasize>.
      </p>
      <FreeBodyDiagram />
      <p>
        Initially, when the ball is slow, gravity is much stronger than drag, so
        the ball accelerates downward, as the above diagram shows.
      </p>
    </Block>,
    // Slide 5: Terminal Velocity.
    <Block color="blue" title="Terminal Velocity">
      <p>
        What happens when the upward drag force becomes exactly as strong as the
        downward force of gravity?
      </p>
      <p>
        The forces become balanced, meaning the{" "}
        <Emphasize>net force is zero</Emphasize>. According to Newton's Second
        Law (F=ma), if the net force is zero, the acceleration must also be
        zero.
      </p>
      <p>
        This constant, stable velocity is called{" "}
        <KeyTerm>terminal velocity</KeyTerm>.
      </p>
      <FreeBodyDiagram isTerminalVelocity={true} />
      <p>
        Question to ponder:{" "}
        <Emphasize>
          What would happen if velocity were greater than terminal velocity?
        </Emphasize>{" "}
        Would it even be possible?
      </p>
      <p>Hint: Consider what forces are involved.</p>
    </Block>,
    // Slide 6: Check-in.
    <Block color="purple" title="Check-in">
      <QuizQuestion
        question="When you release a ball and it starts to fall (so it's velocity is 0, but its acceleration is downward), what are all the forces on that ball?"
        choices={[
          {
            text: "There is a downward drag force causing the ball to start moving down.",
            isCorrect: false,
            explanation: "Not quite, the downward forcce is gravity.",
          },
          {
            text: "There is a downward gravitational force and an upward drag force.",
            isCorrect: false,
            explanation:
              "Not quite, since it's not moving yet, there wouldn't be a drag force. Drag is resistive against motion, so there should not be any drag until an object starts moving.",
          },
          {
            text: "There is a downward gravitational force and no others.",
            isCorrect: true,
            explanation:
              "Exactly! Gravity acts on the object, but since velocity is zero, there is no drag.",
          },
          {
            text: "Velocity is 0, so there are no forces.",
            isCorrect: false,
            explanation:
              "Not quite! If acceleration were 0, that would mean that there is no net force, but the ball is accelerating downward so there is force.",
          },
        ]}
      />
      <QuizQuestion
        question="What is terminal velocity?"
        choices={[
          {
            text: "Terminal velocity is the velocity at the end of the problem, often when t = 1s.",
            isCorrect: false,
            explanation: "Not quite.",
          },
          {
            text: "Terminal velocity is the top speed.",
            isCorrect: false,
            explanation:
              "Not quite, we can have an object that never reaches terminal velocity (and would thus have a lower top speed) and we can have objects that exceed their terminal velocity.",
          },
          {
            text: "Terminal velocity is when drag and gravity cancel out.",
            isCorrect: true,
            explanation:
              "Exactly! Terminal velocity is when the net acceleration is 0. If an object is below terminal velocity, gravity is stronger than drag, so it speeds up. And if an object is above terminal velocity, gravity is weaker than drag, so it slows down.",
          },
        ]}
      />
    </Block>,
    // Slide 7: Different drag forces.
    <Block color="yellow" title="Where Does Drag Come From? The Two Components">
      <p>
        Drag isn't a single phenomenon. It's the{" "}
        <Emphasize>sum of two distinct forces</Emphasize> that arise from a
        fluid interacting with an object's surface and shape.
      </p>

      {/* A two-column layout to compare the drag components */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6">
        {/* Friction (Shear) Drag */}
        <div className="p-4 border border-blue-300 bg-blue-50 rounded-lg">
          <h3 className="text-xl font-bold text-blue-800">
            1. Friction Drag (Shear Drag)
          </h3>
          <p className="mt-2 text-slate-700">
            This is essentially surface friction, caused by the fluid "sticking"
            to the object's surface due to its <KeyTerm>viscosity</KeyTerm>.
          </p>
          <p className="mt-2 text-sm text-slate-600">
            <Emphasize>Analogy:</Emphasize> Rubbing your hand across a rough
            tabletop. The force you feel is friction.
          </p>
        </div>

        {/* Form (Pressure) Drag */}
        <div className="p-4 border border-red-300 bg-red-50 rounded-lg">
          <h3 className="text-xl font-bold text-red-800">
            2. Form Drag (Pressure Drag)
          </h3>
          <p className="mt-2 text-slate-700">
            This is caused by the object's shape. As the object moves, it
            creates a high-pressure zone in front and a low-pressure turbulent{" "}
            <KeyTerm>wake</KeyTerm> behind.
          </p>
          <p className="mt-2 text-sm text-slate-600">
            <Emphasize>Analogy:</Emphasize> Sticking your hand out of a car
            window. The force pushing your hand back is mostly form drag.
          </p>
        </div>
      </div>

      <p>
        Use the interactive simulation below to see this in action.{" "}
        <Emphasize>Try changing the object's shape with the slider</Emphasize>{" "}
        and see how the two drag components change.
      </p>

      {/* The interactive element */}
      <DragComponentSimulator />

      <h3 className="text-2xl font-bold mt-8 mb-2">
        So, Which Component Dominates?
      </h3>
      <p>
        This is the critical question, and the answer is:{" "}
        <Emphasize>it depends!</Emphasize> The balance between friction and form
        drag is precisely what the <KeyTerm>Reynolds Number (Re)</KeyTerm>{" "}
        describes.
      </p>

      <ColorBox color="yellow">
        The Reynolds Number is a ratio of <KeyTerm>inertial forces</KeyTerm>{" "}
        (which cause form drag) to <KeyTerm>viscous forces</KeyTerm> (which
        cause friction drag).
        <ul className="list-disc list-inside space-y-2 mt-2">
          <li>
            <Emphasize>Low Re:</Emphasize> Viscous forces win.{" "}
            <Emphasize>Friction Drag</Emphasize> is the main component.
          </li>
          <li>
            <Emphasize>High Re:</Emphasize> Inertial forces win.{" "}
            <Emphasize>Form Drag</Emphasize> is the main component.
          </li>
        </ul>
      </ColorBox>

      <p className="mt-4">
        For most objects you see every day, like a falling tennis ball or a
        moving car, the Reynolds number is very high (often in the millions),
        and <Emphasize>form drag is by far the biggest contributor</Emphasize>{" "}
        to air resistance.
      </p>
    </Block>,

    // Slide 8: Reynolds number.
    <Block color="blue" title="What Drag Model Should We Use?">
      <p>
        Since drag is the resulting phenomenon of tons of different forces (many
        particle collisions), there are two models we commonly use. One model is
        proportional to velocity (<KeyTerm>F ∝ v</KeyTerm>) and one is
        proportional to velocity squared (<KeyTerm>F ∝ v²</KeyTerm>).
      </p>
      <p className="mt-4">
        Which one is correct? The answer depends on the nature of the fluid
        flow, which is described by
        <KeyTerm> Reynolds Number (Re)</KeyTerm>.
      </p>
      <ColorBox color="yellow">
        The Reynolds number relates an object's speed and size to the fluid's
        density and viscosity.
      </ColorBox>
      {/* Using the custom diagram component */}
      <ReynoldsDiagram />

      <p>This leads us to two main drag regimes we can model:</p>
      <ul className="list-disc list-inside mt-4 space-y-4">
        <li>
          <Emphasize>Linear Drag (F = -b v)</Emphasize>
          <br />
          This model applies at{" "}
          <strong className="text-blue-600">low Reynolds numbers</strong>. The
          drag force comes mainly from the fluid's viscosity. It's
          mathematically simpler to solve, but only applies to very slow or
          microscopic objects.
        </li>
        <li>
          <Emphasize>Quadratic Drag (F = -k v²)</Emphasize>
          <br />
          This model applies at{" "}
          <strong className="text-red-600">high Reynolds numbers</strong>. The
          drag force is dominated by the inertia of the fluid being pushed out
          of the way. This is the correct model for most everyday objects like
          cars, airplanes, and thrown balls.
        </li>
      </ul>
    </Block>,

    // Slide 9: Stokes' Law.
    <Block color="blue" title="A Closer Look: Stokes' Law">
      <p>
        For the{" "}
        <Emphasize>
          special case of a perfect sphere moving at a very low speed
        </Emphasize>{" "}
        (where flow is laminar), there's a precise formula for the linear drag
        force. This is known as <KeyTerm>Stokes' Law</KeyTerm>.
      </p>

      <div className="p-4 my-5 text-2xl text-center rounded bg-slate-200 font-mono">
        F<sub>D</sub> = 6π η r v
      </div>

      <p className="mt-5 mb-2">
        This formula elegantly connects the drag force to the properties of the
        fluid and the sphere:
      </p>

      {/* A definition list for the variables */}
      <ul className="pl-0 list-none space-y-4 my-4">
        <li>
          <code className="p-1 mr-2 text-lg font-bold rounded bg-slate-200 text-orange-600">
            η
          </code>
          <Emphasize>Dynamic Viscosity (eta)</Emphasize>
          <p className="mt-1 text-slate-600">
            This is a measure of the fluid's internal friction or "thickness."
            Honey has a very high viscosity; air has a very low one.
          </p>
        </li>
        <li>
          <code className="p-1 mr-2 text-lg font-bold rounded bg-slate-200 text-orange-600">
            r
          </code>
          <Emphasize>Radius of the sphere</Emphasize>
          <p className="mt-1 text-slate-600">
            A larger sphere interacts with more fluid, leading to more drag.
          </p>
        </li>
        <li>
          <code className="p-1 mr-2 text-lg font-bold rounded bg-slate-200 text-orange-600">
            v
          </code>
          <Emphasize>Velocity</Emphasize>
          <p className="mt-1 text-slate-600">
            The speed of the sphere relative to the fluid. As expected for
            linear drag, the force is directly proportional to this value.
          </p>
        </li>
      </ul>

      <ColorBox color="blue">
        <p>
          Notice the connection to our general linear drag model,{" "}
          <code className="font-mono">
            F<sub>D</sub> = b v
          </code>
          ?
          <br />
          Stokes' Law tells us exactly what the drag coefficient{" "}
          <code className="font-mono">b</code> is for a sphere:{" "}
          <strong className="font-mono">b = 6π η r</strong>.
        </p>
      </ColorBox>

      <p>
        This formula is{" "}
        <Emphasize>
          incredibly useful in fields like microbiology and geology for modeling
        </Emphasize>{" "}
        motion like falling water droplets or sediment in water.
      </p>
    </Block>,

    // Slide 10: Quadratic Drag Equation.
    <Block color="blue" title="High Velocity Drag">
      <p>
        You've now seen why the drag force exists. It's because the motion of
        the object displaces the fluid's particles.
      </p>
      <p>
        Consequently, the big and scary <KeyTerm>drag equation</KeyTerm> looks
        like this:
      </p>
      {/* Equation Box: Monospaced font for a "codey" feel, slightly different background. */}
      <div className="p-4 my-5 text-2xl text-center rounded bg-slate-200 font-mono">
        F<sub>D</sub> = ½ ρ v<sup>2</sup> C<sub>D</sub> A
      </div>

      <p className="mb-5 text-slate-700">Here's what each part means:</p>

      {/* Definition List: A list without bullets, where each item has some space below it. */}
      <ul className="pl-0 list-none">
        <li className="mb-5">
          <code className="p-1 mr-2 text-lg font-bold rounded bg-slate-200 text-orange-600">
            F<sub>D</sub>
          </code>
          <Emphasize>Drag Force</Emphasize>
          <p className="mt-1 text-slate-600">
            This is the total force pushing against the object (and also against
            the fluid).
          </p>
        </li>
        <li className="mb-5">
          <code className="p-1 mr-2 text-lg font-bold rounded bg-slate-200 text-orange-600">
            ρ
          </code>
          <Emphasize>Fluid Density (rho)</Emphasize>
          <p className="mt-1 text-slate-600">
            How much "stuff" is in the fluid. More particles would create a
            denser, more resistant fluid.
          </p>
        </li>
        <li className="mb-5">
          <code className="p-1 mr-2 text-lg font-bold rounded bg-slate-200 text-orange-600">
            v
          </code>
          <Emphasize>Velocity</Emphasize>
          <p className="mt-1 text-slate-600">
            The speed and direction of the object relative to the fluid. Notice
            how moving the ball faster creates a much stronger reaction. This is
            because the force increases with the <Emphasize>square</Emphasize>{" "}
            of the velocity (v<sup>2</sup>), making speed a huge factor!
          </p>
        </li>
        <li className="mb-5">
          <code className="p-1 mr-2 text-lg font-bold rounded bg-slate-200 text-orange-600">
            C<sub>D</sub>
          </code>
          <Emphasize>Drag Coefficient</Emphasize>
          <p className="mt-1 text-slate-600">
            This accounts for the object's shape. A pointy, aerodynamic shape
            has a low C<sub>D</sub>.
          </p>
        </li>
        <li className="mb-5">
          <code className="p-1 mr-2 text-lg font-bold rounded bg-slate-200 text-orange-600">
            A
          </code>
          <Emphasize>Cross-Sectional Area</Emphasize>
          <p className="mt-1 text-slate-600">
            The area of the object facing the fluid. A larger ball displaces
            more particles and experiences more drag.
          </p>
        </li>
      </ul>
    </Block>,

    // Slide 11: Equational Check-in.
    <Block color="purple" title="Check-in">
      <QuizQuestion
        question="What is Reynolds number (Re)?"
        choices={[
          {
            text: "Reynold's number is ~3.72641 and is a ratio of static metaphysical relevance and external bouyancy, coined by John Reynold.",
            isCorrect: false,
            explanation:
              "Not quite, Reynolds number is not a constant, but depends on the specific context.",
          },
          {
            text: "Reynolds Number depends on a few factors like viscosity and speed, representing how turbulent or laminar the liquid flow will be.",
            isCorrect: true,
            explanation:
              "Exactly! Reynolds number is a ratio of inertial and viscous forces, and it is used to predict liquid flow.",
          },
          {
            text: "Reynolds number is the coefficent of drag in the equation F_D = Re v",
            isCorrect: false,
            explanation:
              "Not quite, Reynolds number is not used as a direct coefficient, although it may appear in certain equations.",
          },
        ]}
      />
      <QuizQuestion
        question="True or false? Friction (or shear) drag is the drag caused by pushing air molecules."
        choices={[
          {
            text: "True.",
            isCorrect: false,
            explanation: "Not quite, that would be form (or pressure) drag.",
          },
          {
            text: "False.",
            isCorrect: true,
            explanation:
              "Exactly! That would be form (or pressure) drag. Friction (or shear) drag is caused by the particles sticking to and sliding along the surface.",
          },
        ]}
      />
      <QuizQuestion
        question="To model drag force, we always use Stokes' law: F_D = 6π η r v?"
        choices={[
          {
            text: "That's not Stoke's law. Stokes' law has the term 3π, not 6π.",
            isCorrect: false,
            explanation: "Nope, that is the equation of Stokes' law.",
          },
          {
            text: "Nope, Stokes' law only applies to a perfect sphere when there's a really low Reynolds number.",
            isCorrect: true,
            explanation:
              "Exactly! In many other cases, when we have a higher Reynolds number, we'll use a quadratic drag equation.",
          },
          {
            text: "That's right! Stokes' law tells us exactly how we can model drag.",
            isCorrect: false,
            explanation:
              "Nope. There are many cases when we would not use Stoke's law.",
          },
        ]}
      />
    </Block>,

    // Slide 12: Explaining Modeling.
    <Block color="yellow" title="What does this look like in practice?">
      <p>
        When modeling drag,{" "}
        <Emphasize>
          we often use a simple formula like a constant times velocity ( 𝑘 𝑣 )
          or velocity squared ( 𝑘 𝑣 <sup>2</sup> )
        </Emphasize>{" "}
        instead of writing out the full formula with fluid density, drag
        coefficient, and cross-sectional area.
      </p>
      <p>
        This is because <Emphasize>sometimes those extra details</Emphasize>{" "}
        usually stay the same for a given object moving through the same fluid,
        and they <Emphasize>can be combined into one constant</Emphasize>.
      </p>
      <p>
        Using a simpler formula makes the math easier and still gives us a good
        idea of how drag works, especially when we're mostly interested in how
        drag changes with speed.
      </p>
      <ColorBox color="yellow">
        Practically, for the sake of learning, we can often deal with the
        following simple linear equation!
        <div className="flex flex-row justify-center font-semibold my-2">
          <code>
            F<sub>D</sub> = k v
          </code>
        </div>
      </ColorBox>
    </Block>,

    // Slide 13: Solving by Separation of Variables.
    <Block color="yellow" title="Solving an Easier Case">
      <p>
        While the quadratic drag equation is common, solving it analytically is
        hard. Let's look at a simpler model, linear drag, where{" "}
      </p>
      <ColorBox color="yellow">
        <code>
          F<sub>D</sub> = -b v
        </code>
      </ColorBox>
      <p>
        We can solve this using Newton's second law (<KeyTerm>F=ma</KeyTerm>)
        and a calculus technique called{" "}
        <KeyTerm>separation of variables</KeyTerm>.
      </p>
      <ol className="list-decimal list-inside my-4 space-y-2">
        <li>
          Start with Newton's Law:
          <ColorBox color="blue">
            <code>ma = -bv</code>
          </ColorBox>
        </li>
        <li>
          Replace acceleration (a) with <code>dv/dt</code>:
          <ColorBox color="blue">
            <code>m(dv/dt) = -bv</code>
          </ColorBox>
        </li>
        <li>
          Separate variables: Get all 'v' terms on one side and 't' terms on the
          other:
          <ColorBox color="blue">
            <code>(1/v)dv = -(b/m)dt</code>
          </ColorBox>
        </li>
        <li>
          <Emphasize>
            Integrate both sides to find the velocity equation.
          </Emphasize>
        </li>
      </ol>
      <p>
        This shows how we can find an exact equation for motion in some simple
        cases.
      </p>
    </Block>,

    // Slide 14: Seeing if they can perform the math.
    <Block color="purple" title="Check in">
      <QuizQuestion
        question="Assume that at time 0, velocity is v_0. What is the formula for velocity from the equation F_D = -b v (from the previous slide), given that there are no other forces?"
        choices={[
          {
            text: "v = v_0 e^(-bt/m)",
            isCorrect: true,
            explanation: "Correct!",
          },
          {
            text: "v = v_0^2 + 4t",
            isCorrect: false,
            explanation:
              "Not quite, we wouldn't expect the object to get faster as the only force acting on it is a resistive force - drag.",
          },
          {
            text: "v = (v_0 t / b)^m",
            isCorrect: false,
            explanation:
              "Not quite. Try carefully integrating both sides and using some rules of logarithms to figure it out.",
          },
          {
            text: "v = (v_0 b / m)^t",
            isCorrect: false,
            explanation:
              "Not quite. Try carefully integrating both sides and using some rules of logarithms to figure it out.",
          },
        ]}
      />
    </Block>,

    // Slide 15: Intro of Numerical Methods.
    <Block color="yellow" title="Approximating the Harder Case">
      <p>
        What if we can't solve the equation exactly? We can{" "}
        <Emphasize>approximate</Emphasize> the answer by taking small steps
        forward in time.
      </p>
      <p>
        This is the core idea of <KeyTerm>numerical methods</KeyTerm>, which are
        mathematical techniques of approximating hard or unsolvable equation.
        The simplest numerical method is the{" "}
        <KeyTerm>Forward Euler method</KeyTerm>:
      </p>
      <EulerMethodDiagram />
      <ColorBox color="yellow">
        <Emphasize>
          Try entering a few different numbers of steps (small and large) below
        </Emphasize>{" "}
        to see how accurately we can predict the blue path.
      </ColorBox>
      <EulerAnimator />
    </Block>,

    // Slide 16. Coding Forward Euler.
    <Block color="yellow" title="Challenge: Code the Forward Euler Method">
      <p>
        Now it's your turn. Use the logic from the previous slide to complete
        the code below.
      </p>
      <p>
        You'll need to calculate the current acceleration based on gravity and
        drag, then use it to update the ball's velocity and position over a
        small timestep <code>dt</code>.
      </p>
      {/* <CodingChallenge /> */}
    </Block>,

    // Slide 17: Higher Order Methods.
    <Block color="blue" title="Improving Accuracy">
      <p>
        The Forward Euler method is simple, but it can be inaccurate, especially
        with larger timesteps (Δt). It calculates the acceleration at the start
        of the step and assumes it's constant throughout.
      </p>
      <p>
        More advanced methods improve accuracy by sampling the acceleration at
        multiple points within the timestep.
      </p>
      <ul className="list-disc list-inside">
        <li>
          <KeyTerm>2nd-Order Methods</KeyTerm> (like the Midpoint Method) "look
          ahead" to the middle of the timestep to get a better average
          acceleration.
        </li>
        <li>
          <KeyTerm>Runge-Kutta 4th Order (RK4)</KeyTerm> is a popular and highly
          accurate method that uses a weighted average of four different
          estimates.
        </li>
      </ul>
    </Block>,

    // Slide 18: Coding a 2nd-Order Numerical Method.
    <Block color="yellow" title="Challenge: A More Accurate Method">
      <p>Let's try implementing a 2nd-order method. The idea is to:</p>
      <ol className="list-decimal list-inside my-4 space-y-2">
        <li>
          Use Forward Euler to "predict" the velocity at the midpoint of the
          timestep.
        </li>
        <li>Calculate acceleration at that midpoint.</li>
        <li>
          Use this improved acceleration to take the full step from the
          beginning.
        </li>
      </ol>
      <p>Try coding this "predict-correct" logic.</p>
      {/* <CodingChallenge /> */}
    </Block>,

    // Slide 19: Recap.
    <Block color="green" title="Lesson Recap">
      <p>Here's what we learned about modeling drag:</p>
      <ul className="list-disc list-inside">
        <li>
          <KeyTerm>Drag</KeyTerm> is a resistive force that opposes motion
          through a fluid.
        </li>
        <li>
          For high speeds, drag is proportional to velocity squared (
          <KeyTerm>
            F<sub>D</sub> = kv<sup>2</sup>
          </KeyTerm>
          ).
        </li>
        <li>
          <KeyTerm>Terminal velocity</KeyTerm> is reached when the drag force
          equals the force of gravity.
        </li>
        <li>
          Simple models can be solved exactly using techniques like{" "}
          <KeyTerm>separation of variables</KeyTerm>.
        </li>
        <li>
          Complex models require approximation with{" "}
          <KeyTerm>numerical methods</KeyTerm> like Forward Euler and RK4.
        </li>
        <li>
          Higher-order numerical methods provide better accuracy for a given
          timestep.
        </li>
      </ul>
    </Block>,
  ];
  return <Lesson slides={slides} />;
}
