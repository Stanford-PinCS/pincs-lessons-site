"use client";
import React, { useState, useRef, useMemo } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';

const marginalUtilities = [10, 7, 4, 1, -2, -5, -8, -11];

interface CoinPickingExampleProps {
  coins: number[];
  initialAmount: number;
}

interface CoinPickingExampleProps {
  coins: number[];
  initialAmount: number;
  greedyStrict?: boolean; // If true, enforces picking the largest possible coin
}

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
  const progressPercent = initialAmount > 0 ? (changeMade / initialAmount) * 100 : 0;

  const sortedCoins = useMemo(() => [...coins].sort((a, b) => b - a), [coins]);

  function showFeedback(message: string) {
    if (feedbackTimerRef.current) clearTimeout(feedbackTimerRef.current);
    setFeedback(message);
    feedbackTimerRef.current = setTimeout(() => setFeedback(null), 3000);
  }

  function useCoin(clickedCoin: number) {
    setFeedback(null); // Clear feedback on any new valid action

    if (greedyStrict) {
      const greedyChoice = sortedCoins.find(c => c <= changeLeft);
      if (greedyChoice && clickedCoin < greedyChoice) {
        showFeedback(`Try picking the largest possible coin: ${greedyChoice}.`);
        return;
      }
    }

    setChangeMade(prev => prev + clickedCoin);
    setCoinsUsed(prev => [...prev, clickedCoin].sort((a, b) => b - a));
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
          <h1 className="text-3xl font-bold text-slate-800">Cashier Change Demo</h1>
          <p className="text-slate-500 mt-1">
            Click coins to make change for <span className="font-bold text-slate-700">{initialAmount}</span>
          </p>
        </div>

        {/* Available Coins Section */}
        <div className="relative"> {/* Parent for absolute positioning of feedback */}
          <h2 className="text-xs font-semibold text-slate-500 uppercase tracking-wider pb-4">Available Coins</h2>
          <div className="flex flex-wrap justify-center gap-4">
            {sortedCoins.map((coin, index) => (
              <button
                key={index}
                onClick={() => useCoin(coin)}
                disabled={changeLeft < coin}
                className={`
                  w-16 h-16 rounded-full flex items-center justify-center text-xl font-medium text-slate-700
                  bg-slate-200 transition-colors duration-200
                  hover:enabled:bg-slate-300
                  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-400
                  disabled:bg-slate-100 disabled:text-slate-400 disabled:cursor-not-allowed
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
        {feedback && (
          <div className="h-8"></div>
        )}

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
            <span className={`text-3xl font-bold ${changeLeft > 0 ? 'text-slate-800' : 'text-green-600'}`}>
              {changeLeft}
            </span>
          </div>

          <div className="space-y-3">
            <h2 className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Coins Used ({coinsUsed.length})</h2>
            <div className="bg-slate-50 p-4 rounded-lg min-h-[5rem] flex flex-wrap gap-2 items-start">
              {coinsUsed.length > 0 ? (
                coinsUsed.map((coin, index) => (
                  <div key={index} className="w-8 h-8 flex items-center justify-center bg-blue-100 text-blue-800 text-sm font-semibold rounded-full">
                    {coin}
                  </div>
                ))
              ) : (
                <span className="text-slate-400 italic self-center mx-auto">No coins used yet.</span>
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
  type Item = 'cupcakes' | 'cookies';
  type FeedbackType = 'correct' | 'incorrect' | '';

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
    cookies: 0
  });
  const [muPerDollar, setMuPerDollar] = useState<MuValues>({
    cupcakes: ['', '', ''],
    cookies: ['', '', '']
  });
  const [isTableLocked, setIsTableLocked] = useState<boolean>(false);
  const [feedback, setFeedback] = useState<string>('');
  const [feedbackType, setFeedbackType] = useState<FeedbackType>('');

  // Fixed data is typed to match the defined interfaces and types
  const itemData: ItemData = {
    cupcakes: {
      price: 3,
      marginalUtility: [18, 15, 6],
      color: 'bg-green-200'
    },
    cookies: {
      price: 2,
      marginalUtility: [8, 6, 2],
      color: 'bg-green-200'
    }
  };

  const correctMuPerDollar: CorrectMuValues = {
    cupcakes: [6, 5, 2],
    cookies: [4, 3, 1]
  };

  // Function parameters are typed, and the return type is specified as 'void'
  const handleMuPerDollarChange = (item: Item, index: number, value: string): void => {
    if (isTableLocked) return;
    
    setMuPerDollar(prev => ({
      ...prev,
      [item]: prev[item].map((val, i) => (i === index ? value : val))
    }));
  };

  // The function's return type is explicitly defined
  const checkMuPerDollarCalculations = (): { allCorrect: boolean; incorrectItems: string[] } => {
    let allCorrect = true;
    let incorrectItems: string[] = [];
    
    // Using a type assertion to safely iterate over object keys
    (Object.keys(muPerDollar) as Item[]).forEach(item => {
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
    if (!isTableLocked && muPerDollar[item][index] !== '') {
      const inputValue = parseFloat(muPerDollar[item][index]);
      const correctValue = correctMuPerDollar[item][index];
      
      if (!isNaN(inputValue) && Math.abs(inputValue - correctValue) <= 0.01) {
        return 'border-green-500 bg-green-50';
      } else if (!isNaN(inputValue)) {
        return 'border-red-500 bg-red-50';
      }
    }
    return '';
  };

  const lockTable = (): void => {
    const allFilled = Object.values(muPerDollar).every(arr => 
      arr.every(val => val !== '')
    );
    
    if (!allFilled) {
      setFeedback('Please fill in all MU/P values before locking the table.');
      setFeedbackType('incorrect');
      return;
    }
    
    const { allCorrect, incorrectItems } = checkMuPerDollarCalculations();
    
    if (!allCorrect) {
      setFeedback(`Incorrect calculations detected for: ${incorrectItems.join(', ')}. Please double-check your MU/P calculations (MU ÷ Price).`);
      setFeedbackType('incorrect');
      return;
    }
    
    setIsTableLocked(true);
    setFeedback('✅ All calculations correct! Table locked. Now select the optimal items to purchase.');
    setFeedbackType('correct');
  };

  const getCurrentMuPerDollar = (item: Item): number => {
    const currentCount = purchaseCounts[item];
    if (currentCount >= 3) return 0;
    
    const inputValue = parseFloat(muPerDollar[item][currentCount]);
    return isNaN(inputValue) ? 0 : inputValue;
  };

  // Return type can be 'Item' or 'null'
  const getOptimalChoice = (): Item | null => {
    const cupcakeMuPerDollar = getCurrentMuPerDollar('cupcakes');
    const cookieMuPerDollar = getCurrentMuPerDollar('cookies');
    
    const canAffordCupcake = budget >= itemData.cupcakes.price && purchaseCounts.cupcakes < 3;
    const canAffordCookie = budget >= itemData.cookies.price && purchaseCounts.cookies < 3;
    
    if (!canAffordCupcake && !canAffordCookie) return null;
    if (!canAffordCupcake) return 'cookies';
    if (!canAffordCookie) return 'cupcakes';
    
    return cupcakeMuPerDollar >= cookieMuPerDollar ? 'cupcakes' : 'cookies';
  };

  const handlePurchase = (item: Item): void => {
    if (!isTableLocked) {
      setFeedback('Please calculate and lock the MU/P values first!');
      setFeedbackType('incorrect');
      return;
    }

    const price = itemData[item].price;
    
    if (budget < price) {
      setFeedback(`Not enough budget! You need $${price} but only have $${budget}.`);
      setFeedbackType('incorrect');
      return;
    }
    
    if (purchaseCounts[item] >= 3) {
      setFeedback(`You can't buy more than 3 ${item}!`);
      setFeedbackType('incorrect');
      return;
    }

    const optimalChoice = getOptimalChoice();
    
    if (item === optimalChoice) {
      setBudget(prev => prev - price);
      setPurchases(prev => [...prev, item]);
      setPurchaseCounts(prev => ({
        ...prev,
        [item]: prev[item] + 1
      }));
      if (budget > 0) {
        setFeedback(`Correct! ${item.charAt(0).toUpperCase() + item.slice(1)} had the highest MU/P ratio.`);
      } else {
        setFeedback(`Correct! ${item.charAt(0).toUpperCase() + item.slice(1)} had the highest MU/P ratio. Now you've spent your whole budget! Horray!`);
      }
      setFeedbackType('correct');
    } else {
      setFeedback(`Incorrect! The optimal choice is ${optimalChoice} (higher MU/P ratio).`);
      setFeedbackType('incorrect');
    }
  };

  const reset = (): void => {
    setBudget(originalBudget);
    setPurchases([]);
    setPurchaseCounts({ cupcakes: 0, cookies: 0 });
    setMuPerDollar({ cupcakes: ['', '', ''], cookies: ['', '', ''] });
    setIsTableLocked(false);
    setFeedback('');
    setFeedbackType('');
  };

  const getHighlightClass = (item: Item, index: number): string => {
    if (purchaseCounts[item] > index) {
      return `${itemData[item].color} font-bold`;
    }
    return '';
  };

  const allPossiblePurchasesMade = (): boolean => {
    const optimalChoice = getOptimalChoice();
    return optimalChoice === null;
  };

  return (
    <div className="space-y-4 text-gray-700 leading-relaxed max-w-5xl mx-auto p-6">

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Quantity</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">
                <div className="text-center">
                  <div>🧁 Cupcakes</div>
                  <div className="text-xs text-gray-500">Price: $3</div>
                </div>
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">
                <div className="text-center">
                  <div>🍪 Cookies</div>
                  <div className="text-xs text-gray-500">Price: $2</div>
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="bg-blue-50">
              <td className="px-4 py-3 border-b border-gray-200 font-medium">Marginal Utility</td>
              <td className="px-4 py-3 border-b border-gray-200 text-center">
                <div className="flex justify-center space-x-2">
                  {itemData.cupcakes.marginalUtility.map((mu, index) => (
                    <span key={index} className="px-2 py-1 bg-white rounded">#{index + 1}: {mu}</span>
                  ))}
                </div>
              </td>
              <td className="px-4 py-3 border-b border-gray-200 text-center">
                <div className="flex justify-center space-x-2">
                  {itemData.cookies.marginalUtility.map((mu, index) => (
                    <span key={index} className="px-2 py-1 bg-white rounded">#{index + 1}: {mu}</span>
                  ))}
                </div>
              </td>
            </tr>
            
            <tr className="bg-yellow-50">
              <td className="px-4 py-3 border-b border-gray-200 font-medium">MU/P (Calculate!)</td>
              <td className="px-4 py-3 border-b border-gray-200 text-center">
                <div className="flex justify-center space-x-2">
                  {muPerDollar.cupcakes.map((value, index) => (
                    <input
                      key={index}
                      type="number"
                      value={value}
                      // Event handlers in JSX are typed for better developer experience
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleMuPerDollarChange('cupcakes', index, e.target.value)}
                      disabled={isTableLocked}
                      className={`w-16 px-2 py-1 border rounded text-center ${
                        isTableLocked ? 'bg-gray-100' : 'bg-white'
                      } ${getHighlightClass('cupcakes', index)} ${getInputBorderClass('cupcakes', index)}`}
                      placeholder="?"
                    />
                  ))}
                </div>
              </td>
              <td className="px-4 py-3 border-b border-gray-200 text-center">
                <div className="flex justify-center space-x-2">
                  {muPerDollar.cookies.map((value, index) => (
                    <input
                      key={index}
                      type="number"
                      step="0.1"
                      value={value}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleMuPerDollarChange('cookies', index, e.target.value)}
                      disabled={isTableLocked}
                      className={`w-16 px-2 py-1 border rounded text-center ${
                        isTableLocked ? 'bg-gray-100' : 'bg-white'
                      } ${getHighlightClass('cookies', index)} ${getInputBorderClass('cookies', index)}`}
                      placeholder="?"
                    />
                  ))}
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      
      <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
        <h2 className="text-xl font-bold mb-2">Marginal Utility Per Dollar Exercise</h2>
        <p className="text-sm mb-4">
          Calculate the marginal utility per dollar (MU/P) for each item, then make optimal purchasing decisions based on your budget.
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
                  onClick={() => handlePurchase('cupcakes')}
                  disabled={allPossiblePurchasesMade()}
                  className={`px-4 py-2 rounded-md transition-colors ${
                    allPossiblePurchasesMade() 
                      ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
                      : 'bg-pink-500 text-white hover:bg-pink-600'
                  }`}
                >
                  Buy Cupcake ($3)
                </button>
                <button 
                  onClick={() => handlePurchase('cookies')}
                  disabled={allPossiblePurchasesMade()}
                  className={`px-4 py-2 rounded-md transition-colors ${
                    allPossiblePurchasesMade() 
                      ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
                      : 'bg-amber-500 text-white hover:bg-amber-600'
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
            <div className="text-lg font-bold text-green-700">Budget: ${budget}</div>
            <div className="text-sm text-gray-600">Spent: ${originalBudget - budget}</div>
          </div>
        </div>
        
        {feedback && (
          <div className={`p-3 rounded-md flex items-center space-x-2 ${
            feedbackType === 'correct' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
          }`}>
            <span className="text-xl">
              {feedbackType === 'correct' ? '✅' : '❌'}
            </span>
            <span>{feedback}</span>
          </div>
        )}
        
        {purchases.length > 0 && (
          <div className="mt-4 p-3 bg-gray-50 rounded-md">
            <span className="font-medium">Your purchases: </span>
            {purchases.map((item, index) => (
              <span key={index} className="inline-block mx-1 px-2 py-1 rounded text-sm bg-white border">
                {item.charAt(0).toUpperCase() + item.slice(1, -1)} ${itemData[item].price}
              </span>
            ))}
          </div>
        )}
      </div>
      
    </div>
  );
}

const IceCreamUtilityTable = () => {
  const [scoopCount, setScoopCount] = useState(0);
  const [totalUtility, setTotalUtility] = useState(0);
  const [selectedScoops, setSelectedScoops] = useState<Flavor[]>([]);
  type Flavor = 'chocolate' | 'vanilla' | 'strawberry';

  const [scoopCounts, setScoopCounts] = useState<Record<Flavor, number>>({
    chocolate: 0,
    vanilla: 0,
    strawberry: 0
  });

  const utilityData: Record<Flavor, number[]> = {
    chocolate: [10, 7, 4],
    vanilla: [2, 1, 0],
    strawberry: [9, 6, 3]
  };

  const flavorColors: Record<Flavor, string> = {
    chocolate: 'bg-amber-700',
    vanilla: 'bg-yellow-200 border-2 border-yellow-600',
    strawberry: 'bg-pink-300'
  };

  const getCurrentUtility = (flavor: Flavor) => {
    const currentCount = scoopCounts[flavor];
    return currentCount < 3 ? utilityData[flavor][currentCount] : 0;
  };

  const getHighestUtilityFlavor = () => {
    const utilities: Record<Flavor, number> = {
      chocolate: getCurrentUtility('chocolate'),
      vanilla: getCurrentUtility('vanilla'),
      strawberry: getCurrentUtility('strawberry')
    };
    
    return (Object.keys(utilities) as Flavor[]).reduce((a, b) => 
      utilities[a] > utilities[b] ? a : b
    );
  };

  const handleNextScoop = () => {
    if (scoopCount >= 3) return;
    
    const selectedFlavor = getHighestUtilityFlavor();
    const utility = getCurrentUtility(selectedFlavor);
    
    setScoopCount(prev => prev + 1);
    setTotalUtility(prev => prev + utility);
    setSelectedScoops(prev => [...prev, selectedFlavor]);
    setScoopCounts(prev => ({
      ...prev,
      [selectedFlavor]: prev[selectedFlavor] + 1
    }));
  };

  const reset = () => {
    setScoopCount(0);
    setTotalUtility(0);
    setSelectedScoops([]);
    setScoopCounts({
      chocolate: 0,
      vanilla: 0,
      strawberry: 0
    });
  };

  const getHighlightClass = (flavor: Flavor, scoopIndex: number) => {
    if (scoopCounts[flavor] > scoopIndex) {
      if (flavor === 'vanilla') {
        return `${flavorColors[flavor]} text-black font-bold`;
      }
      return `${flavorColors[flavor]} text-white font-bold`;
    }
    return '';
  };

  return (
    <div className="space-y-4 text-gray-700 leading-relaxed max-w-4xl mx-auto p-6">
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700"># of Scoops</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">
                <div className="flex items-center space-x-2">
                  <span>Chocolate</span>
                  <div className={`w-4 h-4 rounded-full ${flavorColors.chocolate}`}></div>
                </div>
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">
                <div className="flex items-center space-x-2">
                  <span>Vanilla</span>
                  <div className={`w-4 h-4 rounded-full ${flavorColors.vanilla}`}></div>
                </div>
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">
                <div className="flex items-center space-x-2">
                  <span>Strawberry</span>
                  <div className={`w-4 h-4 rounded-full ${flavorColors.strawberry}`}></div>
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="hover:bg-gray-50 transition-colors duration-200">
              <td className="px-6 py-4 border-b border-gray-200 font-medium">1st Scoop MU (utils)</td>
              <td className={`px-6 py-4 border-b border-gray-200 transition-colors duration-300 ${getHighlightClass('chocolate', 0)}`}>
                10
              </td>
              <td className={`px-6 py-4 border-b border-gray-200 transition-colors duration-300 ${getHighlightClass('vanilla', 0)}`}>
                2
              </td>
              <td className={`px-6 py-4 border-b border-gray-200 transition-colors duration-300 ${getHighlightClass('strawberry', 0)}`}>
                9
              </td>
            </tr>
            <tr className="hover:bg-gray-50 transition-colors duration-200">
              <td className="px-6 py-4 border-b border-gray-200 font-medium">2nd Scoop MU (utils)</td>
              <td className={`px-6 py-4 border-b border-gray-200 transition-colors duration-300 ${getHighlightClass('chocolate', 1)}`}>
                7
              </td>
              <td className={`px-6 py-4 border-b border-gray-200 transition-colors duration-300 ${getHighlightClass('vanilla', 1)}`}>
                1
              </td>
              <td className={`px-6 py-4 border-b border-gray-200 transition-colors duration-300 ${getHighlightClass('strawberry', 1)}`}>
                6
              </td>
            </tr>
            <tr className="hover:bg-gray-50 transition-colors duration-200">
              <td className="px-6 py-4 border-b border-gray-200 font-medium">3rd Scoop MU (utils)</td>
              <td className={`px-6 py-4 border-b border-gray-200 transition-colors duration-300 ${getHighlightClass('chocolate', 2)}`}>
                4
              </td>
              <td className={`px-6 py-4 border-b border-gray-200 transition-colors duration-300 ${getHighlightClass('vanilla', 2)}`}>
                0
              </td>
              <td className={`px-6 py-4 border-b border-gray-200 transition-colors duration-300 ${getHighlightClass('strawberry', 2)}`}>
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
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
                  : 'bg-blue-600 text-white hover:bg-blue-700'
              }`}
            >
              {scoopCount >= 3 ? 'Out of Scoops' : 'Next Scoop'}
            </button>
            <button 
              onClick={reset}
              className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition-colors"
            >
              Reset
            </button>
          </div>
          <div className="text-right">
            <div className="text-sm text-gray-600">Scoops Selected: {scoopCount}/3</div>
            <div className="text-lg font-bold text-blue-700">Total Utility: {totalUtility} utils</div>
          </div>
        </div>
        
        {/* Selected Scoops Display */}
        {selectedScoops.length > 0 && (
          <div className="flex items-center space-x-2">
            <span className="text-sm font-medium">Your scoops:</span>
            {selectedScoops.map((flavor, index) => (
              <div key={index} className="flex items-center space-x-1">
                <div className={`w-6 h-6 rounded-full ${flavorColors[flavor]}`}></div>
                <span className="text-sm capitalize">{flavor}</span>
                {index < selectedScoops.length - 1 && <span className="text-gray-400">→</span>}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

const InteractiveChart = () => {
  const [selectedSlices, setSelectedSlices] = useState(1);
  
  const totalUtility = marginalUtilities.slice(0, selectedSlices).reduce((sum, util) => sum + util, 0);
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
      isSelected: i < selectedSlices
    });
  }


  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active){// && payload && payload.length) {
      return (
        <div className="bg-white p-4 border border-gray-300 rounded shadow-lg">
          <p className="font-semibold text-gray-800 mb-2">{`Slice ${label}`}</p>
          {payload.map((entry: { color: string; name: string; value: number }, index: React.Key | null | undefined) => (
            <p key={index} style={{ color: entry.color }} className="font-medium">
              {`${entry.name}: ${entry.value}`}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">
        Interactive Utility Analysis
      </h1>
      
      <div className="space-y-8">
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

        {/* Current Values Display */}
        <div className="bg-gradient-to-r from-blue-50 to-green-50 p-6 rounded-lg max-w-2xl mx-auto">
          <div className="grid grid-cols-3 gap-6 text-center">
            <div>
              <p className="text-sm text-gray-600 mb-1">Slices Consumed</p>
              <p className="text-3xl font-bold text-purple-600">{selectedSlices}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-1">Marginal Utility</p>
              <p className={`text-3xl font-bold ${currentMarginalUtility >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {currentMarginalUtility}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-1">Total Utility</p>
              <p className={`text-3xl font-bold ${totalUtility >= 0 ? 'text-blue-600' : 'text-red-600'}`}>
                {totalUtility}
              </p>
            </div>
          </div>
        </div>

        {/* Combined Chart */}
        <div className="bg-gray-50 p-8 rounded-lg">
          <h3 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
            Total Utility vs Marginal Utility
          </h3>
          <ResponsiveContainer width="100%" height={500}>
            <LineChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 60 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis 
                dataKey="slice" 
                stroke="#6b7280"
                fontSize={14}
                label={{ value: 'Pizza Slices', position: 'insideBottom', offset: -40, style: { textAnchor: 'middle', fontSize: '16px', fontWeight: 'bold' } }}
              />
              <YAxis 
                stroke="#6b7280"
                fontSize={14}
                label={{ value: 'Utility', angle: -90, position: 'insideLeft', style: { textAnchor: 'middle', fontSize: '16px', fontWeight: 'bold' } }}
              />
              {/* <Tooltip content={<CustomTooltip />} /> */}
              
              {/* Total Utility Line */}
              <Line 
                type="monotone" 
                dataKey="totalUtility" 
                stroke="#2563eb" 
                strokeWidth={4}
                dot={{ fill: '#2563eb', strokeWidth: 2, r: 6 }}
                activeDot={{ r: 8, fill: '#1d4ed8', strokeWidth: 2, stroke: '#ffffff' }}
                name="Total Utility"
              />
              
              {/* Marginal Utility Line */}
              <Line 
                type="monotone" 
                dataKey="marginalUtility" 
                stroke="#10b981" 
                strokeWidth={4}
                dot={{ fill: '#10b981', strokeWidth: 2, r: 6 }}
                activeDot={{ r: 8, fill: '#059669', strokeWidth: 2, stroke: '#ffffff' }}
                name="Marginal Utility"
              />
              
              {/* Current Selection Reference Line */}
              <ReferenceLine 
                x={selectedSlices} 
                stroke="#dc2626" 
                strokeDasharray="8 4" 
                strokeWidth={3}
                label={{ value: `Slice ${selectedSlices}`, position: 'top', style: { fill: '#dc2626', fontWeight: 'bold', fontSize: '14px' } }}
              />
              
              {/* Zero Reference Line for Marginal Utility */}
              <ReferenceLine 
                y={0} 
                stroke="#374151" 
                strokeWidth={2}
                strokeDasharray="2 2"
                label={{ value: 'Zero Utility', position: 'right', style: { fill: '#374151', fontSize: '12px' } }}
              />
              <Tooltip content={<CustomTooltip />} />
            </LineChart>
          </ResponsiveContainer>
          
          {/* Chart Legend */}
          <div className="flex justify-center mt-4 space-x-8">
            <div className="flex items-center">
              <div className="w-4 h-1 bg-blue-600 mr-2"></div>
              <span className="text-sm font-medium text-gray-700">Total Utility</span>
            </div>
            <div className="flex items-center">
              <div className="w-4 h-1 bg-green-600 mr-2"></div>
              <span className="text-sm font-medium text-gray-700">Marginal Utility</span>
            </div>
            <div className="flex items-center">
              <div className="w-4 h-1 bg-red-600 mr-2" style={{borderTop: '2px dashed'}}></div>
              <span className="text-sm font-medium text-gray-700">Current Selection</span>
            </div>
          </div>
        </div>

        {/* Educational Insights */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-blue-50 p-6 rounded-lg">
            <h4 className="font-semibold text-blue-800 mb-3 text-lg">Key Observations:</h4>
            <ul className="text-sm text-blue-700 space-y-2">
              <li>• <strong>Total Utility</strong> (blue) rises then falls as consumption increases</li>
              <li>• <strong>Marginal Utility</strong> (green) consistently decreases (diminishing returns)</li>
              <li>• When marginal utility hits zero, total utility peaks</li>
              <li>• Negative marginal utility reduces total satisfaction</li>
            </ul>
          </div>
          
          <div className="bg-green-50 p-6 rounded-lg">
            <h4 className="font-semibold text-green-800 mb-3 text-lg">Economic Principles:</h4>
            <ul className="text-sm text-green-700 space-y-2">
              <li>• <strong>Law of Diminishing Marginal Utility:</strong> Each additional unit provides less satisfaction</li>
              <li>• <strong>Optimal Consumption:</strong> Stop when marginal utility approaches zero</li>
              <li>• <strong>Overconsumption:</strong> Negative marginal utility reduces total welfare</li>
              <li>• <strong>Consumer Choice:</strong> Rational consumers maximize total utility</li>
            </ul>
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
          box-shadow: 0 2px 4px rgba(0,0,0,0.2);
        }
        
        .slider::-moz-range-thumb {
          height: 24px;
          width: 24px;
          border-radius: 50%;
          background: #8b5cf6;
          cursor: pointer;
          border: none;
          box-shadow: 0 2px 4px rgba(0,0,0,0.2);
        }
      `}</style>
    </div>
  );
};

const InteractivePizza = () => {
  const [selectedSlices, setSelectedSlices] = useState(1);

  // Calculate the total utility by summing the utilities of the selected slices.
  const totalUtility = marginalUtilities.slice(0, selectedSlices).reduce((sum, util) => sum + util, 0);

  // --- SVG Helper Functions ---

  // Creates the "d" attribute for an SVG path, forming a pizza slice.
  const createSlicePath = (index: any, total = 8) => {
    const angle = (360 / total) * index;
    const nextAngle = (360 / total) * (index + 1);
    const centerX = 150;
    const centerY = 150;
    const radius = 120;
    
    const x1 = centerX + radius * Math.cos((angle - 90) * Math.PI / 180);
    const y1 = centerY + radius * Math.sin((angle - 90) * Math.PI / 180);
    const x2 = centerX + radius * Math.cos((nextAngle - 90) * Math.PI / 180);
    const y2 = centerY + radius * Math.sin((nextAngle - 90) * Math.PI / 180);
    
    return `M ${centerX} ${centerY} L ${x1} ${y1} A ${radius} ${radius} 0 0 1 ${x2} ${y2} Z`;
  };
  
  // Determines the fill color class for a slice based on its utility.
  const getSliceColorClass = (index: any) => {
    if (index >= selectedSlices) return 'fill-gray-200'; // Unselected
    const utility = marginalUtilities[index];
    return utility >= 0 ? 'fill-emerald-500' : 'fill-red-500'; // Green for positive, red for negative
  };

  // Calculates the position for the utility number label inside each slice.
  const getLabelPosition = (index: any, total = 8) => {
    const angle = (360 / total) * index + (360 / total) / 2;
    const centerX = 150;
    const centerY = 150;
    const labelRadius = 80;
    
    const x = centerX + labelRadius * Math.cos((angle - 90) * Math.PI / 180);
    const y = centerY + labelRadius * Math.sin((angle - 90) * Math.PI / 180);
    
    return { x, y };
  };

  return (
    <div>
      {/* Main layout: stacks on mobile, row on large screens */}
      <div className="flex flex-col lg:flex-row lg:gap-10">

        {/* Left Column: Pizza Visualization */}
        <div className="lg:w-1/2 flex-col justify-center items-center">
          <h1 className="text-3xl font-bold text-yellow-500 mb-4">Example: Pizza</h1>
          <div className="relative w-[300px] h-[300px] sm:w-[350px] sm:h-[350px] lg:w-full lg:h-auto lg:aspect-square">
            <svg viewBox="0 0 300 300" className="w-full h-full">
              {/* Render each pizza slice */}
              {Array.from({ length: 8 }).map((_, index) => (
                <g key={index}>
                  <path
                    d={createSlicePath(index)}
                    className={`${getSliceColorClass(index)} stroke-white stroke-2 transition-all duration-300`}
                  />
                  <text
                    x={getLabelPosition(index).x}
                    y={getLabelPosition(index).y}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    className="text-lg font-bold fill-white pointer-events-none"
                    style={{ filter: 'drop-shadow(1px 1px 2px rgb(0 0 0 / 0.7))' }}
                  >
                    {marginalUtilities[index]}
                  </text>
                </g>
              ))}
            </svg>
          </div>
        </div>

        {/* Right Column: Controls and Information */}
        <div className="lg:w-1/2 flex flex-col justify-center space-y-6 mt-6 lg:mt-0">
          
          {/* Header */}
          <div>
            <p className="mt-2 text-gray-600">
              The first slice tastes good since you're hungry and haven't had pizza in a while.
              The next slice is not quite as good, since you already have the taste in your mouth.
              As you keep going, you become more and more sick with the flavor and become fuller and fuller.
              Consequently, the last slice of the pizza has negative utility.
              Drag the slider below to see what the optimal number of slices is.
            </p>
          </div>

          {/* Slider Control */}
          <div className="w-full">
            <label htmlFor="slices" className="block text-sm font-medium text-gray-700 mb-2">
              Number of Slices Eaten: <span className="font-bold text-lg text-violet-600">{selectedSlices}</span>
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
            <h3 className="text-lg font-semibold text-gray-800 mb-3">Your Satisfaction Summary</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Marginal Utility of Last Slice:</span>
                <span className={`px-2 py-1 rounded text-sm font-semibold text-white ${marginalUtilities[selectedSlices - 1] >= 0 ? 'bg-emerald-500' : 'bg-red-500'}`}>
                  {marginalUtilities[selectedSlices - 1]}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Total Utility:</span>
                <span className={`font-bold text-2xl ${totalUtility >= 0 ? 'text-emerald-600' : 'text-red-600'}`}>
                  {totalUtility}
                </span>
              </div>
            </div>
          </div>

          {/* Legend */}
          <div className="flex items-center space-x-6 text-sm text-gray-600 pt-2">
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
    </div>
  );
};

export default function MarginalUtility() {
  return (
    <div className="flex flex-col h-full">
        <main className="max-w-5xl mx-auto px-6 py-12">
            <div className="bg-white rounded-xl shadow-lg p-8 space-y-8">
                {/* Title of Page, Utility Optimization */}
                <h1 className="text-4xl font-bold text-gray-800 mb-8">Utility Optimization</h1>
                {/* Learning Targets: (1) Learn about utility and marginal utility, (2) Apply optimization in economics, and (3) Learn about greedy algorithms.*/}
                <section className="border-l-4 border-green-500 pl-6">
                    <h2 className="text-2xl font-semibold text-green-500 mb-4">Learning Targets</h2>
                    <ul className="list-disc pl-6 space-y-2 text-gray-600">
                        <li>Learn about utility and marginal utility.</li>
                        <li>Apply optimization in economics.</li>
                        <li>Learn about greedy algorithms.</li>
                    </ul>
                </section>
                {/* Lesson */}
                <section className="border-l-4 border-blue-500 pl-6">
                    <h1 className="text-3xl font-bold text-blue-500 mb-4">Utility</h1>
                    <div className="space-y-4 text-gray-700 leading-relaxed">
                        <p className="text-lg">
                            <span className="font-semibold">Utility is a measurement of how valuable something is.</span> For example, we might say that a box of wrenches provides more utility than a single wrench. Utility is measured in a (fun-to-pronounce) unit called 
                            <span className="font-semibold text-blue-700"> "utils."</span>
                        </p>
                        <p className="text-lg">
                            Utility does not just measure the monetary value of goods or services, but more generally the 
                            <span className="font-semibold text-blue-700"> "satisfaction"</span> from those goods or services. 
                            For example, if you like chocolate ice cream more than vanilla ice cream, then chocolate ice cream has more utility for you than vanilla ice cream.
                        </p>
                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-4">
                            <p className="text-blue-800 font-medium">
                              This is a useful measurement because it allows us to make quantitative decisions about what we should do, which we'll see soon.
                            </p>
                        </div>
                    </div>
                </section>

                <section className="border-l-4 border-blue-500 pl-6">
                    <h1 className="text-3xl font-bold text-blue-500 mb-4">Marginal Utility (MU)</h1>
                    <div className="space-y-4 text-gray-700 leading-relaxed">
                        <p className="text-lg">
                            <span className="font-semibold">Marginal utility is the utility of just the next item.</span> For example, if you have 3 slices of pizza and you eat one more slice, the marginal utility is the utility of that one slice.
                        </p>
                        <p className="text-lg">
                            If you are <span className="font-semibold">very hungry</span>, the marginal utility of that slice might be very high. But if you are <span className="font-semibold">already full</span>, the marginal utility might be very low.
                        </p>
                        <div className="bg-yellow-100 border border-yellow-200 rounded-lg p-4">
                            <p className="text-lg">
                                One key concept is the... 
                                <span className="font-bold text-yellow-600 text-xl"> Law of Decreasing Marginal Utility</span>, 
                                which states that as you have more items, the marginal utility of each item decreases.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Interactive Pizza Demo */}
                <section className="border-l-4 border-yellow-500 pl-6">
                  <InteractivePizza />
                </section>

                {/* Putting These Terms together, explaining how utility and marginal utility fit in graphs. */}
                <section className="border-l-4 border-yellow-500 pl-6">
                  <h1 className="text-3xl font-bold text-yellow-500 mb-4">Putting it Together in a Chart</h1>
                  <div className="space-y-4 text-gray-700 leading-relaxed">
                      <p className="text-lg">
                        Now let's see what these curves look like on a graph.
                        Use the slider to select a different number of slices and hover over the graph to inspect different values.
                      </p>
                      <InteractiveChart />
                  </div>
                </section>

                {/* Check in, asking students about utility and marginal utility, highlighting in green when they click the correct mcq answer. */}
                <section className="border-l-4 border-purple-500 pl-6">
                  <h1 className="text-3xl font-bold text-purple-500 mb-4">Check In</h1>
                  <div className="space-y-4 text-gray-700 leading-relaxed">
                    <p className="text-lg">
                      <span className="font-semibold">What is utility?</span>
                    </p>
                    <ul className="list-disc pl-6 space-y-2">
                      <li className="cursor-pointer hover:bg-purple-50 p-2 rounded transition-colors duration-200">
                        A service like gas, electricity, and water.
                      </li>
                      <li className="cursor-pointer hover:bg-purple-50 p-2 rounded transition-colors duration-200">
                        A measurement of how valuable something is.
                      </li>
                      <li className="cursor-pointer hover:bg-purple-50 p-2 rounded transition-colors duration-200">
                        A measurement of how much something costs.
                      </li>
                    </ul>

                    <p className="text-lg">
                      <span className="font-semibold">What is marginal utility?</span>
                    </p>
                    <ul className="list-disc pl-6 space-y-2">
                      <li className="cursor-pointer hover:bg-purple-50 p-2 rounded transition-colors duration-200">
                        The utility of just the next item.
                      </li>
                      <li className="cursor-pointer hover:bg-purple-50 p-2 rounded transition-colors duration-200">
                        The total utility of all items.
                      </li>
                      <li className="cursor-pointer hover:bg-purple-50 p-2 rounded transition-colors duration-200">
                        The utility of the first item only.
                      </li>
                    </ul>
                    <p className="text-lg">
                      <span className="font-semibold">What is the Law of Decreasing Marginal Utility?</span>
                    </p>
                    <ul className="list-disc pl-6 space-y-2">
                      <li className="cursor-pointer hover:bg-purple-50 p-2 rounded transition-colors duration-200">
                        As you have more items, the marginal utility of each item decreases.
                      </li>
                      <li className="cursor-pointer hover:bg-purple-50 p-2 rounded transition-colors duration-200">
                        As you have more items, the total utility increases.
                      </li>
                      <li className="cursor-pointer hover:bg-purple-50 p-2 rounded transition-colors duration-200">
                        As you have more items, the total cost increases.
                      </li>
                    </ul>
                  </div>
                </section>

                {/* Section Showing Multiple Items */}
                <section className="border-l-4 border-blue-500 pl-6">
                  <h1 className="text-3xl font-bold text-blue-500 mb-4">Buying Multiple Items</h1>
                  <div className="space-y-4 text-gray-700 leading-relaxed">
                    <p className="text-lg">
                      Imagine you were going to get three scoops of ice cream. You may really love chocolate ice cream, but because each chocolate scoop provides you less and less utility (Law of Decreasing Marginal Utility),
                      you may want to get a chocolate scoop, and then pick another flavor. Notice that after you pick one scoop, you would reconsider the utility of each flavor for the next scoop.
                      Below is an example table showing the marginal utility (MU) of each flavor of ice cream for each number of scoops you get.
                      Click the "Next Scoop" button below the table and see if you can guess which scoop it will pick next.
                    </p>
                    <IceCreamUtilityTable />
                  </div>
                </section>

                {/* Section Showing Multiple Items with Different Prices, introducing MU/P */}
                <section className="border-l-4 border-blue-500 pl-6">
                  <h1 className="text-3xl font-bold text-blue-500 mb-4">Buying Multiple Items with Different Prices</h1>
                  <div className="space-y-4 text-gray-700 leading-relaxed">
                    <p className="text-lg">
                      Since each scoop of ice cream had one price, we could just pick scoop with the highest marginal utility.
                      However, must take price into account when there are multiple items.
                    </p>
                    <p className="text-lg">
                      This is called <span className="font-semibold text-blue-700">Marginal Utility per Price (MU/P)</span>, which describes how much value we are getting from each dollar we spend.
                      Let's apply it to an example.
                    </p>
                  </div>
                </section>

                {/* Section to Practice MU/P */}
                <section className="border-l-4 border-yellow-500 pl-6">
                  <h1 className="text-3xl font-bold text-yellow-500 mb-4">Practice: Marginal Utility per Price</h1>
                  <div className="space-y-4 text-gray-700 leading-relaxed">
                    <p className="text-lg">
                      If ice cream wasn't enough, let's try a different store!
                      Below is practice problem showing the marginal utility (MU) and price of each cupcake and cookie,
                      so you can practice finding an optimal combination.
                    </p>
                    <div className="text-sm text-gray-600 bg-gray-50 p-3 rounded-md">
                      <strong>Instructions:</strong> 
                      <ol className="list-decimal list-inside mt-2 space-y-1">
                        <li>Calculate MU/P for each item (Marginal Utility ÷ Price)</li>
                        <li>Click "Check Calculations & Start Shopping" when done</li>
                        <li>Always choose the item with the highest MU/P ratio you can afford</li>
                        <li>Watch your budget decrease and get feedback on your choices!</li>
                      </ol>
                    </div>
                    <CupcakesCookiesUtilityTable />
                  </div>
                </section>

                {/* Section to Explain the Greedy Approach */}
                <section className="border-l-4 border-blue-500 pl-6">
                  <h1 className="text-3xl font-bold text-blue-500 mb-4">Greedy Approach</h1>
                  <div className="space-y-4 text-gray-700 leading-relaxed">
                    <p className="text-lg">
                      The greedy approach is a method of solving optimization problems by making the locally optimal choice at each step.
                      In the context of utility optimization, it means always choosing the item with the highest marginal utility per price (MU/P) ratio that you can afford.
                    </p>
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-4">
                        <p className="text-blue-800 font-medium">
                          It's called "greedy" because it always wants the best immediate choice, without considering future consequences.
                        </p>
                    </div>
                    <p className="text-lg">
                      This approach works well for many problems, but it may not always yield the best choice.
                      However, for our dessert examples, it provided a simple and effective way to maximize your utility given a budget constraint.
                    </p>
                    <div className="text-sm text-gray-600 bg-gray-50 p-3 rounded-md">
                      <strong>(Bonus) More Applications of The Greedy Algorithm:</strong> 
                      <ol className="list-decimal list-inside mt-2 space-y-1">
                        <li>Finding nearly-optimal solutions to extremely difficult problems.</li>
                        <li>Map routing algorithms, data compression, and more!</li>
                        <li>Making change with the fewest number of coins (we'll see next).</li>
                      </ol>
                    </div>
                  </div>
                </section>

                {/* Section on The Change Problem */}
                <section className="border-l-4 border-yellow-500 pl-6">
                  <h1 className="text-3xl font-bold text-yellow-500 mb-4">The Change Problem</h1>
                  <div className='flex flex-col lg:flex-row lg:gap-10'>
                    <div className="lg:w-1/2 space-y-4 text-gray-700 leading-relaxed">
                      <p className="text-lg">
                        The change problem is a classic optimization problem where you need to make change for a given amount using the fewest number of coins.
                        For example, if you need to make 63 cents using coins of 1, 5, 10, and 25 cents, the optimal solution would use:
                      </p>
                      <ul className="list-disc pl-6 space-y-2">
                        <li>2 quarters (50 cents)</li>
                        <li>1 dime (10 cents)</li>
                        <li>1 nickel (5 cents)</li>
                        <li>3 pennies (3 cents)</li>
                      </ul>
                      <p className="text-lg">
                        This gives you a total of 7 coins, which is the fewest possible.
                        Let's solve this using a greedy approach, by picking the largest coin that does not exceed the remaining amount
                        until we have reached the desired change.
                      </p>
                    </div>
                    <div className="lg:w-1/2">
                      <CoinPickingExample coins={[25, 10, 5, 1]} initialAmount={67} greedyStrict={true}/>
                    </div>
                  </div>

                </section>

                {/* Section on The Problematic Change Problem */}
                <section className="border-l-4 border-yellow-500 pl-6">
                  <h1 className="text-3xl font-bold text-yellow-500 mb-4">The Problematic Change Problem</h1>
                  <div className='flex flex-col lg:flex-row lg:gap-10'>
                    <div className="lg:w-1/2 space-y-4 text-gray-700 leading-relaxed">
                      <p className="text-lg">
                        The greedy approach works well for many problems, but it can fail in some cases.
                        The US coins lend themselves to a greedy solution, but not all coin systems do.
                        For example, consider a coin system with coins of 1, 3, and 4 cents. If you were trying to make 6 cents of change,
                        the greedy approach would give you 3 coins, but the optimal solution is 2 coins.
                      </p>
                      <p className="text-lg">
                        Explore different ways of making 6 cents of change with the interactive module.
                        Figure out what the greedy solution and the best solution are and ponder why the greedy solution breaks down.
                      </p>
                      <p className="text-lg">
                        This shows that the greedy approach does not always yield the best solution.
                        However, it is still a useful tool for many problems, especially when the problem has a structure that allows for a greedy solution.
                      </p>
                    </div>
                    <div className="lg:w-1/2">
                      <CoinPickingExample coins={[1, 3, 4]} initialAmount={6} greedyStrict={false}/>
                    </div>
                  </div>
                </section>

                {/* How You Know if it Works in Utility Optimization... */}

                {/* Writing Code */}

                {/* Recap */}
            </div>
        </main>
    </div>
  );
}