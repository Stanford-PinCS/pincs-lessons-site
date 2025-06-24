"use client";
import React, { useState } from 'react';

// An array representing the satisfaction (utility) gained from each additional slice.
// Notice how it decreases and eventually becomes negative.
const marginalUtilities = [7, 5, 4, 2, 1, -2, -5, -15];

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
        <main className="max-w-4xl mx-auto px-6 py-12">
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
                    <h1 className="text-3xl font-bold text-blue-500 mb-4">Marginal Utility</h1>
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
                <section className="border-l-4 border-blue-500 pl-6">
                  <h1 className="text-3xl font-bold text-blue-500 mb-4">Putting These Terms together</h1>
                  <div className="space-y-4 text-gray-700 leading-relaxed">
                      <p className="text-lg">
                        Now let's see what these curves look like on a graph.
                      </p>
                      {/* TODO: Insert graph of the curve from above */}
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
            </div>
        </main>
    </div>
  );
}