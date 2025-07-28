"use client";
import ColorBox from "@/components/ColorBox";
import React, { useState } from "react";

// Interface to define the shape of our step data
interface StepData {
  title: string;
  explanation: string;
}

// Typed data for each step of the animation
const stepsData: StepData[] = [
  {
    title: "Step 1 of 5: Our Data",
    explanation:
      "Here's the problem: RPG dialogue is scattered randomly with no clear structure. It's impossible to follow the conversation flow or manage relationships between elements.",
  },
  {
    title: "Step 2 of 5: Adding Flow Structure",
    explanation:
      "Much better! Now we can see the logical flow: messages connect to choices with arrows, and choices lead to subsequent scenes. This visual structure helps, but a core problem remains...",
  },
  {
    title: "Step 3 of 5: 'Infinite Copy' Problem",
    explanation:
      "If a choice leads back to the same scene (e.g., asking for the same info again), a nested structure would create infinite duplicates (top). The solution is to store scenes separately and use a reference (a simple ID) to point back to the original, creating a clean, efficient loop (bottom).",
  },
  {
    title: "Step 4 of 5: Object-Based Structure",
    explanation:
      "The solution is to 'box' everything into objects. A 'Scene' object holds the main message and an array of 'Choice' objects. Each choice contains its text and, crucially, a reference (key) to the next scene. Dashed lines show these are references, not nested data.",
  },
  {
    title: "Step 5 of 5: Final Data Structure",
    explanation:
      "The final result: a clean dictionary (or map) where each scene has a unique key. Choices reference other scenes by their key, preventing duplication and handling loops naturally. This data is now clean, reusable, and easy for the game engine to read.",
  },
];

// Type definition for the props of each Step component
type StepProps = {
  isVisible: boolean;
};

// SVG components are typed with React.FC<StepProps>
const Step1: React.FC<StepProps> = ({ isVisible }) => (
  <g
    className={`transition-all duration-700 ease-in-out ${
      isVisible ? "opacity-100" : "opacity-0 pointer-events-none"
    }`}
  >
    <rect
      x="200"
      y="150"
      width="320"
      height="50"
      rx="8"
      className="fill-blue-100 stroke-blue-500 stroke-2 scale-90"
      transform="rotate(-15 360 175)"
    />
    <text
      x="360"
      y="180"
      textAnchor="middle"
      className="font-sans text-base fill-blue-900 font-medium scale-90"
      transform="rotate(-15 360 175)"
    >
      Hello traveler, what brings you here?
    </text>
    <rect
      x="650"
      y="100"
      width="280"
      height="40"
      rx="6"
      className="fill-orange-100 stroke-orange-500 stroke-2 scale-90"
      transform="rotate(20 790 120)"
    />
    <text
      x="790"
      y="125"
      textAnchor="middle"
      className="font-sans text-sm fill-orange-800 scale-90"
      transform="rotate(20 790 120)"
    >
      I'm looking for the magic sword
    </text>
    <rect
      x="350"
      y="350"
      width="220"
      height="40"
      rx="6"
      className="fill-orange-100 stroke-orange-500 stroke-2 scale-90"
      transform="rotate(-25 460 370)"
    />
    <text
      x="460"
      y="375"
      textAnchor="middle"
      className="font-sans text-sm fill-orange-800 scale-90"
      transform="rotate(-25 460 370)"
    >
      Just passing through
    </text>
    <rect
      x="950"
      y="250"
      width="280"
      height="50"
      rx="8"
      className="fill-blue-100 stroke-blue-500 stroke-2 scale-90"
      transform="rotate(10 1090 275)"
    />
    <text
      x="1090"
      y="280"
      textAnchor="middle"
      className="font-sans text-base fill-blue-900 font-medium scale-90"
      transform="rotate(10 1090 275)"
    >
      Ah, the legendary blade!
    </text>
    <rect
      x="250"
      y="450"
      width="220"
      height="50"
      rx="8"
      className="fill-blue-100 stroke-blue-500 stroke-2 scale-90"
      transform="rotate(-5 360 475)"
    />
    <text
      x="360"
      y="480"
      textAnchor="middle"
      className="font-sans text-base fill-blue-900 font-medium scale-90"
      transform="rotate(-5 360 475)"
    >
      Safe travels then
    </text>
  </g>
);

const Step2: React.FC<StepProps> = ({ isVisible }) => (
  <g
    className={`transition-all duration-700 ease-in-out ${
      isVisible ? "opacity-100" : "opacity-0 pointer-events-none"
    }`}
  >
    <rect
      x="600"
      y="80"
      width="400"
      height="60"
      rx="8"
      className="fill-blue-100 stroke-blue-500 stroke-2"
    />
    <text
      x="800"
      y="115"
      textAnchor="middle"
      className="font-sans text-lg fill-blue-900 font-medium"
    >
      Hello traveler, what brings you here?
    </text>
    <rect
      x="350"
      y="220"
      width="300"
      height="50"
      rx="6"
      className="fill-orange-100 stroke-orange-500 stroke-2"
    />
    <text
      x="500"
      y="250"
      textAnchor="middle"
      className="font-sans text-base fill-orange-800"
    >
      I'm looking for the magic sword
    </text>
    <rect
      x="950"
      y="220"
      width="250"
      height="50"
      rx="6"
      className="fill-orange-100 stroke-orange-500 stroke-2"
    />
    <text
      x="1075"
      y="250"
      textAnchor="middle"
      className="font-sans text-base fill-orange-800"
    >
      Just passing through
    </text>
    <rect
      x="300"
      y="370"
      width="300"
      height="60"
      rx="8"
      className="fill-blue-100 stroke-blue-500 stroke-2"
    />
    <text
      x="450"
      y="405"
      textAnchor="middle"
      className="font-sans text-lg fill-blue-900 font-medium"
    >
      Ah, the legendary blade!
    </text>
    <rect
      x="1000"
      y="370"
      width="250"
      height="60"
      rx="8"
      className="fill-blue-100 stroke-blue-500 stroke-2"
    />
    <text
      x="1125"
      y="405"
      textAnchor="middle"
      className="font-sans text-lg fill-blue-900 font-medium"
    >
      Safe travels then
    </text>
    <line
      x1="700"
      y1="140"
      x2="550"
      y2="220"
      className="stroke-gray-500 stroke-2"
      markerEnd="url(#arrowhead)"
    />
    <line
      x1="900"
      y1="140"
      x2="1050"
      y2="220"
      className="stroke-gray-500 stroke-2"
      markerEnd="url(#arrowhead)"
    />
    <line
      x1="500"
      y1="270"
      x2="450"
      y2="370"
      className="stroke-gray-500 stroke-2"
      markerEnd="url(#arrowhead)"
    />
    <line
      x1="1075"
      y1="270"
      x2="1125"
      y2="370"
      className="stroke-gray-500 stroke-2"
      markerEnd="url(#arrowhead)"
    />
  </g>
);

const Step3: React.FC<StepProps> = ({ isVisible }) => (
  <g
    className={`transition-all duration-700 ease-in-out ${
      isVisible ? "opacity-100" : "opacity-0 pointer-events-none"
    }`}
  >
    <rect
      x="100"
      y="50"
      width="1400"
      height="220"
      rx="8"
      className="fill-red-50 stroke-red-400 stroke-2"
    />
    <text
      x="800"
      y="80"
      textAnchor="middle"
      className="font-sans text-xl fill-red-600 font-bold"
    >
      PROBLEM: Infinite Nested Copies
    </text>
    <rect
      x="150"
      y="120"
      width="280"
      height="50"
      rx="8"
      className="fill-blue-100 stroke-blue-500"
    />
    <text
      x="290"
      y="150"
      textAnchor="middle"
      className="font-sans text-base fill-blue-900"
    >
      Florence was founded in 59 BC by Julius Caesar
    </text>
    <rect
      x="180"
      y="180"
      width="220"
      height="40"
      rx="6"
      className="fill-orange-100 stroke-orange-500"
    />
    <text
      x="290"
      y="205"
      textAnchor="middle"
      className="font-sans text-sm fill-orange-800"
    >
      What date did you say?
    </text>
    <line
      x1="290"
      y1="220"
      x2="520"
      y2="120"
      className="stroke-gray-500 stroke-2"
      markerEnd="url(#arrowhead)"
    />
    <rect
      x="480"
      y="120"
      width="280"
      height="50"
      rx="8"
      className="fill-blue-100 stroke-blue-500"
    />
    <text
      x="620"
      y="150"
      textAnchor="middle"
      className="font-sans text-base fill-blue-900"
    >
      Florence was founded in 59 BC by Julius Caesar
    </text>
    <rect
      x="510"
      y="180"
      width="220"
      height="40"
      rx="6"
      className="fill-orange-100 stroke-orange-500"
    />
    <text
      x="620"
      y="205"
      textAnchor="middle"
      className="font-sans text-sm fill-orange-800"
    >
      What date did you say?
    </text>
    <line
      x1="620"
      y1="220"
      x2="850"
      y2="120"
      className="stroke-gray-500 stroke-2"
      markerEnd="url(#arrowhead)"
    />
    <rect
      x="810"
      y="120"
      width="280"
      height="50"
      rx="8"
      className="fill-blue-100 stroke-blue-500"
    />
    <text
      x="950"
      y="150"
      textAnchor="middle"
      className="font-sans text-base fill-blue-900"
    >
      Florence was founded in 59 BC by Julius Caesar
    </text>
    <rect
      x="840"
      y="180"
      width="220"
      height="40"
      rx="6"
      className="fill-orange-100 stroke-orange-500"
    />
    <text
      x="950"
      y="205"
      textAnchor="middle"
      className="font-sans text-sm fill-orange-800"
    >
      What date did you say?
    </text>
    <line
      x1="950"
      y1="220"
      x2="1180"
      y2="120"
      className="stroke-gray-500 stroke-2"
      markerEnd="url(#arrowhead)"
    />
    <text
      x="1250"
      y="160"
      className="font-sans text-5xl fill-red-500 font-bold"
    >
      ...∞
    </text>
    <rect
      x="100"
      y="300"
      width="1400"
      height="250"
      rx="8"
      className="fill-green-50 stroke-green-500 stroke-2"
    />
    <text
      x="800"
      y="330"
      textAnchor="middle"
      className="font-sans text-xl fill-green-700 font-bold"
    >
      SOLUTION: A Single Scene with a Reference
    </text>
    <g transform="translate(450, 0)">
      <rect
        x="200"
        y="380"
        width="300"
        height="100"
        rx="12"
        className="fill-none stroke-green-600 stroke-[3]"
        style={{ strokeDasharray: "8,6" }}
      />
      <text
        x="350"
        y="370"
        textAnchor="middle"
        className="font-sans text-base fill-green-600 font-bold"
      >
        town_square_scene
      </text>
      <rect
        x="220"
        y="400"
        width="260"
        height="40"
        rx="8"
        className="fill-blue-100 stroke-blue-500"
      />
      <text
        x="350"
        y="425"
        textAnchor="middle"
        className="font-sans text-base fill-blue-900"
      >
        This is the town square.
      </text>
      <rect
        x="250"
        y="450"
        width="200"
        height="30"
        rx="6"
        className="fill-orange-100 stroke-orange-500"
      />
      <text
        x="350"
        y="470"
        textAnchor="middle"
        className="font-sans text-sm fill-orange-800"
      >
        What date did you say?
      </text>
      <path
        d="M 250 465 C 120 520, 120 360, 250 400"
        className="stroke-red-500 stroke-[3] fill-none"
        markerEnd="url(#arrowhead-red)"
      />
      <text
        x="40"
        y="440"
        className="font-sans text-base fill-red-500 font-bold"
        transform="rotate(-15 40 440)"
      >
        Loop!
      </text>
    </g>
  </g>
);

const Step4: React.FC<StepProps> = ({ isVisible }) => (
  <g
    className={`transition-all duration-700 ease-in-out ${
      isVisible ? "opacity-100" : "opacity-0 pointer-events-none"
    }`}
  >
    <rect
      x="500"
      y="80"
      width="600"
      height="220"
      rx="12"
      className="fill-none stroke-green-500 stroke-[3]"
      style={{ strokeDasharray: "5,5" }}
    />
    <text
      x="800"
      y="70"
      textAnchor="middle"
      className="font-sans text-lg fill-green-500 font-bold"
    >
      Scene Object
    </text>
    <rect
      x="600"
      y="110"
      width="400"
      height="50"
      rx="8"
      className="fill-blue-100 stroke-blue-500 stroke-2"
    />
    <text
      x="800"
      y="140"
      textAnchor="middle"
      className="font-sans text-lg fill-blue-900 font-medium"
    >
      Hello traveler, what brings you here?
    </text>
    <rect
      x="550"
      y="200"
      width="220"
      height="80"
      rx="8"
      className="fill-none stroke-orange-500 stroke-[3]"
      style={{ strokeDasharray: "5,5" }}
    />
    <text
      x="660"
      y="195"
      textAnchor="middle"
      className="font-sans text-base fill-orange-500 font-bold"
    >
      Choice Object
    </text>
    <rect
      x="830"
      y="200"
      width="220"
      height="80"
      rx="8"
      className="fill-none stroke-orange-500 stroke-[3]"
      style={{ strokeDasharray: "5,5" }}
    />
    <text
      x="940"
      y="195"
      textAnchor="middle"
      className="font-sans text-base fill-orange-500 font-bold"
    >
      Choice Object
    </text>
    <text
      x="660"
      y="230"
      textAnchor="middle"
      className="font-sans text-base fill-orange-800"
    >
      Looking for sword
    </text>
    <text
      x="660"
      y="255"
      textAnchor="middle"
      className="font-sans text-sm italic fill-gray-600"
    >
      → nextScene: "sword_scene"
    </text>
    <text
      x="940"
      y="230"
      textAnchor="middle"
      className="font-sans text-base fill-orange-800"
    >
      Just passing through
    </text>
    <text
      x="940"
      y="255"
      textAnchor="middle"
      className="font-sans text-sm italic fill-gray-600"
    >
      → nextScene: "farewell_scene"
    </text>
    <rect
      x="300"
      y="400"
      width="300"
      height="120"
      rx="12"
      className="fill-none stroke-green-500 stroke-[3]"
      style={{ strokeDasharray: "5,5" }}
    />
    <text
      x="450"
      y="390"
      textAnchor="middle"
      className="font-sans text-lg fill-green-500 font-bold"
    >
      sword_scene
    </text>
    <rect
      x="320"
      y="430"
      width="260"
      height="40"
      rx="6"
      className="fill-blue-100 stroke-blue-500 stroke-2"
    />
    <text
      x="450"
      y="455"
      textAnchor="middle"
      className="font-sans text-base fill-blue-900 font-medium"
    >
      Ah, the legendary blade!
    </text>
    <rect
      x="1000"
      y="400"
      width="300"
      height="120"
      rx="12"
      className="fill-none stroke-green-500 stroke-[3]"
      style={{ strokeDasharray: "5,5" }}
    />
    <text
      x="1150"
      y="390"
      textAnchor="middle"
      className="font-sans text-lg fill-green-500 font-bold"
    >
      farewell_scene
    </text>
    <rect
      x="1020"
      y="430"
      width="260"
      height="40"
      rx="6"
      className="fill-blue-100 stroke-blue-500 stroke-2"
    />
    <text
      x="1150"
      y="455"
      textAnchor="middle"
      className="font-sans text-base fill-blue-900 font-medium"
    >
      Safe travels then
    </text>
    <line
      x1="660"
      y1="280"
      x2="450"
      y2="400"
      className="stroke-gray-500 stroke-2"
      style={{ strokeDasharray: "5,5" }}
      markerEnd="url(#arrowhead)"
    />
    <line
      x1="940"
      y1="280"
      x2="1150"
      y2="400"
      className="stroke-gray-500 stroke-2"
      style={{ strokeDasharray: "5,5" }}
      markerEnd="url(#arrowhead)"
    />
  </g>
);

const Step5: React.FC<StepProps> = ({ isVisible }) => (
  <g
    className={`transition-all duration-700 ease-in-out font-mono text-base ${
      isVisible ? "opacity-100" : "opacity-0 pointer-events-none"
    }`}
  >
    <rect
      x="50"
      y="50"
      width="1500"
      height="500"
      rx="10"
      className="fill-slate-800 stroke-green-500 stroke-2"
    />

    <text x="100" y="100" className="fill-orange-400">
      const
    </text>
    <text x="170" y="100" className="fill-cyan-400">
      scenes
    </text>
    <text x="250" y="100" className="fill-white">
      {" "}
      = {"{"}
    </text>

    <text x="120" y="140" className="fill-yellow-300">
      town_square
    </text>
    <text x="260" y="140" className="fill-white">
      : {"{"}
    </text>
    <text x="140" y="170" className="fill-cyan-400">
      message
    </text>
    <text x="230" y="170" className="fill-white">
      :{" "}
    </text>
    <text x="250" y="170" className="fill-green-400">
      "This is the town square. What next?"
    </text>
    <text x="650" y="170" className="fill-white">
      ,
    </text>
    <text x="140" y="200" className="fill-cyan-400">
      choices
    </text>
    <text x="220" y="200" className="fill-white">
      : [
    </text>
    <text x="160" y="230" className="fill-white">
      {"{"}{" "}
    </text>
    <text x="190" y="230" className="fill-cyan-400">
      response
    </text>
    <text x="240" y="230" className="fill-white">
      :{" "}
    </text>
    <text x="260" y="230" className="fill-green-400">
      "Ask about the town square again"
    </text>
    <text x="590" y="230" className="fill-white">
      ,{" "}
    </text>
    <text x="610" y="230" className="fill-cyan-400">
      nextScene
    </text>
    <text x="710" y="230" className="fill-white">
      :{" "}
    </text>
    <text x="730" y="230" className="fill-yellow-300">
      "town_square"
    </text>
    <text x="870" y="230" className="fill-white">
      {" "}
      {"}"},
    </text>
    <text x="160" y="260" className="fill-white">
      {"{"}{" "}
    </text>
    <text x="190" y="260" className="fill-cyan-400">
      response
    </text>
    <text x="240" y="260" className="fill-white">
      :{" "}
    </text>
    <text x="260" y="260" className="fill-green-400">
      "Look for the magic sword"
    </text>
    <text x="540" y="260" className="fill-white">
      ,{" "}
    </text>
    <text x="560" y="260" className="fill-cyan-400">
      nextScene
    </text>
    <text x="660" y="260" className="fill-white">
      :{" "}
    </text>
    <text x="680" y="260" className="fill-yellow-300">
      "sword_info"
    </text>
    <text x="810" y="260" className="fill-white">
      {" "}
      {"}"},
    </text>
    <text x="140" y="290" className="fill-white">
      ]
    </text>
    <text x="120" y="320" className="fill-white">
      {"}"},
    </text>

    <text x="120" y="360" className="fill-yellow-300">
      sword_info
    </text>
    <text x="250" y="360" className="fill-white">
      : {"{"} ... {"}"},
    </text>
    <text x="120" y="390" className="fill-yellow-300">
      farewell
    </text>
    <text x="220" y="390" className="fill-white">
      : {"{"} ... {"}"}
    </text>
    <text x="100" y="420" className="fill-white">
      {"}"};
    </text>

    <rect
      x="1000"
      y="120"
      width="450"
      height="200"
      rx="8"
      className="fill-slate-900/70 stroke-green-400"
    />
    <text
      x="1225"
      y="150"
      textAnchor="middle"
      className="font-sans text-xl fill-green-400 font-bold"
    >
      Key Benefits
    </text>
    <text x="1050" y="190" className="font-sans text-lg fill-white">
      ✓ <tspan dy="-0.1em">No data duplication</tspan>
    </text>
    <text x="1050" y="220" className="font-sans text-lg fill-white">
      ✓ <tspan dy="-0.1em">Handles loops naturally</tspan>
    </text>
    <text x="1050" y="250" className="font-sans text-lg fill-white">
      ✓ <tspan dy="-0.1em">Easy to read, write, and debug</tspan>
    </text>
    <text x="1050" y="280" className="font-sans text-lg fill-white">
      ✓ <tspan dy="-0.1em">Reusable scenes (e.g., a generic "goodbye")</tspan>
    </text>
  </g>
);

// Main component is also typed with React.FC
const RpgSceneAnimation: React.FC = () => {
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

  const buttonBaseClasses =
    "bg-blue-500 text-white border-none py-3 px-6 mx-2 rounded-full cursor-pointer text-base font-semibold transition-all duration-300 ease-in-out shadow-lg";
  const buttonHoverClasses = "hover:-translate-y-0.5 hover:shadow-xl";
  const buttonDisabledClasses =
    "disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-lg";

  return (
    <main className="space-y-4">
      <div className="text-center my-5 flex flex-col sm:flex-row flex-wrap justify-between gap-2">
        <button
          onClick={handlePrev}
          disabled={currentStep === 0}
          className={`${buttonBaseClasses} ${buttonHoverClasses} ${buttonDisabledClasses}`}
        >
          ← Previous
        </button>
        <div className="self-center text-center text-xl font-semibold text-blue-500">
          {stepsData[currentStep].title}
        </div>
        <button
          onClick={handleNext}
          disabled={currentStep === stepsData.length - 1}
          className={`${buttonBaseClasses} ${buttonHoverClasses} ${buttonDisabledClasses}`}
        >
          Next →
        </button>
      </div>

      <ColorBox color="blue">{stepsData[currentStep].explanation}</ColorBox>

      <svg
        className="w-full h-auto border border-gray-200 rounded-xl bg-gray-50"
        viewBox="0 0 1600 600"
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

        <Step1 isVisible={currentStep === 0} />
        <Step2 isVisible={currentStep === 1} />
        <Step3 isVisible={currentStep === 2} />
        <Step4 isVisible={currentStep === 3} />
        <Step5 isVisible={currentStep === 4} />
      </svg>
    </main>
  );
};

export default RpgSceneAnimation;
