"use client";
import React, { useState, useEffect, useRef } from "react";

export const FractalsRecursion = () => {
  const [fractalType, setFractalType] = useState("circle");
  const [recursionDepth, setRecursionDepth] = useState(5);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const canvasWidth = 600;
  const canvasHeight = 500;

  // Draw the canvas when parameters change
  useEffect(() => {
    drawFractal();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fractalType, recursionDepth]);

  const drawFractal = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");

    if (!ctx) return null;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = "#FFFFFF";
    ctx.lineWidth = 1;

    switch (fractalType) {
      case "circle":
        drawCircleFractal(ctx);
        break;
      case "tree":
        drawFractalTree(ctx);
        break;
      case "square":
        drawSquareFractal(ctx);
        break;
      default:
        drawCircleFractal(ctx);
    }
  };

  // Circle Fractal
  const drawCircleFractal = (ctx: CanvasRenderingContext2D) => {
    const centerX = canvasWidth / 2;
    const centerY = canvasHeight / 2;
    const radius = canvasHeight * 0.4;

    drawCircle(ctx, centerX, centerY, radius);
    circleRecursion(ctx, centerX, centerY, radius, recursionDepth);
  };

  const drawCircle = (
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    radius: number
  ) => {
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.stroke();
  };

  const circleRecursion = (
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    radius: number,
    depth: number
  ) => {
    if (depth <= 0) return;

    // Draw three smaller circles
    const newRadius = radius / 2;
    // Top circle
    drawCircle(ctx, x, y - radius + newRadius, newRadius);
    circleRecursion(ctx, x, y - radius + newRadius, newRadius, depth - 1);

    // Bottom left circle
    const dx = newRadius * Math.cos(Math.PI / 6);
    const dy = newRadius * Math.sin(Math.PI / 6);
    drawCircle(ctx, x - dx, y + radius - dy, newRadius);
    circleRecursion(ctx, x - dx, y + radius - dy, newRadius, depth - 1);

    // Bottom right circle
    drawCircle(ctx, x + dx, y + radius - dy, newRadius);
    circleRecursion(ctx, x + dx, y + radius - dy, newRadius, depth - 1);
  };

  // Fractal Tree
  const drawFractalTree = (ctx: CanvasRenderingContext2D) => {
    const startX = canvasWidth / 2;
    const startY = canvasHeight * 0.9;
    const length = canvasHeight * 0.3;
    const angle = -Math.PI / 2; // Starting angle (upward)

    ctx.beginPath();
    ctx.moveTo(startX, startY);
    ctx.lineTo(startX, startY - length);
    ctx.stroke();

    treeRecursion(
      ctx,
      startX,
      startY - length,
      length * 0.67,
      angle,
      recursionDepth
    );
  };

  const treeRecursion = (
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    length: number,
    angle: number,
    depth: number
  ) => {
    if (depth <= 0) return;

    // Branch angles
    const branches = 2;
    const angleSpread = Math.PI / 4; // 45 degrees

    for (let i = 0; i < branches; i++) {
      // Calculate branch angle (alternating left and right from center)
      const branchAngle = angle - angleSpread / 2 + i * angleSpread;

      // Calculate end point
      const endX = x + length * Math.cos(branchAngle);
      const endY = y + length * Math.sin(branchAngle);

      // Draw branch
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(endX, endY);
      ctx.stroke();

      // Recurse
      treeRecursion(ctx, endX, endY, length * 0.67, branchAngle, depth - 1);
    }
  };

  // Square Fractal
  const drawSquareFractal = (ctx: CanvasRenderingContext2D) => {
    const size = canvasHeight * 0.7;
    const startX = (canvasWidth - size) / 2;
    const startY = (canvasHeight - size) / 2;

    drawSquare(ctx, startX, startY, size);
    squareRecursion(ctx, startX, startY, size, recursionDepth);
  };

  const drawSquare = (
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    size: number
  ) => {
    ctx.beginPath();
    ctx.rect(x, y, size, size);
    ctx.stroke();
  };

  const squareRecursion = (
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    size: number,
    depth: number
  ) => {
    if (depth <= 0) return;

    const newSize = size / 3;

    // Draw 8 squares (skip the center)
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        // Skip the center square
        if (i === 1 && j === 1) continue;

        const newX = x + j * newSize;
        const newY = y + i * newSize;

        drawSquare(ctx, newX, newY, newSize);
        squareRecursion(ctx, newX, newY, newSize, depth - 1);
      }
    }
  };

  return (
    <div className="bg-gray-900 p-6 rounded-xl shadow-xl text-white">
      <h2 className="text-2xl font-bold mb-4 text-center text-blue-300">
        Simple Fractal Generator
      </h2>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Canvas */}
        <div className="bg-black rounded-lg overflow-hidden">
          <canvas
            ref={canvasRef}
            width={canvasWidth}
            height={canvasHeight}
            className="border border-gray-700"
          />
        </div>

        {/* Controls */}
        <div className="flex flex-col gap-4 p-4 bg-gray-800 rounded-lg">
          <div>
            <label className="block text-sm font-medium mb-1">
              Fractal Type
            </label>
            <select
              value={fractalType}
              onChange={(e) => {
                setFractalType(e.target.value);
              }}
              className="w-full bg-gray-700 text-white px-3 py-2 rounded"
            >
              <option value="circle">Circle Fractal</option>
              <option value="tree">Fractal Tree</option>
              <option value="square">Square Fractal</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Recursion Depth: {recursionDepth}
            </label>
            <input
              type="range"
              min="0"
              max="7"
              value={recursionDepth}
              onChange={(e) => setRecursionDepth(parseInt(e.target.value))}
              className="w-full"
            />
            <div className="text-xs text-gray-400 mt-1">
              Controls how many times the pattern repeats itself
            </div>
          </div>

          <div className="mt-6">
            <h3 className="text-sm font-bold mb-1">
              What&apos;s Going On Here?
            </h3>
            <p className="text-xs text-gray-400">
              Think of recursion like Russian nesting dolls — it&apos;s the same
              pattern repeated inside itself, getting smaller each time! When
              you increase the &quot;Recursion Depth&quot; slider, you&apos;re
              telling the computer &quot;repeat this pattern X more times.&quot;
              It&apos;s like zooming in on a magical picture that contains
              copies of itself!
            </p>
          </div>

          <div className="mt-4">
            <h3 className="text-sm font-bold mb-1">Why This is Amazing:</h3>
            <ul className="text-xs text-gray-400 space-y-1">
              <li>
                • Look around you! Tree branches, snowflakes, and even clouds
                follow these patterns
              </li>
              <li>
                • With just a few simple steps, we can create endless complexity
              </li>
              <li>
                • Computer scientists use this &quot;repeat yourself&quot; trick
                to solve all kinds of problems
              </li>
              <li>
                • The deeper you go, the more fascinating details you discover!
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FractalsRecursion;
