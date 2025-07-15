import React from "react";

const ClimbingAnimation = () => {
  return (
    <div className="flex items-center justify-center bg-white p-6 rounded-xl shadow-lg my-8">
      <div className="relative h-72 w-24">
        {/* Ladder Rails */}
        <div className="absolute left-2 top-0 h-full w-2 bg-yellow-600 rounded"></div>
        <div className="absolute right-2 top-0 h-full w-2 bg-yellow-600 rounded"></div>

        {/* Ladder Rungs */}
        <div className="absolute h-full w-full">
          {Array.from({ length: 7 }).map((_, i) => (
            <div
              key={i}
              className="absolute left-1/2 -translate-x-1/2 w-16 h-1 bg-yellow-700 rounded"
              style={{ top: `${i * 2.5 + 1}rem` }}
            ></div>
          ))}
        </div>

        {/* Stick Figure */}
        <div
          className="absolute left-1/2 w-10 h-20 animate-climb"
          style={{ transform: "translateX(-50%)" }}
        >
          <svg viewBox="0 0 40 80" className="w-full h-full">
            {/* Head */}
            <circle cx="20" cy="10" r="8" fill="#4A90E2" />
            {/* Body */}
            <line
              x1="20"
              y1="18"
              x2="20"
              y2="50"
              stroke="#4A90E2"
              strokeWidth="4"
            />
            {/* Arms */}
            <line
              x1="20"
              y1="30"
              x2="5"
              y2="45"
              stroke="#4A90E2"
              strokeWidth="4"
            />
            <line
              x1="20"
              y1="30"
              x2="35"
              y2="45"
              stroke="#4A90E2"
              strokeWidth="4"
            />
            {/* Legs */}
            <line
              x1="20"
              y1="50"
              x2="5"
              y2="65"
              stroke="#4A90E2"
              strokeWidth="4"
            />
            <line
              x1="20"
              y1="50"
              x2="35"
              y2="65"
              stroke="#4A90E2"
              strokeWidth="4"
            />
          </svg>
        </div>
      </div>

      <style jsx>{`
        @keyframes climb {
          0% {
            transform: translate(-50%, 200px);
          }
          100% {
            transform: translate(-50%, 00px);
          }
        }
        .animate-climb {
          animation: climb 4s ease-in-out infinite alternate;
        }
      `}</style>
    </div>
  );
};

export default ClimbingAnimation;
