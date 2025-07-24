"use client";
import Lesson from "@/components/Lesson";
import QuizQuestion from "@/components/QuizQuestion";
import React, { useState, useRef, useMemo, Children } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
  ReferenceDot,
  Label,
  Legend,
} from "recharts";
import Block from "@/components/Block";
import Emphasize from "@/components/Emphasize";
import ColorBox from "@/components/ColorBox";
import KeyTerm from "@/components/KeyTerm";

const marginalUtilities = [10, 7, 4, 1, -2, -5, -8, -11];

interface CoinPickingExampleProps {
  coins: number[];
  initialAmount: number;
  greedyStrict?: boolean;
}

interface HasChildrenProps {
  children: React.ReactNode;
}

const data = [
  { quantity: 1, mb: 18, mc: 8 },
  { quantity: 2, mb: 16, mc: 8 },
  { quantity: 3, mb: 14, mc: 8 },
  { quantity: 4, mb: 12, mc: 8 },
  { quantity: 5, mb: 10, mc: 8 },
  { quantity: 6, mb: 8, mc: 8 }, // <-- Optimal Point (MC = MB)
  { quantity: 7, mb: 6, mc: 8 },
  { quantity: 8, mb: 4, mc: 8 },
];

const McMbChart = () => {
  return (
    <ResponsiveContainer width="100%" height={400}>
      <LineChart
        data={data}
        margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
      >
        <CartesianGrid stroke="#e0e0e0" strokeDasharray="5 5" />
        <XAxis
          dataKey="quantity"
          label={{
            value: "Quantity of Lemons",
            position: "insideBottom",
            dy: 10,
          }}
        />
        <YAxis
          label={{ value: "Price ($)", angle: -90, position: "insideLeft" }}
        />
        <Tooltip />
        <Legend />

        {/* Marginal Benefit Line (Downward Sloping) */}
        <Line
          type="monotone"
          dataKey="mb"
          name="Marginal Benefit"
          stroke="#8884d8"
          strokeWidth={2}
        />

        {/* Marginal Cost Line (Constant / Horizontal) */}
        <Line
          type="monotone"
          dataKey="mc"
          name="Marginal Cost"
          stroke="#82ca9d"
          strokeWidth={2}
        />

        {/* Reference Dot to highlight the intersection */}
        <ReferenceDot x={6} y={8} r={8} fill="red" stroke="white">
          <Label value="Optimal" position="top" fill="rgba(0,0,0,0.7)" />
        </ReferenceDot>
      </LineChart>
    </ResponsiveContainer>
  );
};

const CoinPickingExample: React.FC<CoinPickingExampleProps> = ({
  coins,
  initialAmount,
  greedyStrict = false,
}) => {
  const [changeMade, setChangeMade] = useState<number>(0);
  const [coinsUsed, setCoinsUsed] = useState<number[]>([]);
  const [feedback, setFeedback] = useState<string | null>(null);

  const feedbackTimerRef = useRef<NodeJS.Timeout | null>(null);

  const changeLeft = initialAmount - changeMade;
  const progressPercent =
    initialAmount > 0 ? (changeMade / initialAmount) * 100 : 0;

  const sortedCoins = useMemo(() => [...coins].sort((a, b) => b - a), [coins]);

  function showFeedback(message: string) {
    if (feedbackTimerRef.current) clearTimeout(feedbackTimerRef.current);
    setFeedback(message);
    feedbackTimerRef.current = setTimeout(() => setFeedback(null), 3000);
  }

  function useCoin(clickedCoin: number) {
    setFeedback(null); // Clear feedback on any new valid action

    if (greedyStrict) {
      const greedyChoice = sortedCoins.find((c) => c <= changeLeft);
      if (greedyChoice && clickedCoin < greedyChoice) {
        showFeedback(`Try picking the largest possible coin: ${greedyChoice}.`);
        return;
      }
    }

    setChangeMade((prev) => prev + clickedCoin);
    setCoinsUsed((prev) => [...prev, clickedCoin].sort((a, b) => b - a));
  }

  function reset() {
    setChangeMade(0);
    setCoinsUsed([]);
    setFeedback(null);
    if (feedbackTimerRef.current) clearTimeout(feedbackTimerRef.current);
  }

  return (
    <div className="max-w-md mx-auto bg-white rounded-xl shadow-lg p-8 font-sans">
      <div className="space-y-6 flex flex-col">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-3xl font-bold text-slate-800">
            Cashier Change Demo
          </h1>
          <p className="text-slate-500 mt-1">
            Click coins to make change for{" "}
            <span className="font-bold text-slate-700">{initialAmount}</span>
          </p>
        </div>

        {/* Available Coins Section */}
        <div className="relative">
          {" "}
          {/* Parent for absolute positioning of feedback */}
          <h2 className="text-xs font-semibold text-slate-500 uppercase tracking-wider pb-4">
            Available Coins
          </h2>
          <div className="flex flex-wrap justify-center gap-4">
            {sortedCoins.map((coin, index) => (
              <button
                key={index}
                onClick={() => useCoin(coin)}
                disabled={changeLeft < coin}
                className={`
                  w-16 h-16 rounded-full flex items-center justify-center text-xl font-medium text-black
                  bg-yellow-200 transition-colors duration-200
                  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-400
                  disabled:bg-yellow-100 disabled:text-slate-400 disabled:cursor-not-allowed
                  border-2 border-dashed border-yellow-800
                `}
              >
                {coin}
              </button>
            ))}
          </div>
          {/* Feedback Area (Absolutely Positioned) */}
          <div className="absolute top-full w-full flex justify-center mt-3 transition-opacity duration-300">
            {feedback && (
              <p className="bg-red-100 text-red-700 text-sm font-medium px-4 py-2 rounded-lg shadow-md">
                {feedback}
              </p>
            )}
          </div>
        </div>

        {/* Spacer for feedback area */}
        {feedback && <div className="h-8"></div>}

        {/* Progress Bar */}
        <div>
          <div className="w-full bg-slate-200 rounded-full h-2">
            <div
              className="bg-green-500 h-2 rounded-full transition-all duration-300 ease-out"
              style={{ width: `${progressPercent}%` }}
            ></div>
          </div>
        </div>

        {/* Results Section */}
        <div className="space-y-4 pt-4 border-t border-slate-200">
          <div className="flex justify-between items-center bg-slate-50 p-4 rounded-lg">
            <span className="text-lg text-slate-600">Change Left:</span>
            <span
              className={`text-3xl font-bold ${
                changeLeft > 0 ? "text-slate-800" : "text-green-600"
              }`}
            >
              {changeLeft}
            </span>
          </div>

          <div className="space-y-3">
            <h2 className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Coins Used ({coinsUsed.length})
            </h2>
            <div className="bg-slate-50 p-4 rounded-lg min-h-[5rem] flex flex-wrap gap-2 items-start">
              {coinsUsed.length > 0 ? (
                coinsUsed.map((coin, index) => (
                  <div
                    key={index}
                    className="w-8 h-8 flex items-center justify-center bg-blue-100 text-blue-800 text-sm font-semibold rounded-full"
                  >
                    {coin}
                  </div>
                ))
              ) : (
                <span className="text-slate-400 italic self-center mx-auto">
                  No coins used yet.
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Reset Button */}
        <div className="pt-2">
          <button
            onClick={reset}
            className="w-full bg-red-500 text-white font-bold py-3 px-4 rounded-lg hover:bg-red-600 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
};

const CupcakesCookiesUtilityTable = () => {
  // Define reusable types for better maintainability and readability
  type Item = "cupcakes" | "cookies";
  type FeedbackType = "correct" | "incorrect" | "";

  // Define types for complex state and data structures
  type PurchaseCounts = Record<Item, number>;
  type MuValues = Record<Item, string[]>;
  type CorrectMuValues = Record<Item, number[]>;

  interface ItemDetails {
    price: number;
    marginalUtility: number[];
    color: string;
  }

  type ItemData = Record<Item, ItemDetails>;

  // State hooks are now strongly typed using generics
  const [budget, setBudget] = useState<number>(13);
  const [originalBudget] = useState<number>(13);
  const [purchases, setPurchases] = useState<Item[]>([]);
  const [purchaseCounts, setPurchaseCounts] = useState<PurchaseCounts>({
    cupcakes: 0,
    cookies: 0,
  });
  const [muPerDollar, setMuPerDollar] = useState<MuValues>({
    cupcakes: ["", "", ""],
    cookies: ["", "", ""],
  });
  const [isTableLocked, setIsTableLocked] = useState<boolean>(false);
  const [feedback, setFeedback] = useState<string>("");
  const [feedbackType, setFeedbackType] = useState<FeedbackType>("");

  // Fixed data is typed to match the defined interfaces and types
  const itemData: ItemData = {
    cupcakes: {
      price: 3,
      marginalUtility: [18, 15, 6],
      color: "bg-green-200",
    },
    cookies: {
      price: 2,
      marginalUtility: [8, 6, 2],
      color: "bg-green-200",
    },
  };

  const correctMuPerDollar: CorrectMuValues = {
    cupcakes: [6, 5, 2],
    cookies: [4, 3, 1],
  };

  // Function parameters are typed, and the return type is specified as 'void'
  const handleMuPerDollarChange = (
    item: Item,
    index: number,
    value: string
  ): void => {
    if (isTableLocked) return;

    setMuPerDollar((prev) => ({
      ...prev,
      [item]: prev[item].map((val, i) => (i === index ? value : val)),
    }));
  };

  // The function's return type is explicitly defined
  const checkMuPerDollarCalculations = (): {
    allCorrect: boolean;
    incorrectItems: string[];
  } => {
    let allCorrect = true;
    let incorrectItems: string[] = [];

    // Using a type assertion to safely iterate over object keys
    (Object.keys(muPerDollar) as Item[]).forEach((item) => {
      muPerDollar[item].forEach((value, index) => {
        const inputValue = parseFloat(value);
        const correctValue = correctMuPerDollar[item][index];

        if (isNaN(inputValue) || Math.abs(inputValue - correctValue) > 0.01) {
          allCorrect = false;
          incorrectItems.push(`${item} #${index + 1}`);
        }
      });
    });

    return { allCorrect, incorrectItems };
  };

  const getInputBorderClass = (item: Item, index: number): string => {
    if (!isTableLocked && muPerDollar[item][index] !== "") {
      const inputValue = parseFloat(muPerDollar[item][index]);
      const correctValue = correctMuPerDollar[item][index];

      if (!isNaN(inputValue) && Math.abs(inputValue - correctValue) <= 0.01) {
        return "border-green-500 bg-green-50";
      } else if (!isNaN(inputValue)) {
        return "border-red-500 bg-red-50";
      }
    }
    return "";
  };

  const lockTable = (): void => {
    const allFilled = Object.values(muPerDollar).every((arr) =>
      arr.every((val) => val !== "")
    );

    if (!allFilled) {
      setFeedback("Please fill in all MU/P values before locking the table.");
      setFeedbackType("incorrect");
      return;
    }

    const { allCorrect, incorrectItems } = checkMuPerDollarCalculations();

    if (!allCorrect) {
      setFeedback(
        `Incorrect calculations detected for: ${incorrectItems.join(
          ", "
        )}. Please double-check your MU/P calculations (MU ÷ Price).`
      );
      setFeedbackType("incorrect");
      return;
    }

    setIsTableLocked(true);
    setFeedback(
      "✅ All calculations correct! Table locked. Now select the optimal items to purchase."
    );
    setFeedbackType("correct");
  };

  const getCurrentMuPerDollar = (item: Item): number => {
    const currentCount = purchaseCounts[item];
    if (currentCount >= 3) return 0;

    const inputValue = parseFloat(muPerDollar[item][currentCount]);
    return isNaN(inputValue) ? 0 : inputValue;
  };

  // Return type can be 'Item' or 'null'
  const getOptimalChoice = (): Item | null => {
    const cupcakeMuPerDollar = getCurrentMuPerDollar("cupcakes");
    const cookieMuPerDollar = getCurrentMuPerDollar("cookies");

    const canAffordCupcake =
      budget >= itemData.cupcakes.price && purchaseCounts.cupcakes < 3;
    const canAffordCookie =
      budget >= itemData.cookies.price && purchaseCounts.cookies < 3;

    if (!canAffordCupcake && !canAffordCookie) return null;
    if (!canAffordCupcake) return "cookies";
    if (!canAffordCookie) return "cupcakes";

    return cupcakeMuPerDollar >= cookieMuPerDollar ? "cupcakes" : "cookies";
  };

  const handlePurchase = (item: Item): void => {
    if (!isTableLocked) {
      setFeedback("Please calculate and lock the MU/P values first!");
      setFeedbackType("incorrect");
      return;
    }

    const price = itemData[item].price;

    if (budget < price) {
      setFeedback(
        `Not enough budget! You need $${price} but only have $${budget}.`
      );
      setFeedbackType("incorrect");
      return;
    }

    if (purchaseCounts[item] >= 3) {
      setFeedback(`You can't buy more than 3 ${item}!`);
      setFeedbackType("incorrect");
      return;
    }

    const optimalChoice = getOptimalChoice();

    if (item === optimalChoice) {
      setBudget((prev) => prev - price);
      setPurchases((prev) => [...prev, item]);
      setPurchaseCounts((prev) => ({
        ...prev,
        [item]: prev[item] + 1,
      }));
      if (budget > 0) {
        setFeedback(
          `Correct! ${
            item.charAt(0).toUpperCase() + item.slice(1)
          } had the highest MU/P ratio.`
        );
      } else {
        setFeedback(
          `Correct! ${
            item.charAt(0).toUpperCase() + item.slice(1)
          } had the highest MU/P ratio. Now you've spent your whole budget! Horray!`
        );
      }
      setFeedbackType("correct");
    } else {
      setFeedback(
        `Incorrect! The optimal choice is ${optimalChoice} (higher MU/P ratio).`
      );
      setFeedbackType("incorrect");
    }
  };

  const reset = (): void => {
    setBudget(originalBudget);
    setPurchases([]);
    setPurchaseCounts({ cupcakes: 0, cookies: 0 });
    setMuPerDollar({ cupcakes: ["", "", ""], cookies: ["", "", ""] });
    setIsTableLocked(false);
    setFeedback("");
    setFeedbackType("");
  };

  const getHighlightClass = (item: Item, index: number): string => {
    if (purchaseCounts[item] > index) {
      return `${itemData[item].color} font-bold`;
    }
    return "";
  };

  const allPossiblePurchasesMade = (): boolean => {
    const optimalChoice = getOptimalChoice();
    return optimalChoice === null;
  };

  return (
    <div className="space-y-4 text-gray-700 leading-relaxed max-w-5xl mx-auto p-6">
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
          <thead className="bg-gray-100">
            <tr>
              <th
                rowSpan={2}
                className="px-4 py-3 text-center text-sm font-medium text-gray-700 align-bottom border-b-2 border-r border-gray-300"
              >
                Quantity
              </th>
              <th
                colSpan={2}
                className="px-4 py-3 text-center text-lg font-medium text-gray-700 border-b border-r border-gray-300"
              >
                <div>🧁 Cupcakes ($3)</div>
              </th>
              <th
                colSpan={2}
                className="px-4 py-3 text-center text-lg font-medium text-gray-700 border-b border-gray-300"
              >
                <div>🍪 Cookies ($2)</div>
              </th>
            </tr>
            <tr>
              <th className="px-4 py-2 text-center text-xs font-medium text-gray-600 border-b-2 border-r border-gray-300">
                Marginal Utility
              </th>
              <th className="px-4 py-2 text-center text-xs font-medium text-gray-600 border-b-2 border-r border-gray-300">
                MU/P (Calculate!)
              </th>
              <th className="px-4 py-2 text-center text-xs font-medium text-gray-600 border-b-2 border-r border-gray-300">
                Marginal Utility
              </th>
              <th className="px-4 py-2 text-center text-xs font-medium text-gray-600 border-b-2 border-gray-300">
                MU/P (Calculate!)
              </th>
            </tr>
          </thead>
          <tbody>
            {/* Assuming itemData.cupcakes.marginalUtility has the definitive length for rows */}
            {itemData.cupcakes.marginalUtility.map((_, index) => (
              <tr
                key={index}
                className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
              >
                {/* Quantity */}
                <td className="px-4 py-3 border-b border-r border-gray-200 font-medium text-center">
                  {index + 1}
                </td>

                {/* Cupcake Data */}
                <td className="px-4 py-3 border-b border-r border-gray-200 text-center">
                  {itemData.cupcakes.marginalUtility[index]}
                </td>
                <td className="px-4 py-3 border-b border-r border-gray-200 text-center">
                  <input
                    key={`cupcake-${index}`}
                    type="number"
                    value={muPerDollar.cupcakes[index]}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      handleMuPerDollarChange("cupcakes", index, e.target.value)
                    }
                    disabled={isTableLocked}
                    className={`w-20 mx-auto block px-2 py-1 border rounded text-center ${
                      isTableLocked ? "bg-gray-100" : "bg-white"
                    } ${getHighlightClass(
                      "cupcakes",
                      index
                    )} ${getInputBorderClass("cupcakes", index)}`}
                    placeholder="?"
                  />
                </td>

                {/* Cookie Data */}
                <td className="px-4 py-3 border-b border-r border-gray-200 text-center">
                  {itemData.cookies.marginalUtility[index]}
                </td>
                <td className="px-4 py-3 border-b border-gray-200 text-center">
                  <input
                    key={`cookie-${index}`}
                    type="number"
                    step="0.1"
                    value={muPerDollar.cookies[index]}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      handleMuPerDollarChange("cookies", index, e.target.value)
                    }
                    disabled={isTableLocked}
                    className={`w-20 mx-auto block px-2 py-1 border rounded text-center ${
                      isTableLocked ? "bg-gray-100" : "bg-white"
                    } ${getHighlightClass(
                      "cookies",
                      index
                    )} ${getInputBorderClass("cookies", index)}`}
                    placeholder="?"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
        <h2 className="text-xl font-bold mb-2">
          Marginal Utility Per Dollar Exercise
        </h2>
        <p className="text-sm mb-4">
          Calculate the marginal utility per dollar (MU/P) for each item, then
          make optimal purchasing decisions based on your budget.
        </p>

        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-4">
            {!isTableLocked ? (
              <button
                onClick={lockTable}
                className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                Check Calculations & Start Shopping
              </button>
            ) : (
              <div className="flex space-x-2">
                <button
                  onClick={() => handlePurchase("cupcakes")}
                  disabled={allPossiblePurchasesMade()}
                  className={`px-4 py-2 rounded-md transition-colors ${
                    allPossiblePurchasesMade()
                      ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                      : "bg-pink-500 text-white hover:bg-pink-600"
                  }`}
                >
                  Buy Cupcake ($3)
                </button>
                <button
                  onClick={() => handlePurchase("cookies")}
                  disabled={allPossiblePurchasesMade()}
                  className={`px-4 py-2 rounded-md transition-colors ${
                    allPossiblePurchasesMade()
                      ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                      : "bg-amber-500 text-white hover:bg-amber-600"
                  }`}
                >
                  Buy Cookie ($2)
                </button>
              </div>
            )}
            <button
              onClick={reset}
              className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition-colors"
            >
              Reset
            </button>
          </div>
          <div className="text-right">
            <div className="text-lg font-bold text-green-700">
              Budget: ${budget}
            </div>
            <div className="text-sm text-gray-600">
              Spent: ${originalBudget - budget}
            </div>
          </div>
        </div>

        {feedback && (
          <div
            className={`p-3 rounded-md flex items-center space-x-2 ${
              feedbackType === "correct"
                ? "bg-green-100 text-green-800"
                : "bg-red-100 text-red-800"
            }`}
          >
            <span className="text-xl">
              {feedbackType === "correct" ? "✅" : "❌"}
            </span>
            <span>{feedback}</span>
          </div>
        )}

        {purchases.length > 0 && (
          <div className="mt-4 p-3 bg-gray-50 rounded-md">
            <span className="font-medium">Your purchases: </span>
            {purchases.map((item, index) => (
              <span
                key={index}
                className="inline-block mx-1 px-2 py-1 rounded text-sm bg-white border"
              >
                {item.charAt(0).toUpperCase() + item.slice(1, -1)} $
                {itemData[item].price}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

const IceCreamUtilityTable = () => {
  const [scoopCount, setScoopCount] = useState(0);
  const [totalUtility, setTotalUtility] = useState(0);
  const [selectedScoops, setSelectedScoops] = useState<Flavor[]>([]);
  type Flavor = "chocolate" | "vanilla" | "strawberry";

  const [scoopCounts, setScoopCounts] = useState<Record<Flavor, number>>({
    chocolate: 0,
    vanilla: 0,
    strawberry: 0,
  });

  const utilityData: Record<Flavor, number[]> = {
    chocolate: [10, 7, 4],
    vanilla: [2, 1, 0],
    strawberry: [9, 6, 3],
  };

  const flavorColors: Record<Flavor, string> = {
    chocolate: "bg-amber-700",
    vanilla: "bg-yellow-200 border-2 border-yellow-600",
    strawberry: "bg-pink-300",
  };

  const getCurrentUtility = (flavor: Flavor) => {
    const currentCount = scoopCounts[flavor];
    return currentCount < 3 ? utilityData[flavor][currentCount] : 0;
  };

  const getHighestUtilityFlavor = () => {
    const utilities: Record<Flavor, number> = {
      chocolate: getCurrentUtility("chocolate"),
      vanilla: getCurrentUtility("vanilla"),
      strawberry: getCurrentUtility("strawberry"),
    };

    return (Object.keys(utilities) as Flavor[]).reduce((a, b) =>
      utilities[a] > utilities[b] ? a : b
    );
  };

  const handleNextScoop = () => {
    if (scoopCount >= 3) return;

    const selectedFlavor = getHighestUtilityFlavor();
    const utility = getCurrentUtility(selectedFlavor);

    setScoopCount((prev) => prev + 1);
    setTotalUtility((prev) => prev + utility);
    setSelectedScoops((prev) => [...prev, selectedFlavor]);
    setScoopCounts((prev) => ({
      ...prev,
      [selectedFlavor]: prev[selectedFlavor] + 1,
    }));
  };

  const reset = () => {
    setScoopCount(0);
    setTotalUtility(0);
    setSelectedScoops([]);
    setScoopCounts({
      chocolate: 0,
      vanilla: 0,
      strawberry: 0,
    });
  };

  const getHighlightClass = (flavor: Flavor, scoopIndex: number) => {
    if (scoopCounts[flavor] > scoopIndex) {
      // We've selected this scoop, so show highlight it in that color.
      if (flavor === "vanilla") {
        return `${flavorColors[flavor]} text-black font-bold`;
      }
      return `${flavorColors[flavor]} text-white font-bold`;
    } else if (scoopCounts[flavor] == scoopIndex) {
      // This scoop is next, so highlight it in a fun way.
      return "bg-blue-50 text-black font-bold rounded-sm inset-ring-2 inset-ring-blue-200/50";
    }
    return "";
  };

  return (
    <div className="space-y-4 text-gray-700 leading-relaxed max-w-4xl mx-auto p-6">
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">
                # of Scoops
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">
                <div className="flex items-center space-x-2">
                  <span>Chocolate</span>
                  <div
                    className={`w-4 h-4 rounded-full ${flavorColors.chocolate}`}
                  ></div>
                </div>
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">
                <div className="flex items-center space-x-2">
                  <span>Vanilla</span>
                  <div
                    className={`w-4 h-4 rounded-full ${flavorColors.vanilla}`}
                  ></div>
                </div>
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">
                <div className="flex items-center space-x-2">
                  <span>Strawberry</span>
                  <div
                    className={`w-4 h-4 rounded-full ${flavorColors.strawberry}`}
                  ></div>
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="hover:bg-gray-50 transition-colors duration-200">
              <td className="px-6 py-4 border-b border-gray-200 font-medium">
                1 Scoop (utils)
              </td>
              <td
                className={`px-6 py-4 border-b border-gray-200 transition-colors duration-300 ${getHighlightClass(
                  "chocolate",
                  0
                )}`}
              >
                10
              </td>
              <td
                className={`px-6 py-4 border-b border-gray-200 transition-colors duration-300 ${getHighlightClass(
                  "vanilla",
                  0
                )}`}
              >
                2
              </td>
              <td
                className={`px-6 py-4 border-b border-gray-200 transition-colors duration-300 ${getHighlightClass(
                  "strawberry",
                  0
                )}`}
              >
                9
              </td>
            </tr>
            <tr className="hover:bg-gray-50 transition-colors duration-200">
              <td className="px-6 py-4 border-b border-gray-200 font-medium">
                2 Scoops (utils)
              </td>
              <td
                className={`px-6 py-4 border-b border-gray-200 transition-colors duration-300 ${getHighlightClass(
                  "chocolate",
                  1
                )}`}
              >
                7
              </td>
              <td
                className={`px-6 py-4 border-b border-gray-200 transition-colors duration-300 ${getHighlightClass(
                  "vanilla",
                  1
                )}`}
              >
                1
              </td>
              <td
                className={`px-6 py-4 border-b border-gray-200 transition-colors duration-300 ${getHighlightClass(
                  "strawberry",
                  1
                )}`}
              >
                6
              </td>
            </tr>
            <tr className="hover:bg-gray-50 transition-colors duration-200">
              <td className="px-6 py-4 border-b border-gray-200 font-medium">
                3 Scoops (utils)
              </td>
              <td
                className={`px-6 py-4 border-b border-gray-200 transition-colors duration-300 ${getHighlightClass(
                  "chocolate",
                  2
                )}`}
              >
                4
              </td>
              <td
                className={`px-6 py-4 border-b border-gray-200 transition-colors duration-300 ${getHighlightClass(
                  "vanilla",
                  2
                )}`}
              >
                0
              </td>
              <td
                className={`px-6 py-4 border-b border-gray-200 transition-colors duration-300 ${getHighlightClass(
                  "strawberry",
                  2
                )}`}
              >
                3
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Control Panel */}
      <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-4">
            <button
              onClick={handleNextScoop}
              disabled={scoopCount >= 3}
              className={`px-6 py-2 rounded-md font-medium transition-colors ${
                scoopCount >= 3
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                  : "bg-blue-600 text-white hover:bg-blue-700"
              }`}
            >
              {scoopCount >= 3 ? "Out of Scoops" : "Next Scoop"}
            </button>
            <button
              onClick={reset}
              className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition-colors"
            >
              Reset
            </button>
          </div>
          <div className="text-right">
            <div className="text-sm text-gray-600">
              Scoops Selected: {scoopCount}/3
            </div>
            <div className="text-lg font-bold text-blue-700">
              Total Utility: {totalUtility} utils
            </div>
          </div>
        </div>

        {/* Selected Scoops Display */}
        {selectedScoops.length > 0 && (
          <div className="flex items-center space-x-2">
            <span className="text-sm font-medium">Your scoops:</span>
            {selectedScoops.map((flavor, index) => (
              <div key={index} className="flex items-center space-x-1">
                <div
                  className={`w-6 h-6 rounded-full ${flavorColors[flavor]}`}
                ></div>
                <span className="text-sm capitalize">{flavor}</span>
                {index < selectedScoops.length - 1 && (
                  <span className="text-gray-400">→</span>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

const InteractiveChart: React.FC<HasChildrenProps> = ({ children }) => {
  const [selectedSlices, setSelectedSlices] = useState(1);

  const totalUtility = marginalUtilities
    .slice(0, selectedSlices)
    .reduce((sum, util) => sum + util, 0);
  const currentMarginalUtility = marginalUtilities[selectedSlices - 1];

  // Calculate data for charts
  const data = [];
  let cumulativeUtility = 0;

  for (let i = 0; i < 8; i++) {
    cumulativeUtility += marginalUtilities[i];
    data.push({
      slice: i + 1,
      marginalUtility: marginalUtilities[i],
      totalUtility: cumulativeUtility,
      isSelected: i < selectedSlices,
    });
  }

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active) {
      // && payload && payload.length) {
      return (
        <div className="bg-white p-4 border border-gray-300 rounded shadow-lg">
          <p className="font-semibold text-gray-800 mb-2">{`Slice ${label}`}</p>
          {payload.map(
            (
              entry: { color: string; name: string; value: number },
              index: React.Key | null | undefined
            ) => (
              <p
                key={index}
                style={{ color: entry.color }}
                className="font-medium"
              >
                {`${entry.name}: ${entry.value}`}
              </p>
            )
          )}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <div className="flex flex-row gap-6">
        {/* Text & Slider */}
        <div className="basis-1/2 space-y-8 p-8">
          {children}

          {/* Slider Control */}
          <div className="w-full max-w-md mx-auto">
            <label className="block text-lg font-medium text-gray-700 mb-3 text-center">
              Number of Pizza Slices: {selectedSlices}
            </label>
            <input
              type="range"
              min="1"
              max="8"
              value={selectedSlices}
              onChange={(e) => setSelectedSlices(parseInt(e.target.value))}
              className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
            />
            <div className="flex justify-between text-sm text-gray-500 mt-2">
              <span>1 slice</span>
              <span>8 slices</span>
            </div>
          </div>
        </div>

        {/* Combined Chart */}
        <div className="flex flex-col bg-gray-50 p-8 rounded-lg justify-center">
          <h3 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
            Total Utility vs Marginal Utility
          </h3>
          <ResponsiveContainer width="100%" height={400}>
            <LineChart
              data={data}
              margin={{ top: 20, right: 30, left: 20, bottom: 60 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis
                dataKey="slice"
                stroke="#6b7280"
                fontSize={14}
                label={{
                  value: "Pizza Slices",
                  position: "insideBottom",
                  offset: -40,
                  style: {
                    textAnchor: "middle",
                    fontSize: "16px",
                    fontWeight: "bold",
                  },
                }}
              />
              <YAxis
                stroke="#6b7280"
                fontSize={14}
                label={{
                  value: "Utility",
                  angle: -90,
                  position: "insideLeft",
                  style: {
                    textAnchor: "middle",
                    fontSize: "16px",
                    fontWeight: "bold",
                  },
                }}
              />
              <Tooltip content={<CustomTooltip />} />

              {/* Total Utility Line */}
              <Line
                type="monotone"
                dataKey="totalUtility"
                stroke="#2563eb"
                strokeWidth={4}
                dot={{ fill: "#2563eb", strokeWidth: 2, r: 6 }}
                activeDot={{
                  r: 8,
                  fill: "#1d4ed8",
                  strokeWidth: 2,
                  stroke: "#ffffff",
                }}
                name="Total Utility"
              />

              {/* Marginal Utility Line */}
              <Line
                type="monotone"
                dataKey="marginalUtility"
                stroke="#10b981"
                strokeWidth={4}
                dot={{ fill: "#10b981", strokeWidth: 2, r: 6 }}
                activeDot={{
                  r: 8,
                  fill: "#059669",
                  strokeWidth: 2,
                  stroke: "#ffffff",
                }}
                name="Marginal Utility"
              />

              {/* Current Selection Reference Line */}
              <ReferenceLine
                x={selectedSlices}
                stroke="#dc2626"
                strokeDasharray="8 4"
                strokeWidth={3}
                label={{
                  value: `Slice ${selectedSlices}`,
                  position: "top",
                  style: {
                    fill: "#dc2626",
                    fontWeight: "bold",
                    fontSize: "14px",
                  },
                }}
              />

              {/* Zero Reference Line for Marginal Utility */}
              <ReferenceLine
                y={0}
                stroke="#374151"
                strokeWidth={2}
                strokeDasharray="2 2"
                label={{
                  value: "Zero Utility",
                  position: "right",
                  style: { fill: "#374151", fontSize: "12px" },
                }}
              />
            </LineChart>
          </ResponsiveContainer>

          {/* Current Values Display */}
          <div className="border-2 border-gray-300 p-3 rounded-lg max-w-2xl mx-auto">
            <div className="grid grid-cols-3 gap-6 text-center">
              <div>
                <p className="text-sm text-gray-600 mb-1">Slices</p>
                <p className="text-3xl font-bold text-purple-600">
                  {selectedSlices}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">MU</p>
                <p
                  className={`text-3xl font-bold ${
                    currentMarginalUtility >= 0
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  {currentMarginalUtility}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">TU</p>
                <p
                  className={`text-3xl font-bold ${
                    totalUtility >= 0 ? "text-blue-600" : "text-red-600"
                  }`}
                >
                  {totalUtility}
                </p>
              </div>
            </div>
          </div>

          {/* Chart Legend */}
          <div className="flex justify-center mt-4 space-x-8">
            <div className="flex items-center">
              <div className="w-4 h-1 bg-blue-600 mr-2"></div>
              <span className="text-sm font-medium text-gray-700">
                Total Utility
              </span>
            </div>
            <div className="flex items-center">
              <div className="w-4 h-1 bg-green-600 mr-2"></div>
              <span className="text-sm font-medium text-gray-700">
                Marginal Utility
              </span>
            </div>
            <div className="flex items-center">
              <div
                className="w-4 h-1 bg-red-600 mr-2"
                style={{ borderTop: "2px dashed" }}
              ></div>
              <span className="text-sm font-medium text-gray-700">
                Current Selection
              </span>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          height: 24px;
          width: 24px;
          border-radius: 50%;
          background: #8b5cf6;
          cursor: pointer;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
        }

        .slider::-moz-range-thumb {
          height: 24px;
          width: 24px;
          border-radius: 50%;
          background: #8b5cf6;
          cursor: pointer;
          border: none;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
        }
      `}</style>
    </div>
  );
};

const InteractivePizza = () => {
  const [selectedSlices, setSelectedSlices] = useState(1);

  // Calculate the total utility by summing the utilities of the selected slices.
  const totalUtility = marginalUtilities
    .slice(0, selectedSlices)
    .reduce((sum, util) => sum + util, 0);

  // --- SVG Helper Functions ---

  // Creates the "d" attribute for an SVG path, forming a pizza slice.
  const createSlicePath = (index: any, total = 8) => {
    const angle = (360 / total) * index;
    const nextAngle = (360 / total) * (index + 1);
    const centerX = 150;
    const centerY = 150;
    const radius = 120;

    const x1 = centerX + radius * Math.cos(((angle - 90) * Math.PI) / 180);
    const y1 = centerY + radius * Math.sin(((angle - 90) * Math.PI) / 180);
    const x2 = centerX + radius * Math.cos(((nextAngle - 90) * Math.PI) / 180);
    const y2 = centerY + radius * Math.sin(((nextAngle - 90) * Math.PI) / 180);

    return `M ${centerX} ${centerY} L ${x1} ${y1} A ${radius} ${radius} 0 0 1 ${x2} ${y2} Z`;
  };

  // Determines the fill color class for a slice based on its utility.
  const getSliceColorClass = (index: any) => {
    if (index >= selectedSlices) return "fill-gray-200"; // Unselected
    const utility = marginalUtilities[index];
    return utility >= 0 ? "fill-emerald-500" : "fill-red-500"; // Green for positive, red for negative
  };

  // Calculates the position for the utility number label inside each slice.
  const getLabelPosition = (index: any, total = 8) => {
    const angle = (360 / total) * index + 360 / total / 2;
    const centerX = 150;
    const centerY = 150;
    const labelRadius = 80;

    const x = centerX + labelRadius * Math.cos(((angle - 90) * Math.PI) / 180);
    const y = centerY + labelRadius * Math.sin(((angle - 90) * Math.PI) / 180);

    return { x, y };
  };

  return (
    <div>
      {/* Main layout: stacks on mobile, row on large screens */}
      <div className="flex flex-col lg:flex-row lg:gap-10">
        {/* Left Column: Pizza Visualization */}
        <div className="lg:w-1/2 flex-col justify-center items-center">
          <h1 className="text-3xl font-bold text-yellow-500 mb-4">
            Example: Pizza
          </h1>
          <div className="relative w-[300px] h-[300px] sm:w-[350px] sm:h-[350px] lg:w-full lg:h-auto lg:aspect-square">
            <svg viewBox="0 0 300 300" className="w-full h-full">
              {/* Render each pizza slice */}
              {Array.from({ length: 8 }).map((_, index) => (
                <g key={index}>
                  <path
                    d={createSlicePath(index)}
                    className={`${getSliceColorClass(
                      index
                    )} stroke-white stroke-2 transition-all duration-300`}
                  />
                  <text
                    x={getLabelPosition(index).x}
                    y={getLabelPosition(index).y}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    className="text-lg font-bold fill-white pointer-events-none"
                    style={{
                      filter: "drop-shadow(1px 1px 2px rgb(0 0 0 / 0.7))",
                    }}
                  >
                    {marginalUtilities[index]}
                  </text>
                </g>
              ))}
            </svg>
            {/* Legend */}
            <div className="flex justify-center space-x-6 text-sm text-gray-600 pt-2">
              <div className="flex items-center">
                <span className="inline-block w-3.5 h-3.5 bg-emerald-500 rounded-full mr-2 border border-emerald-600"></span>
                Positive Utility
              </div>
              <div className="flex items-center">
                <span className="inline-block w-3.5 h-3.5 bg-red-500 rounded-full mr-2 border border-red-600"></span>
                Negative Utility
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Controls and Information */}
        <div className="lg:w-1/2 flex flex-col justify-center space-y-6 mt-6 lg:mt-0">
          {/* Header */}
          <div className="space-y-4">
            <p className="text-lg">
              The{" "}
              <Emphasize>first slice tastes amazing (high utility)</Emphasize>{" "}
              since you're hungry and haven't had pizza in a while. The next
              slice is not quite as good, since you already have the taste in
              your mouth. As you keep going,{" "}
              <Emphasize>you become less and less satisfied</Emphasize> with
              pizza.
            </p>
            <p className="text-lg">
              Eventually, you may be{" "}
              <Emphasize>eating pizza on a full stomach</Emphasize>, providing
              negative utility. Drag the slider below to see what the optimal
              number of slices is.
            </p>
          </div>

          {/* Slider Control */}
          <div className="w-full">
            <label
              htmlFor="slices"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Number of Slices Eaten:{" "}
              <span className="font-bold text-lg text-violet-600">
                {selectedSlices}
              </span>
            </label>
            <input
              id="slices"
              type="range"
              min="1"
              max="8"
              value={selectedSlices}
              onChange={(e) => setSelectedSlices(parseInt(e.target.value))}
              className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-violet-600"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>1</span>
              <span>8</span>
            </div>
          </div>

          {/* Utility Summary Card */}
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">
              Your Satisfaction Summary
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">
                  Marginal Utility of Last Slice:
                </span>
                <span
                  className={`px-2 py-1 rounded text-sm font-semibold text-white ${
                    marginalUtilities[selectedSlices - 1] >= 0
                      ? "bg-emerald-500"
                      : "bg-red-500"
                  }`}
                >
                  {marginalUtilities[selectedSlices - 1]}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Total Utility:</span>
                <span
                  className={`font-bold text-2xl ${
                    totalUtility >= 0 ? "text-emerald-600" : "text-red-600"
                  }`}
                >
                  {totalUtility}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const UtilityGraph = () => {
  const utilityData = [
    { units: 0, totalUtility: 0 },
    { units: 1, totalUtility: 10 },
    { units: 2, totalUtility: 18 },
    { units: 3, totalUtility: 24 },
    { units: 4, totalUtility: 28 },
    { units: 5, totalUtility: 30 },
    { units: 6, totalUtility: 30 },
    { units: 7, totalUtility: 28 },
    { units: 8, totalUtility: 25 },
  ];

  const maxUtility = Math.max(...utilityData.map((item) => item.totalUtility));

  return (
    <ResponsiveContainer width="95%" height={400}>
      <LineChart
        data={utilityData}
        margin={{
          top: 20,
          right: 30,
          left: 20,
          bottom: 20,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          dataKey="units"
          type="number"
          label={{
            value: "Units Consumed",
            position: "insideBottom",
            offset: -10,
          }}
          domain={["dataMin", "dataMax"]}
        />
        <YAxis
          label={{ value: "Total Utility", angle: -90, position: "insideLeft" }}
        />
        <Tooltip formatter={(value, name) => [value, "Total Utility"]} />
        <Legend verticalAlign="top" height={36} />

        {/* 4. Line for Total Utility */}
        <Line
          type="monotone"
          dataKey="totalUtility"
          stroke="#8884d8"
          strokeWidth={3}
          activeDot={{ r: 8 }}
          name="Total Utility"
        />

        {/* 5. Horizontal ReferenceLine for Maximum Utility */}
        <ReferenceLine
          y={maxUtility}
          stroke="red"
          strokeDasharray="5 5"
          strokeWidth={2}
          label={{
            value: `Max Utility (${maxUtility})`,
            position: "insideTopRight",
            fill: "red",
            fontSize: 14,
          }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default function MarginalUtility() {
  const slides = [
    // Slide 1: Introduction
    <div className="space-y-4">
      <h1 className="text-4xl font-bold text-gray-800 mb-8">
        Utility Maximization
      </h1>
      <Block color="green" title="Learning Targets">
        <ul className="list-disc pl-6 space-y-2">
          <li>Learn about utility and marginal utility.</li>
          <li>Apply maximization in economics.</li>
          <li>Learn about greedy algorithms.</li>
        </ul>
        <p>
          In this lesson, we're going to start with the basics of what utility
          is and how it looks in economics. Then, we'll look into how utility is
          used in economics. We'll then learn about how this is an example of
          the greedy approach to problem solving. We'll end by piecing it all
          together in an interactive logic puzzle.
        </p>
        <h2 className="text-2xl font-bold">Finding the Maximum Utility</h2>
        <UtilityGraph />
        <p>
          By the end of the lesson, you'll have a good ideas of what this above
          graph means, but no need to worry about it just yet.
          <Emphasize>
            {" "}
            Click the arrow at the top right of the screen to continue with the
            lesson
          </Emphasize>
          .
        </p>
      </Block>
    </div>,

    // Slide 2: Utility Definition
    <Block color="blue" title="Utility">
      <p>
        <Emphasize>
          Utility is a measurement of how valuable something is.
        </Emphasize>{" "}
        For example, we might say that a box of wrenches provides more utility
        than a single wrench. Utility is measured in a (fun-to-pronounce) unit
        called
        <KeyTerm> utils</KeyTerm>.
      </p>
      <p>
        Utility <Emphasize>does not measure the monetary value</Emphasize> of
        goods or services, but more generally the
        <KeyTerm> "satisfaction"</KeyTerm> from those goods or services. For
        example, if you like chocolate ice cream more than vanilla ice cream,
        then chocolate ice cream has more utility for you than vanilla ice
        cream.
      </p>
      <ColorBox color="blue">
        This is a useful measurement because it allows us to make quantitative
        decisions about what we should do, which we'll see soon.
      </ColorBox>
      <p>You should think...</p>
      <ColorBox color="blue">
        <Emphasize>Utility = "Satisfaction" or "Happiness" </Emphasize>
      </ColorBox>
      <p>because it is measured in utils, not dollars.</p>
    </Block>,

    // Slide 3: Marginal Utility Definition
    <Block color="blue" title="Marginal Utility (MU)">
      <p>
        <Emphasize>
          Marginal utility is the utility of adding one item.
        </Emphasize>{" "}
        For example, if you have 3 slices of pizza and you eat one more slice,
        the marginal utility is the utility of that one last slice.
      </p>
      <p>
        If you are <Emphasize>very hungry</Emphasize>, the marginal utility of
        that slice might be very high. But if you are{" "}
        <Emphasize>already full</Emphasize>, the marginal utility might be very
        low.
      </p>
      <ColorBox color="yellow">
        One key concept is the...
        <span className="font-bold text-yellow-600 text-xl">
          {" "}
          Law of Diminishing Marginal Utility
        </span>
        , which states that as you have more items, the marginal utility of each
        item decreases.
      </ColorBox>
    </Block>,

    // Slide 4: Getting a feel for marginal utility.
    <section className="border-l-4 border-yellow-500 pl-6">
      <InteractivePizza />
    </section>,

    // Slide 5: Understanding the MU & TU graph.
    <Block color="yellow" title="Putting it Together in a Chart">
      <InteractiveChart>
        <div className="space-y-6">
          <p>
            Now let's see what these curves look like on a graph. The{" "}
            <Emphasize>blue Total Utility (TU) curve</Emphasize> shows the
            utility of all the slices up to that point. The{" "}
            <Emphasize>green Marginal Utility (TU) curve</Emphasize> shows the
            marginal utility of that particular slice.
          </p>
          <p>
            See if you can{" "}
            <Emphasize>
              explain why Marginal Utility (MU) is always decreasing
            </Emphasize>{" "}
            and why Total Utility (TU) goes up and then goes down. Specifically,
            find the relationship between the two curves.
          </p>
          <p>
            Note: Finding the maximum utility on the Total Utility curve is
            called <KeyTerm>Utility Maximization</KeyTerm>.
          </p>
          <p>
            <Emphasize>Use the slider</Emphasize> to select a different number
            of slices and hover over the graph to inspect different values.
          </p>
        </div>
      </InteractiveChart>
    </Block>,

    // Slide 6: Definition Check-in.
    <Block color="purple" title="Check In">
      <QuizQuestion
        question="What is utility?"
        choices={[
          {
            text: "A service like gas, electricity, and water.",
            isCorrect: false,
            explanation:
              "Not quite! While that may be true generally, in an economic context, utility refers to something else.",
          },
          {
            text: "A measurement of how valuable something is.",
            isCorrect: true,
            explanation:
              "Exactly! Utility is a measurement of satisfaction from a good or service.",
          },
          {
            text: "A measurement of how much something costs.",
            isCorrect: false,
            explanation:
              "This is a closely related concept called marginal cost, not marginal utility.",
          },
        ]}
      />
      <QuizQuestion
        question="What is marginal utility?"
        choices={[
          {
            text: "The utility of all the items.",
            isCorrect: false,
            explanation: "Not quite! That would be Total Utility.",
          },
          {
            text: "The average utility of the first and last items (the marginal items).",
            isCorrect: false,
            explanation:
              "Almost, but there's no averaging and we just need to consider one item.",
          },
          {
            text: "The utility of a particular item, usually the last item you bought or the next item you'll buy.",
            isCorrect: true,
            explanation:
              "Exactly! It is the utility from adding just one item.",
          },
        ]}
      />
      <QuizQuestion
        question="What is the Law of Diminishing Marginal Utility"
        choices={[
          {
            text: "As you have more items, the marginal utility of each item decreases.",
            isCorrect: true,
            explanation:
              "Exactly! The more we get, the less value each item has.",
          },
          {
            text: "As you have more items, the total utility increases.",
            isCorrect: false,
            explanation:
              "This isn't always true, since at some point, having more items will often provide negative utility.",
          },
          {
            text: "As you have more items, the total cost increases.",
            isCorrect: false,
            explanation:
              "Almost! The cost is often constant, but the value we get from each item decreases.",
          },
        ]}
      />
    </Block>,

    // Slide 7: Understanding choice deeper with MB & MC.
    <Block color="blue" title="Marginal Benefit and Marginal Cost">
      <p>
        Often, we don't just care about how much "satisfaction" or utility
        something gives us. We also sometimes{" "}
        <Emphasize>want to consider the cost</Emphasize>.
      </p>
      <p>
        This is where marginal benefit and marginal cost come in.
        <KeyTerm> Marginal Benefit (MB) </KeyTerm>
        is the amount of monetary value we get from one item.{" "}
        <Emphasize>
          It is just like Marginal Utility (MU), but measured in dollars instead
          of utils
        </Emphasize>
        .
      </p>
      <p>
        <KeyTerm>Marginal Cost (MC) </KeyTerm>
        <Emphasize>is the price of one item</Emphasize>. This is how much we
        have to pay to get the marginal benefit from that item.
      </p>
      <p>
        Here is an example chart, showing how many lemons we should buy for our
        lemonade stand.
      </p>
      <McMbChart />
      <p>
        Consider what would happen <Emphasize>if we bought 7 lemons</Emphasize>.
        The 7th lemon would have a MB of $6 and an MC of $8. That means{" "}
        <Emphasize>we would spend $8 to get $6 back in value</Emphasize>, which
        would not be good.
      </p>
      <p>
        However, <Emphasize>if we bought only 4 lemons</Emphasize>, we'd see
        that if we bought one more lemon, we would make $10 more for only the
        cost of $8. Since we could still get more value than the cost for
        another lemon, <Emphasize>we should have bought at least 5</Emphasize>.
      </p>
      <p>
        <Emphasize>
          Ponder what the intersection of Marginal Benefit (MB) and Marginal
          Cost (MC) means
        </Emphasize>{" "}
        and what the optimal quantity is for a general problem involving
        Marginal Benefit (MB) and Marginal Cost (MC).
      </p>
    </Block>,

    // Slide 8: Check-in on MB & MC
    <Block color="purple" title="Practice">
      <QuizQuestion
        question="Suppose you're a restaurant owner buying napkins. You determine that you bought 20,000 napkins and realize that the marginal benefit of the last napkins you bought was 0.4 cents. Also, the cost of the last pack of 2,000 napkins you bought was $11.75. Based on this information, which of the following best describes the quantity of napkins bought?"
        choices={[
          {
            text: "You should have bought more napkins.",
            isCorrect: false,
            explanation:
              "This isn't quite true. Try calculating the marginal benefit and marginal cost of the 20,000th napkin.",
          },
          {
            text: "You bought the right number of napkins.",
            isCorrect: false,
            explanation:
              "This isn't quite true. Try calculating the marginal benefit and marginal cost of the 20,000th napkin.",
          },
          {
            text: "You should have bought less napkins.",
            isCorrect: true,
            explanation:
              "Exactly. The marginal cost of each napkin is ~0.6 cents whereas the marginal benefit is 0.4 cents. This means the last napkin was not worth it, so you should have bought less.",
          },
          {
            text: "Not enough information.",
            isCorrect: false,
            explanation:
              "There is enough information. It's not given as a straightforward marginal cost and marginal benefit, but we can calculate it!",
          },
        ]}
      />
    </Block>,

    // Slide 9: Understanding choice deeper.
    <Block color="blue" title="Buying Multiple Items">
      <p>
        Imagine you were going to get{" "}
        <Emphasize>three scoops of ice cream</Emphasize>. You may really love
        chocolate ice cream, but because{" "}
        <Emphasize>
          each chocolate scoop provides you less and less utility
        </Emphasize>{" "}
        (Law of Decreasing Marginal Utility), you may want to get a chocolate
        scoop, and then pick another flavor.
      </p>
      <p>
        Notice that{" "}
        <Emphasize>
          after you pick one scoop, you would reconsider the utility of each
          flavor for the next scoop
        </Emphasize>
        . Below is an example table showing the Marginal Utility (MU) of each
        flavor of ice cream for each number of scoops you get.
      </p>
      <p>
        <Emphasize>Click the "Next Scoop" button</Emphasize> the table and see
        if you can{" "}
        <Emphasize>guess which scoop would be the next best pick</Emphasize>.
      </p>
      <IceCreamUtilityTable />
    </Block>,

    // Slide 10: Understanding price with choices.
    <Block color="blue" title="Buying Multiple Items with Different Prices">
      <p>
        Since each scoop of ice cream had one price, we could just pick the
        scoop with the highest marginal utility. However,{" "}
        <Emphasize>we must take price into account</Emphasize> when there are
        multiple prices or a budget.
      </p>
      <p>
        We use the <KeyTerm>Marginal Utility over Price (MU/P) ratio</KeyTerm>,
        which describes{" "}
        <Emphasize>how much value we are getting from each dollar</Emphasize> we
        spend. Let's apply it to an example.
      </p>
      <p>Here's the formula for our ratio:</p>

      {/* Formula Display */}
      <ColorBox color="blue">
        <div className="flex items-center justify-center gap-4">
          {/* Left Side: The Ratio */}
          <div className="text-2xl sm:text-3xl font-bold">MU/P Ratio</div>

          {/* Equals Sign */}
          <div className="text-3xl">=</div>

          {/* Right Side: The Fraction */}
          <div className="flex flex-col text-center">
            <span className="text-xl font-semibold px-2 pb-1">
              Marginal Utility (utils)
            </span>
            <span className="border-b-2 border-blue-700 w-full" />
            <span className="text-xl font-semibold px-2 pt-1">Price ($)</span>
          </div>
        </div>
      </ColorBox>
    </Block>,

    // Slide 11: Defining MU/P.
    <Block color="yellow" title="Practice: Marginal Utility over Price">
      <p>
        If ice cream wasn't enough, let's try some different desserts! Below is
        practice problem showing the marginal utility (MU) and price of each
        cupcake and cookie, so you can practice finding an optimal combination.
      </p>
      <ColorBox color="gray">
        <Emphasize>Instructions:</Emphasize>
        <ol className="list-decimal list-inside mt-2 space-y-1">
          <li>Calculate MU/P for each item (Marginal Utility ÷ Price)</li>
          <li>Click "Check Calculations & Start Shopping" when done</li>
          <li>
            Always choose the item with the highest MU/P ratio you can afford
          </li>
          <li>Watch your budget decrease and get feedback on your choices!</li>
        </ol>
      </ColorBox>
      <CupcakesCookiesUtilityTable />
    </Block>,

    // Slide 12: Introduction to the greedy approach.
    <Block color="blue" title="Greedy Approach">
      <p>
        <Emphasize>The greedy approach</Emphasize> is a way of solving
        optimization problems (like maximization) by making the immediately
        optimal choice at each step. In the context of utility maximization, it
        means{" "}
        <Emphasize>
          always choosing the item with the highest marginal utility over price
          (MU/P) ratio that you can afford
        </Emphasize>
        .
      </p>
      <p>
        This is a{" "}
        <Emphasize>
          useful tool to solve utility maximization problems on tests
        </Emphasize>
        . Plus, this works well in many problem solving scenarios.
      </p>
      <ColorBox color="blue">
        It's called "greedy" because it always wants the best immediate choice,
        without considering future consequences.
      </ColorBox>
      <p>
        <Emphasize>
          This approach works well for many problems, but it may not always
          yield the best choice
        </Emphasize>
        . However, for our dessert examples, it provided a simple and effective
        way to maximize your utility given a budget constraint.
      </p>
      <div className="border border-gray-300 text-lg text-gray-600 bg-gray-50 p-3 rounded-md">
        <Emphasize>
          (Bonus) More Applications of The Greedy Algorithm:
        </Emphasize>
        <ol className="list-decimal list-inside mt-2 space-y-1">
          <li>
            Finding nearly-optimal solutions to extremely difficult problems.
          </li>
          <li>Map routing algorithms, data compression, and more!</li>
          <li>
            Making change with the fewest number of coins (we'll see next).
          </li>
        </ol>
      </div>
    </Block>,

    // Slide 13: Getting a feel for the greedy approach.
    <Block color="yellow" title="The Change Problem">
      <div className="flex flex-col lg:flex-row lg:gap-10">
        <div className="lg:w-1/2 space-y-4 text-gray-700 leading-relaxed">
          <p>
            The change problem is a classic optimization problem where{" "}
            <Emphasize>
              you need to make change for a given amount using the fewest number
              of coins
            </Emphasize>
            . For example, if you need to make 63 cents using coins of 1, 5, 10,
            and 25 cents, the optimal solution would use:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>2 quarters (50 cents)</li>
            <li>1 dime (10 cents)</li>
            <li>1 nickel (5 cents)</li>
            <li>3 pennies (3 cents)</li>
          </ul>
          <p>
            This gives you a total of 7 coins, which is the fewest possible in
            this case.
          </p>
          <p>
            Let's{" "}
            <Emphasize>
              solve a 67 cent example on the right using a greedy approach
            </Emphasize>
            , by picking the largest coin that does not exceed the remaining
            amount until we have reached the desired change.
          </p>
        </div>
        <div className="lg:w-1/2">
          <CoinPickingExample
            coins={[25, 10, 5, 1]}
            initialAmount={67}
            greedyStrict={true}
            key="1"
          />
        </div>
      </div>
    </Block>,

    // Slide 14: Finding a drawback to the greedy approach.
    <Block color="yellow" title="The Problematic Change Problem">
      <div className="flex flex-col lg:flex-row lg:gap-10">
        <div className="lg:w-1/2 space-y-4 text-gray-700 leading-relaxed">
          <p>
            The{" "}
            <Emphasize>
              greedy approach works well for many problems, but it can fail in
              some cases
            </Emphasize>
            . The US coins lend themselves to a greedy solution, but not all
            coin systems do. For example, consider a coin system with coins of
            1, 3, and 4 cents. If you were trying to make 6 cents of change, the
            greedy approach would give you 3 coins, but the optimal solution is
            2 coins.
          </p>
          <p>
            <Emphasize>
              Explore different ways of making 6 cents of change with the
              interactive module
            </Emphasize>
            . Figure out what the greedy solution and the best solution are and
            ponder why the greedy solution breaks down.
          </p>
          <p>
            This shows that the greedy approach does not always yield the best
            solution. However,{" "}
            <Emphasize>
              the greedy approach is still a useful tool for many problems
            </Emphasize>
            , especially when the problem has a structure that allows for a
            greedy solution.
          </p>
        </div>
        <div className="lg:w-1/2">
          <CoinPickingExample
            coins={[1, 3, 4]}
            initialAmount={6}
            greedyStrict={false}
            key="2"
          />
        </div>
      </div>
    </Block>,

    // Slide 15: Listed constraints.
    <Block color="blue" title="How You Know If You Can Be Greedy">
      <p>
        We've seen a few examples where the greedy approach works and one where
        it breaks down. Let's look at how we know if the greedy approach will
        work in utility maximization.
      </p>
      <p>
        <Emphasize>
          Constraints: you know the greedy approach works if...
        </Emphasize>
      </p>
      <ul className="list-disc pl-6 space-y-2">
        <li>There are two items to choose from.</li>
        <li>You spend your whole budget.</li>
        <li>
          When you're done, the MU/P ratios for the last purchased items had the
          same values.
        </li>
      </ul>
    </Block>,

    // Slide 16: Check-in on greedy approach.
    <Block color="purple" title="Greedy Check In">
      <p>
        Test your understanding of utility maximization and the greedy approach
        with this quiz. Answer the questions below to check your knowledge.
      </p>
      <QuizQuestion
        question="How does the greedy approach apply to utility maximization?"
        choices={[
          {
            text: "The greedy approach is the solution to utility maximization problems.",
            isCorrect: false,
            explanation:
              "Not quite! The greedy approach is a more general problem solving technique and there are certain cases where it does not work in utility optimization.",
          },
          {
            text: "The greedy approach is a problem solving strategy and we can often use it to find the maximal utility.",
            isCorrect: true,
            explanation: "Exactly!",
          },
          {
            text: "The greedy approach means maximizing utility that's what utility maximization is, so they are the same thing.",
            isCorrect: false,
            explanation:
              "Not quite! The greedy approach is a technique to solving maximization problems, but utility maximization is a specific type of problem in economics that the greedy approach applies to.",
          },
        ]}
      />
    </Block>,

    // Section 15: Coding it up.
    <Block color="yellow" title="Try Coding it up Yourself!" mode="pickcode">
      <iframe
        id="inlinePickcodePlugin"
        title="Code Up a Greedy Algorithm"
        width="100%"
        style={{ height: "calc(100vh - 100px)" }}
        src="https://dev.pickcode.io/lesson/marginal-utility-optimization-lesson-cmcdpn8cs000ek3y1wegxmemi-2025-06-26-11-46-41"
      ></iframe>
    </Block>,

    // Slide 18: Recap.
    <Block color="blue" title="Recap">
      <p>
        First, we learned about the meaning of <KeyTerm>utility</KeyTerm> and{" "}
        <KeyTerm>marginal utility</KeyTerm>. Utility means the "value" or
        satisfaction you get from something. Marginal Utility (MU) is the
        utility from adding one particular item (usually the next item, or the
        last item). Utility is measured in <KeyTerm>utils</KeyTerm>.
      </p>
      <p>
        Next, we learned about how utility would look in a{" "}
        <KeyTerm>chart</KeyTerm> and <KeyTerm>table</KeyTerm>. It's important to
        remember that the marginal utility curve is the slope of the total
        utility curve. Also, by the{" "}
        <KeyTerm> Law of Diminishing Marginal Utility</KeyTerm>, the marginal
        utility goes down the more of that item you get.
      </p>
      <p>
        Then, we learned about metrics when we have concrete dollar values. We
        can use the <KeyTerm>Marginal Benefit</KeyTerm> (dollar value of one
        item) and <KeyTerm>Marginal Cost</KeyTerm> (dollar cost of one item) to
        determine when we should stop buying.
        <Emphasize>
          {" "}
          We should buy as long as Marginal Benefit &ge; Marginal Cost
        </Emphasize>
        .
      </p>
      <p>
        Then, we learned how to use a greedy algorithm to make decisions about{" "}
        <KeyTerm>utility maximization</KeyTerm>. Using the greedy algorithm, we
        pick the next best option at each step. The next best option is the
        option with the highest{" "}
        <KeyTerm>MU/P ratio of Marginal Utility (MU) to Price (P)</KeyTerm>
      </p>
      <p>
        Finally, we learned the{" "}
        <KeyTerm>logic behind the greedy algorithm</KeyTerm> and the{" "}
        <KeyTerm>drawbacks</KeyTerm> associated with the greedy algorithm.
      </p>
    </Block>,
  ];

  return <Lesson slides={slides}></Lesson>;
}
