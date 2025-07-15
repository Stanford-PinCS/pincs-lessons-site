import React, { useState } from "react";

const MultiSelectQuizQuestion = ({
  question,
  choices,
}: {
  question: string;
  choices: { text: string; isCorrect: boolean; explanation?: string }[];
}) => {
  const [selected, setSelected] = useState<boolean[]>(choices.map(() => false));
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (idx: number) => {
    setSelected((prev) => prev.map((val, i) => (i === idx ? !val : val)));
  };

  const handleSubmit = () => {
    setSubmitted(true);
  };

  const isAllCorrect = selected.every((val, i) => val === choices[i].isCorrect);

  return (
    <div>
      <p>{question}</p>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {choices.map((choice, idx) => (
          <li key={idx}>
            <div
              className={`w-full p-4 text-left rounded-lg border transition-all
              ${
                selected[idx]
                  ? "bg-blue-100 border-blue-500"
                  : "border-gray-300 hover:border-blue-500"
              }`}
            >
              <label>
                <input
                  type="checkbox"
                  checked={selected[idx]}
                  onChange={() => handleChange(idx)}
                  disabled={submitted}
                />
                &nbsp;&nbsp;{" "}
                <span className="mr-3 font-medium">
                  {String.fromCharCode(65 + idx)}.
                </span>
                {choice.text}
              </label>
            </div>
            {submitted && selected[idx] && choice.explanation && (
              <div
                style={{
                  fontSize: "0.9em",
                  color: choice.isCorrect ? "green" : "red",
                }}
              >
                {choice.explanation}
              </div>
            )}
          </li>
        ))}
      </ul>
      {!submitted && (
        <button
          style={{
            marginTop: "5px",
            marginBottom: "5px",
            backgroundColor: "blue",
            color: "white",
            padding: "10px",
            borderRadius: "10px",
            cursor: "pointer",
          }}
          onClick={handleSubmit}
        >
          Submit
        </button>
      )}
      {submitted && (
        <div
          style={{ fontWeight: "bold", color: isAllCorrect ? "green" : "red" }}
        >
          {isAllCorrect ? "Correct!" : "Incorrect. Try again!"}
        </div>
      )}
    </div>
  );
};

export default MultiSelectQuizQuestion;
