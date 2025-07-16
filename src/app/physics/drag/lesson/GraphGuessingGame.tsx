"use client";
import { useState } from "react";
import type { FC } from "react";
import Emphasize from "@/components/Emphasize";

interface GraphChoice {
  path: string;
  isCorrect: boolean;
  feedback: string;
}

interface GraphGuessingGameProps {
  title: string;
  explanation: React.ReactNode;
  graphChoices: GraphChoice[];
}

const GraphGuessingGame: FC<GraphGuessingGameProps> = ({
  title,
  explanation,
  graphChoices,
}) => {
  const [selected, setSelected] = useState<number | null>(null);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  const handleSelect = (index: number) => {
    setSelected(index);
    setFeedback(graphChoices[index].feedback);
    setIsCorrect(graphChoices[index].isCorrect);
  };

  return (
    <div className="my-6">
      <h3 className="text-2xl font-bold mb-2">{title}</h3>
      <div className="text-slate-700 mb-4">{explanation}</div>
      <div className="grid grid-cols-4 gap-4">
        {graphChoices.map((graph, index) => (
          <div
            key={index}
            onClick={() => handleSelect(index)}
            className={`border-2 p-2 rounded-lg cursor-pointer transition-all
              ${
                selected === index
                  ? isCorrect
                    ? "border-green-500 bg-green-100"
                    : "border-dashed border-red-500 bg-red-100"
                  : "border-slate-300 hover:border-blue-500"
              }`}
          >
            <svg
              viewBox="0 0 110 110"
              className="w-full h-auto bg-white rounded"
            >
              {/* Axes and Labels */}
              <path
                d="M 10 10 L 10 100 L 100 100"
                stroke="black"
                strokeWidth="1"
                fill="none"
              />
              <text x="55" y="110" textAnchor="middle" fontSize="8">
                Time
              </text>
              <text
                x="0"
                y="55"
                textAnchor="middle"
                fontSize="8"
                transform="rotate(-90, 5, 55)"
              >
                Value
              </text>
              {/* Graph path */}
              <path
                d={graph.path}
                stroke="#3b82f6"
                strokeWidth="3"
                fill="none"
              />
            </svg>
          </div>
        ))}
      </div>
      {feedback && (
        <div
          className={`mt-4 p-3 rounded-lg ${
            isCorrect
              ? "bg-green-100 text-green-800"
              : "bg-red-100 text-red-800"
          }`}
        >
          <Emphasize>{isCorrect ? "Correct!" : "Not quite."}</Emphasize>{" "}
          {feedback}
        </div>
      )}
    </div>
  );
};

export default GraphGuessingGame;
