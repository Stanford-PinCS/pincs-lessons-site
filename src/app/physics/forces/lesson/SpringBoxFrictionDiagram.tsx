"use client";
import React, { useState, useEffect, useRef } from "react";

const SpringBoxFrictionDiagram = () => {
  const equilibriumPosition = 200;
  const [isPlaying, setIsPlaying] = useState(false);
  const [boxPosition, setBoxPosition] = useState(equilibriumPosition);
  const animationRef = useRef<number | undefined>(undefined);
  const startTimeRef = useRef<number | null>(null);

  const amplitude = 80; // Initial stretch distance
  const damping = 0.5; // How quickly the oscillation dies out
  const frequency = 3; // How fast the oscillation is

  const animate = (time: number) => {
    if (startTimeRef.current === null) {
      startTimeRef.current = time;
    }
    const elapsedTime = (time - startTimeRef.current) / 1000; // in seconds

    const newPosition =
      equilibriumPosition +
      amplitude *
        Math.exp(-damping * elapsedTime) *
        Math.cos(frequency * elapsedTime);

    setBoxPosition(newPosition);

    if (Math.exp(-damping * elapsedTime) * amplitude > 0.5) {
      animationRef.current = requestAnimationFrame(animate);
    } else {
      setIsPlaying(false);
      setBoxPosition(equilibriumPosition);
    }
  };

  useEffect(() => {
    if (isPlaying) {
      startTimeRef.current = null;
      animationRef.current = requestAnimationFrame(animate);
    } else {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
        animationRef.current = undefined;
      }
    }

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isPlaying]);

  const handlePlayStop = () => {
    setIsPlaying(!isPlaying);
  };

  const generateSpringPath = (endX: number) => {
    const startX = 50;
    const y = 30;
    const springRadius = 10;
    const coils = 12;

    const length = endX - startX;
    if (length <= 1) {
      return `M ${startX} ${y} L ${endX} ${y}`;
    }

    let pathData = `M ${startX} ${y}`;
    const segmentCount = coils * 2;
    const segmentLength = length / segmentCount;

    for (let i = 0; i < segmentCount; i++) {
      const isUp = i % 2 === 0;
      pathData += ` L ${startX + segmentLength * (i + 0.5)} ${
        y + (isUp ? -springRadius : springRadius)
      }`;
    }
    pathData += ` L ${endX} ${y}`;
    return pathData;
  };

  return (
    <div className="p-4 bg-gray-100 rounded-lg shadow-inner flex flex-col items-center">
      <svg
        viewBox="0 0 400 78"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full"
      >
        {/* Ground */}
        <rect
          x="50"
          y="55"
          width="300"
          height="20"
          fill="#d3d3d3"
          stroke="#8b4513"
          strokeWidth="2"
        />
        <text x="200" y="70" textAnchor="middle" fontSize="14">
          Rough Surface
        </text>

        {/* Wall */}
        <rect x="40" y="5" width="10" height="50" fill="gray" />

        {/* Spring */}
        <path
          d={generateSpringPath(boxPosition - 25)}
          stroke="gray"
          strokeWidth="1.5"
          fill="none"
        />

        {/* Box */}
        <rect
          x={boxPosition - 25}
          y="5"
          width="50"
          height="50"
          fill="hsl(30, 70%, 60%)"
          stroke="black"
          strokeWidth="2"
        />
        <text
          x={boxPosition}
          y="35"
          textAnchor="middle"
          fontSize="12"
          fill="white"
        >
          Box
        </text>
      </svg>
      <div className="mt-4 flex space-x-2">
        <button
          onClick={handlePlayStop}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          {isPlaying ? "Stop" : "Play"}
        </button>
      </div>
    </div>
  );
};

export default SpringBoxFrictionDiagram;
