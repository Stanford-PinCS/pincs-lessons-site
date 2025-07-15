import { useState } from "react";
import { useEffect } from "react";

const TextQuizQuestion = ({
  question,
  pattern,
  placeholder,
}: {
  question: React.ReactNode;
  pattern: string; // regex string
  placeholder: string;
}) => {
  const [userAnswer, setUserAnswer] = useState("");
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      // Remove all whitespace from both user input and pattern
      const answerNoSpaces = userAnswer.replace(/\s+/g, "");
      const patternNoSpaces = pattern.replace(/\s+/g, "");
      const regex = new RegExp(patternNoSpaces);
      setIsCorrect(regex.test(answerNoSpaces));
    }
  };

  return (
    <div>
      <p>{question}</p>
      <input
        type="text"
        placeholder={placeholder}
        value={userAnswer}
        onChange={(e) => setUserAnswer(e.target.value)}
        onKeyDown={handleKeyDown}
        style={{ width: "50%" }}
      />
      {isCorrect === true && (
        <p style={{ color: "green", fontWeight: "bold" }}>Correct!</p>
      )}
      {isCorrect === false && (
        <p style={{ color: "red", fontWeight: "bold" }}>Incorrect!</p>
      )}
    </div>
  );
};

export default TextQuizQuestion;
