"use client";
import React, { useState } from "react";

// Data for each step of the animation, moved from the original script
const stepsData = [
  {
    title: "Step 1 of 5: The Messy Beginning",
    explanation:
      "Here's the problem: RPG dialogue scattered randomly with no clear structure. Text is rotated and dispersed, making it impossible to follow the conversation flow or understand relationships between elements.",
  },
  {
    title: "Step 2 of 5: Adding Flow Structure",
    explanation:
      "Much better! Now we can see the logical flow: messages connect to choices with arrows, and choices lead to next scenes. This visual structure helps us understand the conversation path, but we still have a problem...",
  },
  {
    title: "Step 3 of 5: The Infinite Replication Problem",
    explanation:
      "Here's the real issue with nesting: if a scene can reference itself (like 'Can you tell me that again?'), we'd need infinite nested copies! Each choice would create a new duplicate scene, consuming infinite memory. The solution shows a single scene with a reference arrow back to itself.",
  },
  {
    title: "Step 4 of 5: Object Boxing Solution",
    explanation:
      "The solution: Box each element as separate objects! Scene objects contain messages and choice objects. Choice objects contain response text and references (keys) to other scenes. The dashed arrows show references, not direct containment.",
  },
  {
    title: "Step 5 of 5: Final Dictionary Structure",
    explanation:
      "The final result: a clean dictionary where each scene has a unique key. Choices reference other scenes by key, not by nesting objects. This prevents duplication, handles loops naturally, and makes scenes easily accessible and reusable!",
  },
];

// Helper components for each SVG step to keep the main component clean
const Step1 = ({ isVisible }: { isVisible: boolean }) => (
  <g
    className={`transition-all duration-700 ease-in-out ${
      isVisible ? "opacity-100" : "opacity-0 pointer-events-none"
    }`}
  >
    <rect
      x="80"
      y="100"
      width="280"
      height="40"
      rx="8"
      className="fill-blue-100 stroke-blue-500 stroke-2 scale-90"
      transform="rotate(-15 220 120)"
    />
    <text
      x="220"
      y="125"
      textAnchor="middle"
      className="font-sans text-sm fill-blue-900 font-medium scale-90"
      transform="rotate(-15 220 120)"
    >
      Hello traveler, what brings you here?
    </text>
    <rect
      x="400"
      y="80"
      width="200"
      height="30"
      rx="6"
      className="fill-orange-100 stroke-orange-500 stroke-2 scale-90"
      transform="rotate(20 500 95)"
    />
    <text
      x="500"
      y="100"
      textAnchor="middle"
      className="font-sans text-xs fill-orange-800 scale-90"
      transform="rotate(20 500 95)"
    >
      I'm looking for the magic sword
    </text>
    <rect
      x="150"
      y="250"
      width="150"
      height="30"
      rx="6"
      className="fill-orange-100 stroke-orange-500 stroke-2 scale-90"
      transform="rotate(-25 225 265)"
    />
    <text
      x="225"
      y="270"
      textAnchor="middle"
      className="font-sans text-xs fill-orange-800 scale-90"
      transform="rotate(-25 225 265)"
    >
      Just passing through
    </text>
    <rect
      x="600"
      y="200"
      width="220"
      height="40"
      rx="8"
      className="fill-blue-100 stroke-blue-500 stroke-2 scale-90"
      transform="rotate(10 710 220)"
    />
    <text
      x="710"
      y="225"
      textAnchor="middle"
      className="font-sans text-sm fill-blue-900 font-medium scale-90"
      transform="rotate(10 710 220)"
    >
      Ah, the legendary blade!
    </text>
    <rect
      x="50"
      y="400"
      width="180"
      height="40"
      rx="8"
      className="fill-blue-100 stroke-blue-500 stroke-2 scale-90"
      transform="rotate(-5 140 420)"
    />
    <text
      x="140"
      y="425"
      textAnchor="middle"
      className="font-sans text-sm fill-blue-900 font-medium scale-90"
      transform="rotate(-5 140 420)"
    >
      Safe travels then
    </text>
  </g>
);

const Step2 = ({ isVisible }: { isVisible: boolean }) => (
  <g
    className={`transition-all duration-700 ease-in-out ${
      isVisible ? "opacity-100" : "opacity-0 pointer-events-none"
    }`}
  >
    <rect
      x="400"
      y="50"
      width="300"
      height="50"
      rx="8"
      className="fill-blue-100 stroke-blue-500 stroke-2"
    />
    <text
      x="550"
      y="80"
      textAnchor="middle"
      className="font-sans text-sm fill-blue-900 font-medium"
    >
      Hello traveler, what brings you here?
    </text>
    <rect
      x="200"
      y="150"
      width="200"
      height="40"
      rx="6"
      className="fill-orange-100 stroke-orange-500 stroke-2"
    />
    <text
      x="300"
      y="175"
      textAnchor="middle"
      className="font-sans text-xs fill-orange-800"
    >
      I'm looking for the magic sword
    </text>
    <rect
      x="600"
      y="150"
      width="150"
      height="40"
      rx="6"
      className="fill-orange-100 stroke-orange-500 stroke-2"
    />
    <text
      x="675"
      y="175"
      textAnchor="middle"
      className="font-sans text-xs fill-orange-800"
    >
      Just passing through
    </text>
    <rect
      x="150"
      y="250"
      width="220"
      height="50"
      rx="8"
      className="fill-blue-100 stroke-blue-500 stroke-2"
    />
    <text
      x="260"
      y="280"
      textAnchor="middle"
      className="font-sans text-sm fill-blue-900 font-medium"
    >
      Ah, the legendary blade!
    </text>
    <rect
      x="600"
      y="250"
      width="180"
      height="50"
      rx="8"
      className="fill-blue-100 stroke-blue-500 stroke-2"
    />
    <text
      x="690"
      y="280"
      textAnchor="middle"
      className="font-sans text-sm fill-blue-900 font-medium"
    >
      Safe travels then
    </text>
    <line
      x1="500"
      y1="100"
      x2="350"
      y2="150"
      className="stroke-gray-500 stroke-2"
      markerEnd="url(#arrowhead)"
    />
    <line
      x1="600"
      y1="100"
      x2="650"
      y2="150"
      className="stroke-gray-500 stroke-2"
      markerEnd="url(#arrowhead)"
    />
    <line
      x1="300"
      y1="190"
      x2="260"
      y2="250"
      className="stroke-gray-500 stroke-2"
      markerEnd="url(#arrowhead)"
    />
    <line
      x1="675"
      y1="190"
      x2="690"
      y2="250"
      className="stroke-gray-500 stroke-2"
      markerEnd="url(#arrowhead)"
    />
  </g>
);

const Step3 = ({ isVisible }: { isVisible: boolean }) => (
  <g
    className={`transition-all duration-700 ease-in-out ${
      isVisible ? "opacity-100" : "opacity-0 pointer-events-none"
    }`}
  >
    <rect
      x="100"
      y="80"
      width="250"
      height="50"
      rx="8"
      className="fill-blue-100 stroke-blue-500 stroke-2"
    />
    <text
      x="225"
      y="110"
      textAnchor="middle"
      className="font-sans text-sm fill-blue-900 font-medium"
    >
      Can you tell me that again?
    </text>
    <rect
      x="150"
      y="160"
      width="150"
      height="40"
      rx="6"
      className="fill-orange-100 stroke-orange-500 stroke-2"
    />
    <text
      x="225"
      y="185"
      textAnchor="middle"
      className="font-sans text-xs fill-orange-800"
    >
      Tell me that again
    </text>
    <line
      x1="225"
      y1="200"
      x2="450"
      y2="80"
      className="stroke-gray-500 stroke-2"
      markerEnd="url(#arrowhead)"
    />
    <rect
      x="400"
      y="80"
      width="250"
      height="50"
      rx="8"
      className="fill-blue-100 stroke-blue-500 stroke-2"
    />
    <text
      x="525"
      y="110"
      textAnchor="middle"
      className="font-sans text-sm fill-blue-900 font-medium"
    >
      Can you tell me that again?
    </text>
    <rect
      x="450"
      y="160"
      width="150"
      height="40"
      rx="6"
      className="fill-orange-100 stroke-orange-500 stroke-2"
    />
    <text
      x="525"
      y="185"
      textAnchor="middle"
      className="font-sans text-xs fill-orange-800"
    >
      Tell me that again
    </text>
    <line
      x1="525"
      y1="200"
      x2="750"
      y2="80"
      className="stroke-gray-500 stroke-2"
      markerEnd="url(#arrowhead)"
    />
    <rect
      x="700"
      y="80"
      width="250"
      height="50"
      rx="8"
      className="fill-blue-100 stroke-blue-500 stroke-2"
    />
    <text
      x="825"
      y="110"
      textAnchor="middle"
      className="font-sans text-sm fill-blue-900 font-medium"
    >
      Can you tell me that again?
    </text>
    <rect
      x="750"
      y="160"
      width="150"
      height="40"
      rx="6"
      className="fill-orange-100 stroke-orange-500 stroke-2"
    />
    <text
      x="825"
      y="185"
      textAnchor="middle"
      className="font-sans text-xs fill-orange-800"
    >
      Tell me that again
    </text>
    <line
      x1="825"
      y1="200"
      x2="975"
      y2="120"
      className="stroke-gray-500 stroke-2"
      markerEnd="url(#arrowhead)"
    />
    <text x="980" y="125" className="font-sans text-3xl fill-red-500 font-bold">
      ...
    </text>
    <text x="1020" y="125" className="font-sans text-xl fill-red-500 font-bold">
      ∞
    </text>
    <rect
      x="50"
      y="250"
      width="350"
      height="80"
      rx="8"
      className="fill-red-50 stroke-red-500 stroke-2"
    />
    <text
      x="225"
      y="275"
      textAnchor="middle"
      className="font-sans fill-red-500 font-bold"
    >
      PROBLEM: Infinite nested copies!
    </text>
    <text x="60" y="295" className="font-sans fill-red-500 text-xs">
      • Each choice creates a new copy of the same scene
    </text>
    <text x="60" y="310" className="font-sans fill-red-500 text-xs">
      • Takes up infinite memory and code space
    </text>
    <text x="60" y="325" className="font-sans fill-red-500 text-xs">
      • Impossible to implement with nested objects
    </text>
    <rect
      x="500"
      y="250"
      width="400"
      height="120"
      rx="8"
      className="fill-green-50 stroke-green-500 stroke-2"
    />
    <text
      x="700"
      y="275"
      textAnchor="middle"
      className="font-sans fill-green-500 font-bold"
    >
      SOLUTION: Reference the same scene
    </text>
    <rect
      x="550"
      y="290"
      width="200"
      height="40"
      rx="8"
      className="fill-blue-100 stroke-green-500 stroke-2"
    />
    <text
      x="650"
      y="315"
      textAnchor="middle"
      className="font-sans text-xs fill-blue-900 font-medium"
    >
      Can you tell me that again?
    </text>
    <rect
      x="580"
      y="340"
      width="140"
      height="25"
      rx="6"
      className="fill-orange-100 stroke-green-500 stroke-2"
    />
    <text
      x="650"
      y="357"
      textAnchor="middle"
      className="font-sans text-[10px] fill-orange-800"
    >
      Tell me that again
    </text>
    <path
      d="M 580 350 Q 500 380 500 310 Q 500 290 550 310"
      className="stroke-green-500 stroke-2 fill-none"
      markerEnd="url(#arrowhead)"
    />
    <text
      x="480"
      y="400"
      className="font-sans text-[11px] fill-green-500 font-bold"
    >
      One scene, referenced!
    </text>
  </g>
);

const Step4 = ({ isVisible }: { isVisible: boolean }) => (
  <g
    className={`transition-all duration-700 ease-in-out ${
      isVisible ? "opacity-100" : "opacity-0 pointer-events-none"
    }`}
  >
    <rect
      x="200"
      y="80"
      width="400"
      height="180"
      rx="12"
      className="fill-none stroke-green-500 stroke-[3]"
      style={{ strokeDasharray: "5,5" }}
    />
    <text
      x="400"
      y="70"
      textAnchor="middle"
      className="font-sans fill-green-500 font-bold"
    >
      Scene Object
    </text>
    <rect
      x="250"
      y="100"
      width="300"
      height="40"
      rx="8"
      className="fill-blue-100 stroke-blue-500 stroke-2"
    />
    <text
      x="400"
      y="125"
      textAnchor="middle"
      className="font-sans text-sm fill-blue-900 font-medium"
    >
      Hello traveler, what brings you here?
    </text>
    <rect
      x="220"
      y="170"
      width="150"
      height="70"
      rx="8"
      className="fill-none stroke-orange-500 stroke-[3]"
      style={{ strokeDasharray: "5,5" }}
    />
    <text
      x="295"
      y="165"
      textAnchor="middle"
      className="font-sans text-xs fill-orange-500 font-bold"
    >
      Choice Object
    </text>
    <rect
      x="430"
      y="170"
      width="150"
      height="70"
      rx="8"
      className="fill-none stroke-orange-500 stroke-[3]"
      style={{ strokeDasharray: "5,5" }}
    />
    <text
      x="505"
      y="165"
      textAnchor="middle"
      className="font-sans text-xs fill-orange-500 font-bold"
    >
      Choice Object
    </text>
    <text
      x="295"
      y="190"
      textAnchor="middle"
      className="font-sans text-xs fill-orange-800"
    >
      Looking for sword
    </text>
    <text
      x="295"
      y="210"
      textAnchor="middle"
      className="font-sans text-[11px] italic fill-gray-500"
    >
      → sword_scene
    </text>
    <text
      x="505"
      y="190"
      textAnchor="middle"
      className="font-sans text-xs fill-orange-800"
    >
      Just passing through
    </text>
    <text
      x="505"
      y="210"
      textAnchor="middle"
      className="font-sans text-[11px] italic fill-gray-500"
    >
      → farewell_scene
    </text>
    <rect
      x="100"
      y="350"
      width="200"
      height="100"
      rx="12"
      className="fill-none stroke-green-500 stroke-[3]"
      style={{ strokeDasharray: "5,5" }}
    />
    <text
      x="200"
      y="340"
      textAnchor="middle"
      className="font-sans fill-green-500 font-bold"
    >
      sword_scene
    </text>
    <rect
      x="120"
      y="370"
      width="160"
      height="30"
      rx="6"
      className="fill-blue-100 stroke-blue-500 stroke-2"
    />
    <text
      x="200"
      y="390"
      textAnchor="middle"
      className="font-sans text-xs fill-blue-900 font-medium"
    >
      Ah, the legendary blade!
    </text>
    <rect
      x="500"
      y="350"
      width="200"
      height="100"
      rx="12"
      className="fill-none stroke-green-500 stroke-[3]"
      style={{ strokeDasharray: "5,5" }}
    />
    <text
      x="600"
      y="340"
      textAnchor="middle"
      className="font-sans fill-green-500 font-bold"
    >
      farewell_scene
    </text>
    <rect
      x="520"
      y="370"
      width="160"
      height="30"
      rx="6"
      className="fill-blue-100 stroke-blue-500 stroke-2"
    />
    <text
      x="600"
      y="390"
      textAnchor="middle"
      className="font-sans text-xs fill-blue-900 font-medium"
    >
      Safe travels then
    </text>
    <line
      x1="295"
      y1="240"
      x2="200"
      y2="350"
      className="stroke-gray-500 stroke-2"
      style={{ strokeDasharray: "5,5" }}
      markerEnd="url(#arrowhead)"
    />
    <line
      x1="505"
      y1="240"
      x2="600"
      y2="350"
      className="stroke-gray-500 stroke-2"
      style={{ strokeDasharray: "5,5" }}
      markerEnd="url(#arrowhead)"
    />
  </g>
);

const Step5 = ({ isVisible }: { isVisible: boolean }) => (
  <g
    className={`transition-all duration-700 ease-in-out ${
      isVisible ? "opacity-100" : "opacity-0 pointer-events-none"
    }`}
  >
    <rect
      x="50"
      y="50"
      width="1100"
      height="500"
      rx="10"
      className="fill-slate-800 stroke-green-500 stroke-2"
    />
    <text x="70" y="80" className="font-mono text-[11px] fill-orange-400">
      scenes
    </text>
    <text x="130" y="80" className="font-mono text-[11px] fill-white">
      {" "}
      = {`{`}
    </text>
    <text x="90" y="110" className="font-mono text-[11px] fill-orange-400">
      greeting
    </text>
    <text x="160" y="110" className="font-mono text-[11px] fill-white">
      : {`{`}
    </text>
    <text x="110" y="135" className="font-mono text-[11px] fill-orange-400">
      message
    </text>
    <text x="180" y="135" className="font-mono text-[11px] fill-white">
      :{" "}
    </text>
    <text x="200" y="135" className="font-mono text-[11px] fill-green-400">
      "Hello traveler, what brings you here?"
    </text>
    <text x="500" y="135" className="font-mono text-[11px] fill-white">
      ,
    </text>
    <text x="110" y="160" className="font-mono text-[11px] fill-orange-400">
      choices
    </text>
    <text x="170" y="160" className="font-mono text-[11px] fill-white">
      : [
    </text>
    <text
      x="130"
      y="185"
      className="font-mono text-[11px] fill-white"
    >{`{`}</text>
    <text x="150" y="210" className="font-mono text-[11px] fill-orange-400">
      response
    </text>
    <text x="220" y="210" className="font-mono text-[11px] fill-white">
      :{" "}
    </text>
    <text x="235" y="210" className="font-mono text-[11px] fill-green-400">
      "I'm looking for the magic sword"
    </text>
    <text x="480" y="210" className="font-mono text-[11px] fill-white">
      ,
    </text>
    <text x="150" y="235" className="font-mono text-[11px] fill-orange-400">
      nextScene
    </text>
    <text x="220" y="235" className="font-mono text-[11px] fill-white">
      :{" "}
    </text>
    <text x="235" y="235" className="font-mono text-[11px] fill-green-400">
      "sword_info"
    </text>
    <text x="130" y="260" className="font-mono text-[11px] fill-white">
      {`}`},
    </text>
    <text
      x="130"
      y="285"
      className="font-mono text-[11px] fill-white"
    >{`{`}</text>
    <text x="150" y="310" className="font-mono text-[11px] fill-orange-400">
      response
    </text>
    <text x="220" y="310" className="font-mono text-[11px] fill-white">
      :{" "}
    </text>
    <text x="235" y="310" className="font-mono text-[11px] fill-green-400">
      "Just passing through"
    </text>
    <text x="400" y="310" className="font-mono text-[11px] fill-white">
      ,
    </text>
    <text x="150" y="335" className="font-mono text-[11px] fill-orange-400">
      nextScene
    </text>
    <text x="220" y="335" className="font-mono text-[11px] fill-white">
      :{" "}
    </text>
    <text x="235" y="335" className="font-mono text-[11px] fill-green-400">
      "farewell"
    </text>
    <text
      x="130"
      y="360"
      className="font-mono text-[11px] fill-white"
    >{`}`}</text>
    <text x="110" y="385" className="font-mono text-[11px] fill-white">
      ]
    </text>
    <text x="90" y="410" className="font-mono text-[11px] fill-white">
      {`}`},
    </text>
    <text x="90" y="440" className="font-mono text-[11px] fill-orange-400">
      sword_info
    </text>
    <text x="180" y="440" className="font-mono text-[11px] fill-white">
      : {`{`} ... {`}`},
    </text>
    <text x="90" y="465" className="font-mono text-[11px] fill-orange-400">
      farewell
    </text>
    <text x="160" y="465" className="font-mono text-[11px] fill-white">
      : {`{`} ... {`}`}
    </text>
    <text x="70" y="490" className="font-mono text-[11px] fill-white">
      {`}`};
    </text>
    <rect
      x="600"
      y="100"
      width="280"
      height="150"
      rx="8"
      className="fill-slate-900 stroke-green-500"
    />
    <text
      x="740"
      y="125"
      textAnchor="middle"
      className="font-sans fill-green-400 font-bold"
    >
      Benefits:
    </text>
    <text x="620" y="150" className="font-sans text-xs fill-white">
      ✓ No duplication
    </text>
    <text x="620" y="170" className="font-sans text-xs fill-white">
      ✓ Handles loops naturally
    </text>
    <text x="620" y="190" className="font-sans text-xs fill-white">
      ✓ Easy scene access by key
    </text>
    <text x="620" y="210" className="font-sans text-xs fill-white">
      ✓ Reusable scenes
    </text>
    <text x="620" y="230" className="font-sans text-xs fill-white">
      ✓ Clean separation of data
    </text>
  </g>
);

// Main component
function RPGDataAnimation() {
  const [currentStep, setCurrentStep] = useState(0);

  const handleNext = () => {
    if (currentStep < stepsData.length - 1) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const handleRestart = () => {
    setCurrentStep(0);
  };

  const buttonBaseClasses =
    "bg-gradient-to-br from-indigo-500 to-purple-600 text-white border-none py-3 px-6 mx-2 rounded-full cursor-pointer text-base font-semibold transition-all duration-300 ease-in-out shadow-lg";
  const buttonHoverClasses = "hover:-translate-y-0.5 hover:shadow-xl";
  const buttonDisabledClasses =
    "disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-lg";

  return (
    <div className="bg-gradient-to-br from-[#667eea] to-[#764ba2] min-h-screen font-sans text-gray-800 overflow-x-hidden p-4 sm:p-5">
      <div className="max-w-7xl mx-auto">
        <header className="text-center mb-8 text-white">
          <h1 className="text-3xl sm:text-4xl font-bold mb-2 drop-shadow-lg">
            Building RPG Scene Data Structures
          </h1>
          <p className="text-lg opacity-90">
            Watch how we organize complex game dialogue into clean, reusable
            data
          </p>
        </header>

        <main className="bg-white rounded-2xl p-5 shadow-2xl relative">
          <div className="text-center mb-5 flex flex-wrap justify-center gap-2">
            <button
              onClick={handlePrev}
              disabled={currentStep === 0}
              className={`${buttonBaseClasses} ${buttonHoverClasses} ${buttonDisabledClasses}`}
            >
              ← Previous
            </button>
            <button
              onClick={handleNext}
              disabled={currentStep === stepsData.length - 1}
              className={`${buttonBaseClasses} ${buttonHoverClasses} ${buttonDisabledClasses}`}
            >
              Next →
            </button>
            <button
              onClick={handleRestart}
              className={`${buttonBaseClasses} ${buttonHoverClasses}`}
            >
              Restart
            </button>
          </div>

          <div className="text-center mb-4 text-lg font-semibold text-indigo-600">
            {stepsData[currentStep].title}
          </div>

          <div className="bg-indigo-50 border-l-4 border-indigo-500 p-5 mb-5 rounded-r-lg text-base leading-relaxed min-h-[110px]">
            {stepsData[currentStep].explanation}
          </div>

          <svg
            className="w-full h-[600px] border border-gray-200 rounded-xl bg-gray-50"
            viewBox="0 0 1200 600"
          >
            <defs>
              <marker
                id="arrowhead"
                markerWidth="10"
                markerHeight="7"
                refX="9"
                refY="3.5"
                orient="auto"
              >
                <polygon points="0 0, 10 3.5, 0 7" className="fill-gray-500" />
              </marker>
              <marker
                id="arrowhead-red"
                markerWidth="10"
                markerHeight="7"
                refX="9"
                refY="3.5"
                orient="auto"
              >
                <polygon points="0 0, 10 3.5, 0 7" className="fill-red-500" />
              </marker>
            </defs>

            {/* Render each step component conditionally */}
            <Step1 isVisible={currentStep === 0} />
            <Step2 isVisible={currentStep === 1} />
            <Step3 isVisible={currentStep === 2} />
            <Step4 isVisible={currentStep === 3} />
            <Step5 isVisible={currentStep === 4} />
          </svg>
        </main>
      </div>
    </div>
  );
}

export default RPGDataAnimation;
