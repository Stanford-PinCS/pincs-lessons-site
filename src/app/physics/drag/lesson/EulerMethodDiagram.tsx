"use client";
import React from "react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  ReferenceLine,
  Label,
} from "recharts";

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
      <ResponsiveContainer width="100%" height="300px" aspect={2}>
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
