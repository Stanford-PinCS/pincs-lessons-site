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
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  const handleChange = (idx: number) => {
    setSelected((prev) => prev.map((val, i) => (i === idx ? !val : val)));
  };

  const handleSubmit = () => {
    const correct = selected.every((val, i) => val === choices[i].isCorrect);
    setIsCorrect(correct);
    if (correct) setSubmitted(true);
  };

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
                  disabled={submitted} // Only disable if correct
                />
                &nbsp;&nbsp;{" "}
                <span className="mr-3 font-medium">
                  {String.fromCharCode(65 + idx)}.
                </span>
                {choice.text}
              </label>
            </div>
            {isCorrect === true &&
              submitted &&
              selected[idx] &&
              choice.explanation && (
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
      {isCorrect === false && (
        <div style={{ fontWeight: "bold", color: "red" }}>
          Incorrect. Try again!
        </div>
      )}
      {isCorrect === true && submitted && (
        <div style={{ fontWeight: "bold", color: "green" }}>Correct!</div>
      )}
    </div>
  );
};

export default MultiSelectQuizQuestion;
