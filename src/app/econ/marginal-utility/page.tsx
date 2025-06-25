"use client";
import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';

const marginalUtilities = [10, 7, 4, 1, -2, -5, -8, -11];


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
                      Below is an example of a table showing the utility of each flavor of ice cream for each number of scoops you get.
                    </p>
                    <div className="overflow-x-auto">
                      <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
                        <thead>
                          <tr className="bg-gray-100">
                            <th className="px-6 py-3 text-left text-sm font-medium text-gray-700"># of Scoops</th>
                            <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Chocolate</th>
                            <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Vanilla</th>
                            <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Strawberry</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr className="hover:bg-gray-50 transition-colors duration-200">
                            <td className="px-6 py-4 border-b border-gray-200">1st Scoop (utils)</td>
                            <td className="px-6 py-4 border-b border-gray-200">10</td>
                            <td className="px-6 py-4 border-b border-gray-200">8</td>
                            <td className="px-6 py-4 border-b border-gray-200">9</td>
                          </tr>
                          <tr className="hover:bg-gray-50 transition-colors duration-200">
                            <td className="px-6 py-4 border-b border-gray-200">2nd Scoop (utils)</td>
                            <td className="px-6 py-4 border-b border-gray-200">7</td>
                            <td className="px-6 py-4 border-b border-gray-200">5</td>
                            <td className="px-6 py-4 border-b border-gray-200">6</td>
                          </tr>
                          <tr className="hover:bg-gray-50 transition-colors duration-200">
                            <td className="px-6 py-4 border-b border-gray-200">3rd Scoop (utils)</td>
                            <td className="px-6 py-4 border-b border-gray-200">4</td>
                            <td className="px-6 py-4 border-b border-gray-200">2</td>
                            <td className="px-6 py-4 border-b border-gray-200">3</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </section>
            </div>
        </main>
    </div>
  );
}