"use client";
import React, { useState, useEffect } from "react";

export const ProbabilityIntro = () => {
  // Coin flip states
  const [coinState, setCoinState] = useState("heads");
  const [isFlipping, setIsFlipping] = useState(false);
  const [flipResults, setFlipResults] = useState<string[]>([]);
  const [flipCounts, setFlipCounts] = useState({ heads: 0, tails: 0 });

  // Dice states
  const [diceValue, setDiceValue] = useState(1);
  const [isRolling, setIsRolling] = useState(false);
  const [diceResults, setDiceResults] = useState<number[]>([]);
  const [diceCounts, setDiceCounts] = useState<any>({
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
    6: 0,
  });

  // Card states
  const [selectedCards, setSelectedCards] = useState<string[]>([]);
  const [cardProbability, setCardProbability] = useState(0);
  const cardSuits = ["♥", "♦", "♠", "♣"];
  const cardValues = [
    "A",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "J",
    "Q",
    "K",
  ];

  // M&M states
  const [mmCounts, setMmCounts] = useState<Record<string, number>>({
    red: 13,
    orange: 20,
    yellow: 14,
    green: 16,
    blue: 24,
    brown: 13,
  });
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [showMmExplanation, setShowMmExplanation] = useState(false);

  // Flip the coin
  const flipCoin = () => {
    if (isFlipping) return;

    setIsFlipping(true);

    // Simulate the flip animation
    const flipDuration = 1000; // 1 second flip
    const framesPerSecond = 20;
    const totalFrames = flipDuration / (1000 / framesPerSecond);
    let frame = 0;

    const flipInterval = setInterval(() => {
      frame++;
      setCoinState(frame % 2 === 0 ? "heads" : "tails");

      if (frame >= totalFrames) {
        clearInterval(flipInterval);

        // Determine final state
        const result = Math.random() < 0.5 ? "heads" : "tails";
        setCoinState(result);

        // Update results
        const newResults = [...flipResults, result];
        setFlipResults(newResults);

        // Update counts
        const newCounts = { ...flipCounts };
        newCounts[result]++;
        setFlipCounts(newCounts);

        setIsFlipping(false);
      }
    }, 1000 / framesPerSecond);
  };

  // Reset coin flips
  const resetCoinFlips = () => {
    setFlipResults([]);
    setFlipCounts({ heads: 0, tails: 0 });
  };

  // Roll the dice
  const rollDice = () => {
    if (isRolling) return;

    setIsRolling(true);

    // Simulate the roll animation
    const rollDuration = 1000; // 1 second roll
    const framesPerSecond = 10;
    const totalFrames = rollDuration / (1000 / framesPerSecond);
    let frame = 0;

    const rollInterval = setInterval(() => {
      frame++;
      setDiceValue(Math.floor(Math.random() * 6) + 1);

      if (frame >= totalFrames) {
        clearInterval(rollInterval);

        // Determine final value
        const result = Math.floor(Math.random() * 6) + 1;
        setDiceValue(result);

        // Update results
        const newResults = [...diceResults, result];
        setDiceResults(newResults);

        // Update counts
        const newCounts = { ...diceCounts };
        newCounts[result]++;
        setDiceCounts(newCounts);

        setIsRolling(false);
      }
    }, 1000 / framesPerSecond);
  };

  // Reset dice rolls
  const resetDiceRolls = () => {
    setDiceResults([]);
    setDiceCounts({ 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0 });
  };

  // Toggle card selection
  const toggleCardSelection = (suit: string, value: string) => {
    const cardKey = `${suit}${value}`;

    if (selectedCards.includes(cardKey)) {
      setSelectedCards(selectedCards.filter((card) => card !== cardKey));
    } else {
      setSelectedCards([...selectedCards, cardKey]);
    }
  };

  // Update card probability when selection changes
  useEffect(() => {
    const totalCards = 52;
    const probability = selectedCards.length / totalCards;
    setCardProbability(probability);
  }, [selectedCards]);

  // Handle M&M color selection
  const handleMmColorSelect = (color: string) => {
    setSelectedColor(color);
    setShowMmExplanation(true);
  };

  // Calculate total M&Ms
  const totalMms = Object.values(mmCounts).reduce(
    (sum: number, count: number) => sum + count,
    0
  );

  // Render coin example
  const renderCoinExample = () => (
    <div className="mb-10 bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4 text-indigo-700">
        Coin Flip: 50/50 Probability
      </h2>

      <div className="flex flex-wrap items-center gap-6 mb-6">
        <div className="flex flex-col items-center">
          <div
            className={`w-20 h-20 rounded-full bg-gradient-to-r from-yellow-300 to-yellow-500 flex items-center justify-center text-xl font-bold shadow-md select-none ${
              isFlipping ? "animate-pulse" : ""
            }`}
            onClick={flipCoin}
          >
            {coinState === "heads" ? "H" : "T"}
          </div>
          <button
            onClick={flipCoin}
            disabled={isFlipping}
            className="mt-3 bg-indigo-600 text-white px-3 py-1 rounded hover:bg-indigo-700 transition disabled:bg-gray-400"
          >
            {isFlipping ? "Flipping..." : "Flip Coin"}
          </button>
        </div>

        <div className="flex-1">
          <div className="mb-2">
            <span className="font-medium">Probability:</span> 1/2 = 50% chance
            for each outcome
          </div>
          <div className="flex gap-4 mb-2">
            <div>
              <span className="font-medium">Heads:</span> {flipCounts.heads} (
              {flipResults.length > 0
                ? Math.round((flipCounts.heads / flipResults.length) * 100)
                : 0}
              %)
            </div>
            <div>
              <span className="font-medium">Tails:</span> {flipCounts.tails} (
              {flipResults.length > 0
                ? Math.round((flipCounts.tails / flipResults.length) * 100)
                : 0}
              %)
            </div>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
            <div
              className="bg-indigo-600 h-2.5 rounded-full"
              style={{
                width: `${
                  flipResults.length > 0
                    ? (flipCounts.heads / flipResults.length) * 100
                    : 50
                }%`,
              }}
            ></div>
          </div>
          <div className="text-sm text-gray-600 mb-2">
            Total flips: {flipResults.length}{" "}
            {flipResults.length > 0 && (
              <button
                onClick={resetCoinFlips}
                className="text-indigo-600 hover:underline"
              >
                (Reset)
              </button>
            )}
          </div>
          <div className="flex flex-wrap gap-1 text-xs">
            {flipResults.slice(-20).map((result, index) => (
              <span
                key={index}
                className={`inline-block w-6 h-6 rounded-full flex items-center justify-center font-bold ${
                  result === "heads"
                    ? "bg-indigo-100 text-indigo-700"
                    : "bg-green-100 text-green-700"
                }`}
              >
                {result === "heads" ? "H" : "T"}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-indigo-50 p-3 rounded-md text-sm">
        <p>
          <strong>Key Insight:</strong> With a fair coin, each flip has an equal
          probability (50%) of landing on heads or tails.
        </p>
        <p className="mt-1">
          <strong>Law of Large Numbers:</strong> As you flip more times, the
          actual results will get closer to the expected 50/50 split.
        </p>
      </div>
    </div>
  );

  // Render dice example
  const renderDiceExample = () => (
    <div className="mb-10 bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4 text-indigo-700">
        Dice Roll: 1/6 Probability
      </h2>

      <div className="flex flex-wrap items-center gap-6 mb-6">
        <div className="flex flex-col items-center">
          <div
            className={`w-20 h-20 bg-white border-2 border-gray-300 rounded-lg flex items-center justify-center text-2xl font-bold shadow-md select-none ${
              isRolling ? "animate-pulse" : ""
            }`}
            onClick={rollDice}
          >
            {/* Simple dice face representation */}
            {diceValue === 1 && <span className="text-3xl">⚀</span>}
            {diceValue === 2 && <span className="text-3xl">⚁</span>}
            {diceValue === 3 && <span className="text-3xl">⚂</span>}
            {diceValue === 4 && <span className="text-3xl">⚃</span>}
            {diceValue === 5 && <span className="text-3xl">⚄</span>}
            {diceValue === 6 && <span className="text-3xl">⚅</span>}
          </div>
          <button
            onClick={rollDice}
            disabled={isRolling}
            className="mt-3 bg-indigo-600 text-white px-3 py-1 rounded hover:bg-indigo-700 transition disabled:bg-gray-400"
          >
            {isRolling ? "Rolling..." : "Roll Dice"}
          </button>
        </div>

        <div className="flex-1">
          <div className="mb-2">
            <span className="font-medium">Probability:</span> 1/6 = 16.7% chance
            for each number
          </div>

          <div className="grid grid-cols-3 gap-2 mb-4">
            {[1, 2, 3, 4, 5, 6].map((num) => (
              <div key={num} className="text-sm">
                <div className="flex items-center gap-1">
                  <span className="font-medium">{num}:</span> {diceCounts[num]}
                  <span className="text-xs text-gray-500">
                    (
                    {diceResults.length > 0
                      ? Math.round((diceCounts[num] / diceResults.length) * 100)
                      : 0}
                    %)
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-1.5">
                  <div
                    className="bg-indigo-600 h-1.5 rounded-full"
                    style={{
                      width: `${
                        diceResults.length > 0
                          ? (diceCounts[num] / diceResults.length) * 100
                          : 16.7
                      }%`,
                    }}
                  ></div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-sm text-gray-600 mb-2">
            Total rolls: {diceResults.length}{" "}
            {diceResults.length > 0 && (
              <button
                onClick={resetDiceRolls}
                className="text-indigo-600 hover:underline"
              >
                (Reset)
              </button>
            )}
          </div>
          <div className="flex flex-wrap gap-1 text-xs">
            {diceResults.slice(-15).map((result, index) => (
              <span
                key={index}
                className="inline-block w-6 h-6 bg-indigo-100 rounded flex items-center justify-center font-bold text-indigo-700"
              >
                {result}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-indigo-50 p-3 rounded-md text-sm">
        <p>
          <strong>Key Insight:</strong> With a fair die, each of the six sides
          has an equal probability (1/6 or about 16.7%).
        </p>
        <p className="mt-1">
          <strong>Application:</strong> Many games use dice because they
          generate random outcomes with known probabilities.
        </p>
      </div>
    </div>
  );

  // Render card example
  const renderCardExample = () => (
    <div className="mb-10 bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4 text-indigo-700">
        Card Deck: Customizable Probabilities
      </h2>

      <div className="mb-4">
        <p className="text-sm mb-2">
          Select cards to calculate the probability of drawing at least one of
          them from a standard 52-card deck:
        </p>

        <div className="grid grid-cols-4 gap-2">
          {cardSuits.map((suit) => (
            <div key={suit} className="mb-2">
              <div
                className={`text-center font-bold ${
                  suit === "♥" || suit === "♦"
                    ? "text-red-600"
                    : "text-gray-800"
                }`}
              >
                {suit}
              </div>
              <div className="flex flex-wrap gap-1">
                {cardValues.map((value) => {
                  const cardKey = `${suit}${value}`;
                  const isSelected = selectedCards.includes(cardKey);

                  return (
                    <div
                      key={cardKey}
                      className={`w-6 h-6 text-xs flex items-center justify-center border cursor-pointer ${
                        isSelected
                          ? "bg-indigo-600 text-white border-indigo-700"
                          : "bg-white border-gray-300 hover:bg-gray-50"
                      } ${
                        suit === "♥" || suit === "♦"
                          ? "text-red-600"
                          : "text-gray-800"
                      }`}
                      onClick={() => toggleCardSelection(suit, value)}
                    >
                      {value}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-indigo-100 p-4 rounded-md mb-4">
        <div className="mb-2">
          <span className="font-medium">You've selected:</span>{" "}
          {selectedCards.length} cards
        </div>
        <div className="mb-2">
          <span className="font-medium">
            Probability of drawing at least one selected card:
          </span>{" "}
          {(cardProbability * 100).toFixed(1)}%
        </div>
        <div className="w-full bg-white rounded-full h-2.5 mb-2">
          <div
            className="bg-indigo-600 h-2.5 rounded-full"
            style={{ width: `${cardProbability * 100}%` }}
          ></div>
        </div>
        <div className="text-sm">
          <span className="font-medium">Fraction:</span> {selectedCards.length}
          /52 ≈ {cardProbability.toFixed(3)}
        </div>
      </div>

      <div className="bg-indigo-50 p-3 rounded-md text-sm">
        <p>
          <strong>Key Insight:</strong> Probability = (Number of favorable
          outcomes) / (Total number of possible outcomes)
        </p>
        <p className="mt-1">
          The more cards you select, the higher your probability of drawing at
          least one of them.
        </p>
      </div>
    </div>
  );

  // Render M&M example
  const renderMandMExample = () => (
    <div className="mb-10 bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4 text-indigo-700">
        M&M Colors: Real-World Probabilities
      </h2>

      <p className="text-sm mb-4">
        M&M candies come in different colors with different frequencies. Click a
        color to see its probability:
      </p>

      <div className="flex justify-around mb-6">
        {Object.entries(mmCounts).map(([color, count]) => (
          <div
            key={color}
            className="flex flex-col items-center cursor-pointer"
            onClick={() => handleMmColorSelect(color)}
          >
            <div
              className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-bold ${
                selectedColor === color
                  ? "ring-2 ring-offset-2 ring-indigo-600"
                  : ""
              }`}
              style={{
                backgroundColor:
                  color === "orange"
                    ? "#FF7F00"
                    : color === "brown"
                    ? "#8B4513"
                    : color,
              }}
            >
              {Math.round((count / totalMms) * 100)}%
            </div>
            <div className="text-xs mt-1 capitalize">{color}</div>
          </div>
        ))}
      </div>

      {showMmExplanation && selectedColor && (
        <div className="bg-gray-50 p-4 rounded-md mb-4">
          <h3 className="font-medium capitalize mb-2">{selectedColor} M&Ms</h3>
          <div className="mb-2">
            <span className="font-medium">Count in a typical bag:</span>{" "}
            {mmCounts[selectedColor]} out of {totalMms} M&Ms
          </div>
          <div className="mb-2">
            <span className="font-medium">Probability:</span>{" "}
            {((mmCounts[selectedColor] / totalMms) * 100).toFixed(1)}%
          </div>
          <div className="mb-2">
            <span className="font-medium">Fraction:</span>{" "}
            {mmCounts[selectedColor]}/{totalMms} ≈{" "}
            {(mmCounts[selectedColor] / totalMms).toFixed(3)}
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5 mb-2">
            <div
              className="h-2.5 rounded-full"
              style={{
                width: `${(mmCounts[selectedColor] / totalMms) * 100}%`,
                backgroundColor:
                  selectedColor === "orange"
                    ? "#FF7F00"
                    : selectedColor === "brown"
                    ? "#8B4513"
                    : selectedColor,
              }}
            ></div>
          </div>
        </div>
      )}

      <div className="bg-indigo-50 p-3 rounded-md text-sm">
        <p>
          <strong>Key Insight:</strong> Unlike coins or dice, many real-world
          events have unequal probabilities.
        </p>
        <p className="mt-1">
          <strong>Application:</strong> Companies like Mars (makers of M&Ms) use
          probability and statistics to maintain consistent color distributions.
        </p>
      </div>
    </div>
  );

  // Main render
  return (
    <div className="max-w-4xl mx-auto p-4 bg-gray-100">
      <header className="text-center mb-8">
        <h1 className="text-3xl font-bold text-indigo-800">
          Introduction to Probability
        </h1>
        <p className="text-gray-600">
          Visual examples to understand the basics of probability
        </p>
      </header>

      {/* What is probability section */}
      <div className="mb-10 bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-bold mb-4 text-indigo-700">
          What is Probability?
        </h2>

        <div className="flex flex-col md:flex-row gap-4 items-center mb-4">
          <div className="flex-1">
            <p className="mb-2">
              Probability measures how likely something is to happen. It's
              always a number between 0 and 1:
            </p>
            <ul className="list-disc pl-5 mb-2 space-y-1">
              <li>
                <strong>0 (0%)</strong> = Impossible event
              </li>
              <li>
                <strong>0.5 (50%)</strong> = Equal chance of happening or not
                happening
              </li>
              <li>
                <strong>1 (100%)</strong> = Certain event
              </li>
            </ul>
            <p>
              We can express probability as a fraction, decimal, or percentage.
            </p>
          </div>

          <div className="w-full md:w-64">
            <div className="h-6 w-full bg-gradient-to-r from-red-500 via-yellow-500 to-green-500 rounded-lg relative">
              <div className="absolute top-8 left-0 text-center w-8 -ml-4 text-xs">
                0%
                <br />
                Impossible
              </div>
              <div className="absolute top-8 left-1/4 text-center w-8 -ml-4 text-xs">
                25%
                <br />
                Unlikely
              </div>
              <div className="absolute top-8 left-1/2 text-center w-8 -ml-4 text-xs">
                50%
                <br />
                Even
              </div>
              <div className="absolute top-8 left-3/4 text-center w-8 -ml-4 text-xs">
                75%
                <br />
                Likely
              </div>
              <div className="absolute top-8 right-0 text-center w-8 -mr-4 text-xs">
                100%
                <br />
                Certain
              </div>
            </div>
          </div>
        </div>

        <div className="bg-indigo-50 p-3 rounded-md text-sm">
          <p>
            <strong>The basic formula:</strong> Probability = Number of
            favorable outcomes / Total number of possible outcomes
          </p>
        </div>
      </div>

      {/* Interactive examples */}
      {renderCoinExample()}
      {renderDiceExample()}
      {renderCardExample()}
      {renderMandMExample()}

      {/* Summary */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-bold mb-4 text-indigo-700">
          Key Probability Concepts
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-indigo-50 p-4 rounded-md">
            <h3 className="font-bold mb-2">Equal vs. Unequal Probability</h3>
            <p className="text-sm">
              Some events (like coin flips) have equal probabilities for all
              outcomes. Others (like M&M colors) have different probabilities
              for different outcomes.
            </p>
          </div>

          <div className="bg-indigo-50 p-4 rounded-md">
            <h3 className="font-bold mb-2">Independent Events</h3>
            <p className="text-sm">
              Each coin flip or dice roll is independent - previous results
              don't affect future probabilities. The coin has no "memory" of
              past flips.
            </p>
          </div>

          <div className="bg-indigo-50 p-4 rounded-md">
            <h3 className="font-bold mb-2">Law of Large Numbers</h3>
            <p className="text-sm">
              As you increase the number of trials, the actual results will get
              closer to the theoretical probability.
            </p>
          </div>

          <div className="bg-indigo-50 p-4 rounded-md">
            <h3 className="font-bold mb-2">Representing Probability</h3>
            <p className="text-sm">
              We can express the same probability as a fraction (1/2), decimal
              (0.5), or percentage (50%).
            </p>
          </div>
        </div>
      </div>

      <footer className="mt-8 text-center text-gray-500 text-sm">
        <p>
          This interactive demonstration helps visualize basic probability
          concepts.
        </p>
      </footer>
    </div>
  );
};

export default ProbabilityIntro;
