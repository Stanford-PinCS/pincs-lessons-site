"use client";
import React, { useState, useEffect, useRef } from "react";

const CellHealthVisualizer = () => {
  // State for input parameters
  const [nutrition, setNutrition] = useState(50);
  const [oxygen, setOxygen] = useState(50);
  const [pH, setPH] = useState(50);

  // State for visualization
  const [cellHealth, setCellHealth] = useState(true);

  // Canvas reference
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // The main function that determines cell health
  const isHealthy = (nutrition: number, oxygen: number, pH: number) => {
    // Each parameter needs to be in a healthy range
    const goodNutrition = nutrition >= 40;
    const goodOxygen = oxygen >= 30;
    const goodPH = pH >= 30 && pH <= 70;

    // The cell is healthy only if ALL conditions are met
    return goodNutrition && goodOxygen && goodPH;
  };

  // Run the simulation
  const runSimulation = () => {
    const healthy = isHealthy(nutrition, oxygen, pH);
    setCellHealth(healthy);
    // Redraw the cell now that we have a new health status
    drawCell(healthy);
  };

  // Function to draw the cell
  const drawCell = (isHealthy: boolean) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const width = canvas.width;
    const height = canvas.height;
    const centerX = width / 2;
    const centerY = height / 2;

    // Clear canvas with light background
    ctx.fillStyle = "#f8f9fa";
    ctx.fillRect(0, 0, width, height);

    // Draw cell membrane
    const cellRadius = width * 0.3;
    ctx.beginPath();
    ctx.arc(centerX, centerY, cellRadius, 0, Math.PI * 2);

    // Set cell color based on health
    const cellColor = isHealthy
      ? "rgba(100, 200, 120, 0.7)"
      : "rgba(230, 100, 100, 0.7)";
    const borderColor = isHealthy
      ? "rgba(50, 150, 70, 0.9)"
      : "rgba(180, 50, 50, 0.9)";

    // Fill cell
    ctx.fillStyle = cellColor;
    ctx.fill();

    // Cell membrane
    ctx.strokeStyle = borderColor;
    ctx.lineWidth = 4;
    ctx.stroke();

    // Draw nucleus
    const nucleusRadius = cellRadius * 0.4;
    ctx.beginPath();
    ctx.arc(centerX, centerY, nucleusRadius, 0, Math.PI * 2);
    ctx.fillStyle = isHealthy
      ? "rgba(70, 160, 90, 0.9)"
      : "rgba(200, 70, 70, 0.9)";
    ctx.fill();
    ctx.strokeStyle = isHealthy
      ? "rgba(40, 130, 60, 1)"
      : "rgba(170, 40, 40, 1)";
    ctx.lineWidth = 2;
    ctx.stroke();

    // Draw some organelles (mitochondria)
    for (let i = 0; i < 5; i++) {
      const angle = Math.random() * Math.PI * 2;
      const distance = Math.random() * cellRadius * 0.6;
      const x = centerX + Math.cos(angle) * distance;
      const y = centerY + Math.sin(angle) * distance;

      // Skip if too close to nucleus
      if (
        Math.sqrt(Math.pow(x - centerX, 2) + Math.pow(y - centerY, 2)) <
        nucleusRadius
      ) {
        continue;
      }

      // Draw mitochondrion
      const size = Math.random() * 7 + 8;
      ctx.beginPath();
      ctx.ellipse(x, y, size, size / 2, angle, 0, Math.PI * 2);
      ctx.fillStyle = isHealthy
        ? "rgba(130, 200, 160, 0.9)"
        : "rgba(210, 130, 130, 0.9)";
      ctx.fill();
      ctx.strokeStyle = isHealthy
        ? "rgba(100, 170, 130, 1)"
        : "rgba(180, 100, 100, 1)";
      ctx.lineWidth = 1;
      ctx.stroke();
    }

    // Draw some small vacuoles
    for (let i = 0; i < 8; i++) {
      const angle = Math.random() * Math.PI * 2;
      const distance = Math.random() * cellRadius * 0.7;
      const x = centerX + Math.cos(angle) * distance;
      const y = centerY + Math.sin(angle) * distance;

      // Skip if too close to nucleus
      if (
        Math.sqrt(Math.pow(x - centerX, 2) + Math.pow(y - centerY, 2)) <
        nucleusRadius
      ) {
        continue;
      }

      // Draw vacuole
      const vacuoleSize = Math.random() * 5 + 4;
      ctx.beginPath();
      ctx.arc(x, y, vacuoleSize, 0, Math.PI * 2);
      ctx.fillStyle = isHealthy
        ? "rgba(180, 230, 210, 0.9)"
        : "rgba(230, 180, 180, 0.9)";
      ctx.fill();
    }

    // Label
    ctx.fillStyle = "#333";
    ctx.font = "bold 16px Arial";
    ctx.textAlign = "center";
    ctx.fillText(
      isHealthy ? "HEALTHY" : "UNHEALTHY",
      centerX,
      centerY + cellRadius + 30
    );

    // Feedback
    ctx.font = "14px Arial";
    if (!isHealthy) {
      const issues = [];
      if (nutrition < 40) issues.push("Low nutrition");
      if (oxygen < 30) issues.push("Low oxygen");
      if (pH < 30) issues.push("pH too acidic");
      if (pH > 70) issues.push("pH too alkaline");

      ctx.fillText(issues.join(", "), centerX, centerY + cellRadius + 55);
    }
  };

  // Initialize the cell on first render
  useEffect(() => {
    drawCell(cellHealth);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg">
      <h2 className="text-xl font-bold mb-3 text-center text-blue-600">
        Cell Health Visualizer
      </h2>

      <div className="bg-blue-50 p-3 rounded-lg mb-4 text-sm">
        <p className="font-semibold mb-1">Function in Computer Science:</p>
        <p className="mb-2">
          A <span className="font-mono bg-gray-100 px-1">function</span> is a
          reusable block of code that performs a specific task. It typically
          takes <span className="font-mono bg-gray-100 px-1">inputs</span>{" "}
          (parameters), processes them, and returns an{" "}
          <span className="font-mono bg-gray-100 px-1">output</span>.
        </p>
        <p>
          Our <span className="font-mono bg-gray-100 px-1">isHealthy()</span>{" "}
          function takes three parameters and returns a boolean (true/false)
          value based on whether all health conditions are met.
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Canvas */}
        <div className="bg-gray-50 rounded-lg overflow-hidden shadow border">
          <canvas ref={canvasRef} width={300} height={300} className="w-full" />
        </div>

        {/* Controls */}
        <div className="flex flex-col gap-4">
          <div className="code-block bg-gray-100 p-3 rounded font-mono text-sm mb-2">
            <div className="text-blue-700">
              function isHealthy(nutrition, oxygen, pH) {"{"}
            </div>
            <div className="ml-4 text-gray-600">
              {`// Check if parameters are in healthy ranges`}
            </div>
            <div className="ml-4">
              const goodNutrition = nutrition &gt;= 40;
            </div>
            <div className="ml-4">const goodOxygen = oxygen &gt;= 30;</div>
            <div className="ml-4">
              const goodPH = pH &gt;= 30 && pH &lt;= 70;
            </div>
            <div className="ml-4 text-gray-600">
              {`// Return true only if ALL conditions are true`}
            </div>
            <div className="ml-4">
              return goodNutrition && goodOxygen && goodPH;
            </div>
            <div className="text-blue-700">{"}"}</div>
          </div>

          <div className="mb-3">
            <label className="block text-sm font-medium mb-1">
              Nutrition: {nutrition}%
            </label>
            <input
              type="range"
              min="0"
              max="100"
              value={nutrition}
              onChange={(e) => setNutrition(parseInt(e.target.value))}
              className="w-full"
            />
            <div className="text-xs text-gray-500 mt-1">
              {nutrition < 40 ? "⚠️ Too low" : "✓ Good level"}
            </div>
          </div>

          <div className="mb-3">
            <label className="block text-sm font-medium mb-1">
              Oxygen: {oxygen}%
            </label>
            <input
              type="range"
              min="0"
              max="100"
              value={oxygen}
              onChange={(e) => setOxygen(parseInt(e.target.value))}
              className="w-full"
            />
            <div className="text-xs text-gray-500 mt-1">
              {oxygen < 30 ? "⚠️ Too low" : "✓ Good level"}
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">
              pH Level: {pH}
            </label>
            <input
              type="range"
              min="0"
              max="100"
              value={pH}
              onChange={(e) => setPH(parseInt(e.target.value))}
              className="w-full"
            />
            <div className="text-xs text-gray-500 mt-1">
              {pH < 30
                ? "⚠️ Too acidic"
                : pH > 70
                ? "⚠️ Too alkaline"
                : "✓ Good range"}
            </div>
          </div>

          <button
            onClick={runSimulation}
            className="px-4 py-2 rounded bg-blue-600 hover:bg-blue-700 text-white font-medium"
          >
            Run Function
          </button>

          <div className="mt-4 bg-yellow-50 p-2 rounded border border-yellow-200 text-sm">
            <p>
              <strong>Try:</strong> Set parameters to make the cell healthy or
              unhealthy, then click &quot;Run Function&quot;.
            </p>
            <p className="mt-1">
              <strong>Learn:</strong> This shows how a function evaluates
              multiple conditions to determine a single output.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CellHealthVisualizer;
