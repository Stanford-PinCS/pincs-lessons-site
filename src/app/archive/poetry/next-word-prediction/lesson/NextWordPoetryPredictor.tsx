"use client";
import React, { useState, useEffect } from "react";
import _ from "lodash";

const NextWordPoetryPredictor = () => {
  // Core states
  const [poem, setPoem] = useState<any>(null);
  const [options, setOptions] = useState<any[]>([]);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const [showProbabilities, setShowProbabilities] = useState(false);

  // Poetry selection
  const poems = [
    {
      title: "The Road Not Taken",
      author: "Robert Frost",
      excerpt: "Two roads diverged in a yellow",
      nextWord: "wood",
      options: ["wood", "field", "path", "town"],
      probabilities: [0.65, 0.15, 0.15, 0.05],
      explanation:
        "The phrase 'Two roads diverged in a yellow wood' is the famous opening line of this poem. LLMs learn such patterns from training data, making 'wood' highly probable.",
      pattern: "Common collocation (yellow + wood) in famous poetry",
    },
    {
      title: "Hope is the thing with feathers",
      author: "Emily Dickinson",
      excerpt: "Hope is the thing with",
      nextWord: "feathers",
      options: ["feathers", "wings", "dreams", "light"],
      probabilities: [0.7, 0.15, 0.1, 0.05],
      explanation:
        "This is the opening line of Dickinson's poem. An LLM would assign high probability to 'feathers' after seeing this context, especially if it has encountered this poem during training.",
      pattern: "Title phrase recognition and memorization",
    },
    {
      title: "Invictus",
      author: "William Ernest Henley",
      excerpt: "I am the master of my",
      nextWord: "fate",
      options: ["fate", "destiny", "life", "mind"],
      probabilities: [0.6, 0.2, 0.15, 0.05],
      explanation:
        "This line continues '...I am the captain of my soul.' LLMs learn these famous couplets and can predict their completion with high probability.",
      pattern: "Famous poetic phrase completion",
    },
    {
      title: "Sonnet 18",
      author: "William Shakespeare",
      excerpt: "Shall I compare thee to a summer's",
      nextWord: "day",
      options: ["day", "night", "dream", "rose"],
      probabilities: [0.8, 0.08, 0.07, 0.05],
      explanation:
        "Shakespeare's famous sonnet opening is so well-known that 'day' would have an extremely high probability in any language model trained on English literature.",
      pattern: "Extremely common collocation in famous poetry",
    },
    {
      title: "Fire and Ice",
      author: "Robert Frost",
      excerpt: "Some say the world will end in",
      nextWord: "fire",
      options: ["fire", "ice", "darkness", "silence"],
      probabilities: [0.55, 0.25, 0.1, 0.1],
      explanation:
        "This is the opening of Frost's poem. The next line contains 'ice' as a contrast, which is why it might have a somewhat high probability too.",
      pattern: "Title word recognition and emphasis",
    },
  ];

  // Selection a random poem when component mounts
  useEffect(() => {
    selectRandomPoem();
  }, []);

  const selectRandomPoem = () => {
    const randomPoem = poems[Math.floor(Math.random() * poems.length)];
    setPoem(randomPoem);
    setOptions(_.shuffle(randomPoem.options));
    setSelectedOption(null);
    setIsCorrect(false);
    setShowExplanation(false);
  };

  const handleOptionSelect = (option: string) => {
    setSelectedOption(option);
    setIsCorrect(option === poem.nextWord);
    setShowExplanation(true);
  };

  const getOptionProbability = (option: string) => {
    const index = poem.options.indexOf(option);
    return index >= 0 ? poem.probabilities[index] : 0;
  };

  // Visual representation of LLM prediction process
  const renderPredictionVisualization = () => (
    <div className="mb-6 mt-8">
      <h2 className="text-lg font-semibold text-center mb-4 text-indigo-700">
        How LLMs Predict the Next Word
      </h2>

      <div className="relative h-60">
        {/* Step 1: Input */}
        <div className="absolute left-4 top-0 w-32 h-24 flex items-center justify-center bg-indigo-100 rounded-lg shadow">
          <div className="text-center">
            <div className="text-xs font-medium text-indigo-700 mb-1">
              STEP 1
            </div>
            <div className="font-medium">Input Text</div>
            <div className="text-xs mt-1">
              "Two roads diverged in a yellow..."
            </div>
          </div>
        </div>
        <div className="absolute left-40 top-12 w-24 h-0 border-t-2 border-dashed border-indigo-400">
          <div className="absolute -right-4 -top-3">→</div>
        </div>

        {/* Step 2: Pattern Matching */}
        <div className="absolute left-64 top-0 w-48 h-24 flex items-center justify-center bg-indigo-100 rounded-lg shadow">
          <div className="text-center">
            <div className="text-xs font-medium text-indigo-700 mb-1">
              STEP 2
            </div>
            <div className="font-medium">Pattern Matching</div>
            <div className="text-xs mt-1">
              Search for similar patterns in training data
            </div>
          </div>
        </div>
        <div className="absolute left-88 top-36 w-24 h-16 border-l-2 border-t-2 border-dashed border-indigo-400">
          <div className="absolute -bottom-3 -left-3">↓</div>
        </div>

        {/* Step 3: Probability Calculation */}
        <div className="absolute left-64 top-36 w-48 h-24 flex items-center justify-center bg-indigo-100 rounded-lg shadow">
          <div className="text-center">
            <div className="text-xs font-medium text-indigo-700 mb-1">
              STEP 3
            </div>
            <div className="font-medium">Calculate Probabilities</div>
            <div className="text-xs mt-1">Rank possible next words</div>
          </div>
        </div>
        <div className="absolute left-40 top-48 w-24 h-0 border-t-2 border-dashed border-indigo-400">
          <div className="absolute -left-4 -top-3">←</div>
        </div>

        {/* Step 4: Output */}
        <div className="absolute left-4 top-36 w-32 h-24 flex items-center justify-center bg-green-100 rounded-lg shadow">
          <div className="text-center">
            <div className="text-xs font-medium text-green-700 mb-1">
              STEP 4
            </div>
            <div className="font-medium">Prediction</div>
            <div className="text-xs mt-1">
              wood (65%)
              <br />
              field (15%)
              <br />
              path (15%)
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // Visual representation of poetic patterns
  const renderPatternVisual = () => (
    <div className="my-8 bg-gray-50 p-4 rounded-lg">
      <h2 className="text-lg font-semibold text-center mb-4 text-indigo-700">
        Poetic Patterns LLMs Learn
      </h2>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white p-3 rounded shadow">
          <h3 className="text-sm font-bold text-indigo-600 mb-2">
            1. Rhyme Patterns
          </h3>
          <div className="flex flex-col items-center">
            <div className="text-xs mb-1">
              words that{" "}
              <span className="font-bold text-indigo-600">sound alike</span>{" "}
              often appear at line ends
            </div>
            <div className="font-mono text-sm mb-2">
              Shall I compare thee to a summer's{" "}
              <span className="font-bold text-red-500">day</span>?<br />
              Thou art more lovely and more{" "}
              <span className="font-bold text-red-500">temperate</span>.
            </div>
            <div className="text-xs italic">
              LLMs assign higher probability to rhyming words in poetry
            </div>
          </div>
        </div>

        <div className="bg-white p-3 rounded shadow">
          <h3 className="text-sm font-bold text-indigo-600 mb-2">
            2. Meter & Rhythm
          </h3>
          <div className="flex flex-col items-center">
            <div className="text-xs mb-1">
              predictable{" "}
              <span className="font-bold text-indigo-600">stress patterns</span>{" "}
              in each line
            </div>
            <div className="font-mono text-sm mb-2">
              <span className="text-red-500 font-bold">/</span> ×{" "}
              <span className="text-red-500 font-bold">/</span> ×{" "}
              <span className="text-red-500 font-bold">/</span> ×{" "}
              <span className="text-red-500 font-bold">/</span> ×{" "}
              <span className="text-red-500 font-bold">/</span>
              <br />
              "To <span className="text-red-500 font-bold">BE</span> or{" "}
              <span className="text-red-500 font-bold">NOT</span> to{" "}
              <span className="text-red-500 font-bold">BE</span> that{" "}
              <span className="text-red-500 font-bold">IS</span> the{" "}
              <span className="text-red-500 font-bold">QUES</span>tion"
            </div>
            <div className="text-xs italic">
              LLMs can learn syllable counts and stress patterns
            </div>
          </div>
        </div>

        <div className="bg-white p-3 rounded shadow">
          <h3 className="text-sm font-bold text-indigo-600 mb-2">
            3. Common Collocations
          </h3>
          <div className="flex flex-col items-center">
            <div className="text-xs mb-1">
              words that{" "}
              <span className="font-bold text-indigo-600">
                frequently appear together
              </span>
            </div>
            <div className="font-mono text-sm mb-2">
              "Two roads diverged in a{" "}
              <span className="text-red-500 font-bold">yellow wood</span>"<br />
              "Shall I compare thee to a{" "}
              <span className="text-red-500 font-bold">summer's day</span>"
            </div>
            <div className="text-xs italic">
              LLMs learn these pairings from frequency in the training data
            </div>
          </div>
        </div>

        <div className="bg-white p-3 rounded shadow">
          <h3 className="text-sm font-bold text-indigo-600 mb-2">
            4. Famous Lines
          </h3>
          <div className="flex flex-col items-center">
            <div className="text-xs mb-1">
              <span className="font-bold text-indigo-600">
                memorized completions
              </span>{" "}
              of well-known phrases
            </div>
            <div className="font-mono text-sm mb-2">
              "To be or not to be,{" "}
              <span className="text-red-500 font-bold">
                that is the question
              </span>
              "<br />
              "I think,{" "}
              <span className="text-red-500 font-bold">therefore I am</span>"
            </div>
            <div className="text-xs italic">
              LLMs essentially memorize these patterns verbatim
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  if (!poem) return <div>Loading...</div>;

  return (
    <div className="max-w-3xl mx-auto p-4 bg-gray-100 min-h-screen">
      <header className="text-center mb-6">
        <h1 className="text-2xl font-bold text-indigo-800">
          Next Word Poetry Predictor
        </h1>
        <p className="text-sm text-gray-600">
          Discover how language models predict poetry
        </p>
      </header>

      <div className="bg-white p-6 rounded-lg shadow-lg mb-6">
        <div className="mb-4">
          <h2 className="text-lg font-semibold mb-2">
            Can you predict like an AI?
          </h2>
          <p className="text-sm text-gray-600 mb-4">
            Select what you think is the next word in this famous poem excerpt.
            Then see if your prediction matches what a language model would
            predict!
          </p>

          <div className="bg-indigo-50 p-4 rounded-lg mb-4">
            <p className="font-medium mb-1">
              {poem.title} by {poem.author}
            </p>
            <p className="text-lg font-serif">
              "{poem.excerpt}{" "}
              <span className="text-indigo-600 font-bold">_____</span>"
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 mb-6">
          {options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleOptionSelect(option)}
              disabled={selectedOption !== null}
              className={`p-3 rounded-lg font-medium transition
                ${
                  selectedOption === option
                    ? option === poem.nextWord
                      ? "bg-green-100 border-2 border-green-500"
                      : "bg-red-100 border-2 border-red-500"
                    : "bg-indigo-50 hover:bg-indigo-100 border-2 border-transparent"
                }
                ${
                  selectedOption !== null &&
                  option === poem.nextWord &&
                  selectedOption !== poem.nextWord
                    ? "bg-green-50 border-2 border-green-500"
                    : ""
                }
              `}
            >
              {option}
              {showProbabilities && (
                <div className="text-xs mt-1 text-gray-500">
                  {Math.round(getOptionProbability(option) * 100)}% probability
                </div>
              )}
            </button>
          ))}
        </div>

        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <input
              type="checkbox"
              id="showProb"
              checked={showProbabilities}
              onChange={() => setShowProbabilities(!showProbabilities)}
              className="mr-2"
            />
            <label htmlFor="showProb" className="text-sm text-gray-600">
              Show AI probabilities
            </label>
          </div>

          <button
            onClick={selectRandomPoem}
            className="bg-indigo-600 text-white px-4 py-2 rounded font-semibold hover:bg-indigo-700 transition"
          >
            Try Another Poem
          </button>
        </div>
      </div>

      {showExplanation && (
        <div
          className={`p-4 rounded-lg mb-6 ${
            isCorrect ? "bg-green-50" : "bg-indigo-50"
          }`}
        >
          <h2 className="font-semibold mb-2">
            {isCorrect
              ? "You predicted like an AI!"
              : "The AI predicted differently"}
          </h2>
          <p className="text-sm mb-3">
            <strong>Correct answer:</strong> "{poem.excerpt}{" "}
            <span className="font-bold">{poem.nextWord}</span>"
          </p>

          <div className="mb-3">
            <h3 className="text-sm font-semibold">
              Why the AI predicted this:
            </h3>
            <p className="text-sm">{poem.explanation}</p>
          </div>

          <div className="bg-white p-3 rounded">
            <h3 className="text-sm font-semibold text-indigo-700">
              Pattern recognized:
            </h3>
            <p className="text-sm">{poem.pattern}</p>
          </div>
        </div>
      )}

      {renderPredictionVisualization()}

      {renderPatternVisual()}

      <div className="bg-indigo-50 p-4 rounded-lg mb-6">
        <h2 className="font-semibold mb-2">Key Takeaways</h2>
        <ul className="list-disc pl-5 text-sm space-y-1">
          <li>
            LLMs predict words based on statistical patterns in their training
            data
          </li>
          <li>
            Poetry has strongly predictable patterns that LLMs can recognize
          </li>
          <li>
            Word prediction is probability-based, not "understanding" in the
            human sense
          </li>
          <li>
            The more common a pattern appears in training data, the more
            confident the prediction
          </li>
        </ul>
      </div>

      <footer className="text-center text-gray-500 text-xs">
        <p>
          This interactive demonstration shows a simplified version of how
          language models predict text.
        </p>
      </footer>
    </div>
  );
};

export default NextWordPoetryPredictor;
