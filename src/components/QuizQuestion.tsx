"use client";

import { ReactNode, useState } from "react";

interface AnswerChoice {
  text: string | ReactNode;
  isCorrect: boolean;
  explanation: string | ReactNode;
}

interface QuizQuestionProps {
  question: string | ReactNode;
  choices: AnswerChoice[];
}

const QuizQuestion = ({ question, choices }: QuizQuestionProps) => {
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);

  const handleAnswerSelect = (index: number) => {
    setSelectedAnswer(index);
    setShowFeedback(true);
  };

  return (
    <div className="space-y-6">
      <p className="text-lg font-medium mb-4">{question}</p>
      <div className="space-y-3">
        {choices.map((choice, index) => (
          <button
            key={index}
            onClick={() => handleAnswerSelect(index)}
            className={`w-full p-4 text-left rounded-lg border transition-all
              ${
                selectedAnswer === index
                  ? choice.isCorrect
                    ? "bg-green-100 border-green-500"
                    : "border-dashed bg-red-100 border-red-700"
                  : "border-gray-300 hover:border-blue-500"
              }`}
          >
            <div className="flex items-center">
              <span className="mr-3 font-medium">
                {String.fromCharCode(65 + index)}.
              </span>
              <span>{choice.text}</span>
            </div>
            {showFeedback && selectedAnswer === index && (
              <p
                className={`mt-2 text-sm ${
                  choice.isCorrect ? "text-green-600" : "text-red-600"
                }`}
              >
                {choice.explanation}
              </p>
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuizQuestion;
