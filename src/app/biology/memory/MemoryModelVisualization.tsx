"use client";
import React, { useState } from "react";
import { X, RefreshCw, Clock, Brain } from "lucide-react";

const MemoryModelVisualization = () => {
  // State for computer cache
  const [cacheItems, setCacheItems] = useState([
    { id: 1, content: "Recent webpage", accessCount: 3, timeAdded: Date.now() },
    {
      id: 2,
      content: "Homework file",
      accessCount: 5,
      timeAdded: Date.now() - 10000,
    },
    {
      id: 3,
      content: "Calculator app",
      accessCount: 2,
      timeAdded: Date.now() - 20000,
    },
  ]);
  const [newCacheItem, setNewCacheItem] = useState("");
  const [cachePolicy, setCachePolicy] = useState("lru"); // lru, lfu, fifo
  const [cacheCapacity, setCacheCapacity] = useState(5);

  // State for human memory simulation
  const [workingMemory, setWorkingMemory] = useState([
    { id: 1, content: "Phone number I just read", intensity: 5, decay: 0 },
  ]);
  const [shortTermMemory, setShortTermMemory] = useState([
    { id: 1, content: "What I had for breakfast", intensity: 3, decay: 2 },
    { id: 2, content: "Today's homework", intensity: 4, decay: 1 },
  ]);
  const [longTermMemory, setLongTermMemory] = useState([
    {
      id: 1,
      content: "My address",
      intensity: 5,
      decay: 0,
      category: "Semantic",
    },
    {
      id: 2,
      content: "How to ride a bike",
      intensity: 5,
      decay: 0,
      category: "Procedural",
    },
    {
      id: 3,
      content: "My first day at school",
      intensity: 4,
      decay: 1,
      category: "Episodic",
    },
  ]);
  const [newMemoryItem, setNewMemoryItem] = useState("");

  // Handle adding new item to cache
  const addToCache = () => {
    if (!newCacheItem.trim()) return;

    const newItem = {
      id: Date.now(),
      content: newCacheItem,
      accessCount: 1,
      timeAdded: Date.now(),
    };

    if (cacheItems.length >= cacheCapacity) {
      // Apply eviction policy
      const newCacheItems = [...cacheItems];

      if (cachePolicy === "lru") {
        // Least Recently Used - sort by time and remove oldest
        newCacheItems.sort((a, b) => b.timeAdded - a.timeAdded);
        newCacheItems.pop();
      } else if (cachePolicy === "lfu") {
        // Least Frequently Used - sort by access count and remove least used
        newCacheItems.sort((a, b) => b.accessCount - a.accessCount);
        newCacheItems.pop();
      } else if (cachePolicy === "fifo") {
        // First In First Out - remove oldest item
        newCacheItems.shift();
      }

      setCacheItems([newItem, ...newCacheItems]);
    } else {
      // Still have space
      setCacheItems([newItem, ...cacheItems]);
    }

    setNewCacheItem("");
  };

  // Handle accessing a cache item (updates its stats)
  const accessCacheItem = (id: number) => {
    setCacheItems(
      cacheItems.map((item) =>
        item.id === id
          ? {
              ...item,
              accessCount: item.accessCount + 1,
              timeAdded: Date.now(),
            }
          : item
      )
    );
  };

  // Handle removing a cache item
  const removeCacheItem = (id: number) => {
    setCacheItems(cacheItems.filter((item) => item.id !== id));
  };

  // Handle adding new item to working memory
  const addToWorkingMemory = () => {
    if (!newMemoryItem.trim()) return;

    const newItem = {
      id: Date.now(),
      content: newMemoryItem,
      intensity: 5,
      decay: 0,
    };

    // Working memory has limited capacity (typical ~4 items)
    if (workingMemory.length >= 4) {
      // Remove the oldest item
      const updatedMemory = [...workingMemory];
      updatedMemory.pop();
      setWorkingMemory([newItem, ...updatedMemory]);
    } else {
      setWorkingMemory([newItem, ...workingMemory]);
    }

    setNewMemoryItem("");
  };

  // Simulate rehearsal (strengthen a memory)
  const rehearseMemory = (type: string, id: number) => {
    if (type === "working") {
      setWorkingMemory(
        workingMemory.map((item) =>
          item.id === id
            ? {
                ...item,
                intensity: Math.min(5, item.intensity + 1),
                decay: Math.max(0, item.decay - 1),
              }
            : item
        )
      );

      // If rehearsed enough, it might go to short-term memory
      const itemToMove = workingMemory.find((item) => item.id === id);
      if (itemToMove && itemToMove.intensity >= 5) {
        setShortTermMemory([itemToMove, ...shortTermMemory]);
        setWorkingMemory(workingMemory.filter((item) => item.id !== id));
      }
    } else if (type === "shortTerm") {
      setShortTermMemory(
        shortTermMemory.map((item) =>
          item.id === id
            ? {
                ...item,
                intensity: Math.min(5, item.intensity + 1),
                decay: Math.max(0, item.decay - 1),
              }
            : item
        )
      );

      // If rehearsed enough, it might consolidate to long-term memory
      const itemToMove = shortTermMemory.find((item) => item.id === id);
      if (itemToMove && itemToMove.intensity >= 5 && itemToMove.decay === 0) {
        setLongTermMemory([
          { ...itemToMove, category: "Semantic" },
          ...longTermMemory,
        ]);
        setShortTermMemory(shortTermMemory.filter((item) => item.id !== id));
      }
    }
  };

  // Simulate forgetting (apply decay to memories)
  const simulateMemoryDecay = () => {
    // Working memory decays rapidly
    const updatedWorkingMemory = workingMemory
      .map((item) => ({
        ...item,
        decay: item.decay + 1,
        intensity: Math.max(1, item.intensity - 1),
      }))
      .filter((item) => item.intensity > 1); // Remove forgotten items

    // Short-term memory decays more slowly
    const updatedShortTermMemory = shortTermMemory
      .map((item) => ({
        ...item,
        decay: Math.min(5, item.decay + 1),
        intensity: Math.max(1, item.intensity - (item.decay > 3 ? 1 : 0)),
      }))
      .filter((item) => item.intensity > 1); // Remove forgotten items

    // Long-term memory has minimal decay
    const updatedLongTermMemory = longTermMemory.map((item) => ({
      ...item,
      decay: Math.min(5, item.decay + 0.2),
    }));

    setWorkingMemory(updatedWorkingMemory);
    setShortTermMemory(updatedShortTermMemory);
    setLongTermMemory(updatedLongTermMemory);
  };

  // UI helpers for rendering memory items
  const getIntensityColor = (intensity: number) => {
    const colors = [
      "bg-red-100",
      "bg-orange-100",
      "bg-yellow-100",
      "bg-green-100",
      "bg-blue-100",
    ];
    return colors[intensity - 1] || "bg-gray-100";
  };

  return (
    <div className="flex flex-col p-4 max-w-6xl mx-auto bg-gradient-to-b from-blue-50 to-purple-50">
      <h1 className="text-3xl font-bold text-center mb-2 text-indigo-800">
        Memory Models & Data Structures
      </h1>
      <p className="text-center text-gray-600 mb-8">
        Exploring how computers and brains remember information
      </p>

      <div className="relative mb-8 flex justify-center">
        <div
          className="w-32 h-32 rounded-full bg-blue-100 absolute opacity-60 animate-pulse"
          style={{ left: "30%", top: "-10px" }}
        ></div>
        <div
          className="w-24 h-24 rounded-full bg-purple-100 absolute opacity-60 animate-pulse"
          style={{ left: "60%", top: "10px" }}
        ></div>
        <svg viewBox="0 0 800 200" className="w-full max-w-lg">
          <path
            d="M400,180 C250,180 250,20 150,20 C50,20 50,100 50,100"
            fill="none"
            stroke="#9333ea"
            strokeWidth="3"
            strokeDasharray="5,5"
          />
          <path
            d="M400,180 C550,180 550,20 650,20 C750,20 750,100 750,100"
            fill="none"
            stroke="#3b82f6"
            strokeWidth="3"
            strokeDasharray="5,5"
          />

          {/* Human brain silhouette */}
          <path
            d="M150,100 C150,60 180,40 220,40 C250,40 270,50 280,60 C295,45 315,40 335,45 C355,35 375,40 380,60 C400,50 420,55 430,70 C450,65 470,75 475,90 C490,85 505,95 505,115 C520,120 525,140 515,155 C525,170 520,185 505,190 C500,205 480,210 465,200 C455,210 440,210 430,195 C415,205 395,205 385,190 C370,195 355,190 345,175 C330,185 310,185 300,170 C280,180 255,170 250,155 C235,165 210,155 205,135 C190,140 175,125 175,110 C160,105 150,85 150,100 Z"
            fill="#FCD1D1"
            stroke="#ff6b6b"
            strokeWidth="2"
          />

          {/* Computer chip/circuit */}
          <rect
            x="600"
            y="70"
            width="100"
            height="100"
            fill="#dbeafe"
            stroke="#3b82f6"
            strokeWidth="2"
            rx="10"
          />
          <line
            x1="620"
            y1="70"
            x2="620"
            y2="170"
            stroke="#3b82f6"
            strokeWidth="2"
          />
          <line
            x1="650"
            y1="70"
            x2="650"
            y2="170"
            stroke="#3b82f6"
            strokeWidth="2"
          />
          <line
            x1="680"
            y1="70"
            x2="680"
            y2="170"
            stroke="#3b82f6"
            strokeWidth="2"
          />
          <line
            x1="600"
            y1="90"
            x2="700"
            y2="90"
            stroke="#3b82f6"
            strokeWidth="2"
          />
          <line
            x1="600"
            y1="120"
            x2="700"
            y2="120"
            stroke="#3b82f6"
            strokeWidth="2"
          />
          <line
            x1="600"
            y1="150"
            x2="700"
            y2="150"
            stroke="#3b82f6"
            strokeWidth="2"
          />
          <circle cx="620" cy="90" r="5" fill="#3b82f6" />
          <circle cx="650" cy="120" r="5" fill="#3b82f6" />
          <circle cx="680" cy="150" r="5" fill="#3b82f6" />
        </svg>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Computer Cache Section */}
        <div className="border rounded-lg p-4 shadow-lg bg-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 -mt-10 -mr-10 bg-blue-100 rounded-full opacity-20"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 -mb-6 -ml-6 bg-blue-100 rounded-full opacity-20"></div>

          <h2 className="text-xl font-semibold mb-4 flex items-center text-blue-700">
            <RefreshCw className="w-6 h-6 mr-2 text-blue-500" /> Computer Cache
            Memory
            <div className="ml-auto bg-blue-100 p-1 rounded-full">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                className="text-blue-500"
              >
                <rect
                  x="4"
                  y="4"
                  width="16"
                  height="16"
                  rx="2"
                  fill="currentColor"
                  fillOpacity="0.3"
                />
                <path
                  d="M7 7h4v4H7V7zm6 0h4v4h-4V7zm-6 6h4v4H7v-4zm6 0h4v4h-4v-4z"
                  fill="currentColor"
                />
              </svg>
            </div>
          </h2>

          <div className="mb-4">
            <p className="text-sm text-gray-700 mb-4">
              A cache is like a computer&apos;s &quot;mental notepad&quot; - it
              stores recently or frequently used information for quick access.
              When the cache gets full, some data must be removed based on
              specific rules called &quot;eviction policies.&quot;
            </p>

            <div className="flex gap-2 mb-4">
              <select
                className="border p-2 rounded text-sm flex-grow"
                value={cachePolicy}
                onChange={(e) => setCachePolicy(e.target.value)}
              >
                <option value="lru">LRU (Least Recently Used)</option>
                <option value="lfu">LFU (Least Frequently Used)</option>
                <option value="fifo">FIFO (First In First Out)</option>
              </select>

              <select
                className="border p-2 rounded text-sm"
                value={cacheCapacity}
                onChange={(e) => setCacheCapacity(parseInt(e.target.value))}
              >
                <option value="3">Capacity: 3</option>
                <option value="4">Capacity: 4</option>
                <option value="5">Capacity: 5</option>
                <option value="6">Capacity: 6</option>
              </select>
            </div>

            <div className="flex gap-2 mb-4">
              <input
                type="text"
                value={newCacheItem}
                onChange={(e) => setNewCacheItem(e.target.value)}
                placeholder="Add new item to cache"
                className="border p-2 rounded flex-grow"
              />
              <button
                onClick={addToCache}
                className="bg-blue-500 text-white px-4 py-2 rounded"
              >
                Add Item
              </button>
            </div>
          </div>

          <div className="bg-gray-50 p-3 rounded-lg">
            <div className="text-xs text-gray-500 flex justify-between mb-2">
              <span>
                Cache Items ({cacheItems.length}/{cacheCapacity})
              </span>
              <span>
                {cachePolicy === "lru" &&
                  "Least Recently Used gets removed first"}
                {cachePolicy === "lfu" &&
                  "Least Frequently Used gets removed first"}
                {cachePolicy === "fifo" &&
                  "First In First Out (oldest) gets removed first"}
              </span>
            </div>

            <div className="space-y-2">
              {cacheItems.map((item) => (
                <div
                  key={item.id}
                  className="bg-white p-3 rounded border flex justify-between items-center"
                >
                  <div className="flex-grow">
                    <div className="font-medium">{item.content}</div>
                    <div className="text-xs text-gray-500">
                      Accessed {item.accessCount} times • Added{" "}
                      {Math.floor((Date.now() - item.timeAdded) / 1000)}s ago
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => accessCacheItem(item.id)}
                      className="text-blue-500 text-sm px-2 py-1 rounded hover:bg-blue-50"
                    >
                      Access
                    </button>
                    <button
                      onClick={() => removeCacheItem(item.id)}
                      className="text-red-500"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}

              {cacheItems.length === 0 && (
                <div className="text-center py-4 text-gray-500">
                  Cache is empty
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Human Memory Section */}
        <div className="border rounded-lg p-4 shadow-lg bg-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 -mt-10 -mr-10 bg-purple-100 rounded-full opacity-20"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 -mb-6 -ml-6 bg-purple-100 rounded-full opacity-20"></div>

          <h2 className="text-xl font-semibold mb-4 flex items-center text-purple-700">
            <Brain className="w-6 h-6 mr-2 text-purple-500" /> Human Memory
            Systems
            <div className="ml-auto">
              <svg
                width="32"
                height="32"
                viewBox="0 0 100 100"
                className="text-purple-500"
              >
                <path
                  d="M45,20 C35,20 25,30 25,40 C20,45 15,55 20,65 C25,75 35,80 45,75 C50,85 65,85 75,75 C85,65 85,50 75,40 C80,30 75,20 65,25 C55,15 45,15 45,20 Z"
                  fill="#F5E6FA"
                  stroke="currentColor"
                  strokeWidth="2"
                />
                <path
                  d="M40,40 C45,35 55,35 60,40 M55,45 C60,40 70,40 75,45"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                />
              </svg>
            </div>
          </h2>

          <div className="mb-4">
            <p className="text-sm text-gray-700 mb-4">
              Human memory works in stages: Working memory holds information for
              seconds, short-term memory for minutes to hours, and long-term
              memory for days to decades. Information moves between these
              systems through rehearsal and consolidation.
            </p>

            <div className="flex gap-2 mb-4">
              <input
                type="text"
                value={newMemoryItem}
                onChange={(e) => setNewMemoryItem(e.target.value)}
                placeholder="Add new memory"
                className="border p-2 rounded flex-grow"
              />
              <button
                onClick={addToWorkingMemory}
                className="bg-purple-500 text-white px-4 py-2 rounded"
              >
                Remember
              </button>
            </div>

            <div className="flex gap-2 justify-end mb-4">
              <button
                onClick={simulateMemoryDecay}
                className="bg-gray-500 text-white px-3 py-1 rounded text-sm flex items-center"
              >
                <Clock className="w-4 h-4 mr-1" /> Simulate Forgetting
              </button>
            </div>
          </div>

          <div className="space-y-4">
            {/* Working Memory Section */}
            <div className="bg-purple-50 p-3 rounded-lg border border-purple-200 relative">
              <div className="absolute -right-2 -top-2">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle
                    cx="12"
                    cy="12"
                    r="11"
                    fill="#9F7AEA"
                    fillOpacity="0.2"
                    stroke="#9F7AEA"
                  />
                  <path
                    d="M8 12h8M12 8v8"
                    stroke="#9F7AEA"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
              <div className="text-xs text-purple-700 mb-2 flex justify-between">
                <span className="font-semibold">
                  Working Memory (capacity ~4 items)
                </span>
                <span>Holds information for seconds</span>
              </div>

              <div className="space-y-1">
                {workingMemory.map((item) => (
                  <div
                    key={item.id}
                    className={`${getIntensityColor(
                      item.intensity
                    )} p-2 rounded-lg flex justify-between items-center`}
                  >
                    <div>
                      <span className="text-sm">{item.content}</span>
                      <div className="text-xs text-gray-500">
                        Strength: {Array(item.intensity).fill("★").join("")}
                        {Array(5 - item.intensity)
                          .fill("☆")
                          .join("")}
                      </div>
                    </div>
                    <button
                      onClick={() => rehearseMemory("working", item.id)}
                      className="text-xs bg-purple-200 hover:bg-purple-300 px-2 py-1 rounded"
                    >
                      Rehearse
                    </button>
                  </div>
                ))}

                {workingMemory.length === 0 && (
                  <div className="text-center py-2 text-gray-500 text-sm">
                    Nothing in working memory
                  </div>
                )}
              </div>
            </div>

            {/* Short-term Memory Section */}
            <div className="bg-blue-50 p-3 rounded-lg border border-blue-200 relative">
              <div className="absolute -right-2 -top-2">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle
                    cx="12"
                    cy="12"
                    r="11"
                    fill="#3B82F6"
                    fillOpacity="0.2"
                    stroke="#3B82F6"
                  />
                  <path
                    d="M12 7v10M7 12h10"
                    stroke="#3B82F6"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
              <div className="text-xs text-blue-700 mb-2 flex justify-between">
                <span className="font-semibold">Short-term Memory</span>
                <span>Holds information for minutes to hours</span>
              </div>

              <div className="space-y-1">
                {shortTermMemory.map((item) => (
                  <div
                    key={item.id}
                    className={`${getIntensityColor(
                      item.intensity
                    )} p-2 rounded-lg flex justify-between items-center`}
                  >
                    <div>
                      <span className="text-sm">{item.content}</span>
                      <div className="text-xs text-gray-500">
                        Strength: {Array(item.intensity).fill("★").join("")}
                        {Array(5 - item.intensity)
                          .fill("☆")
                          .join("")}
                      </div>
                    </div>
                    <button
                      onClick={() => rehearseMemory("shortTerm", item.id)}
                      className="text-xs bg-blue-200 hover:bg-blue-300 px-2 py-1 rounded"
                    >
                      Rehearse
                    </button>
                  </div>
                ))}

                {shortTermMemory.length === 0 && (
                  <div className="text-center py-2 text-gray-500 text-sm">
                    Nothing in short-term memory
                  </div>
                )}
              </div>
            </div>

            {/* Long-term Memory Section */}
            <div className="bg-green-50 p-3 rounded-lg border border-green-200 relative">
              <div className="absolute -right-2 -top-2">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle
                    cx="12"
                    cy="12"
                    r="11"
                    fill="#10B981"
                    fillOpacity="0.2"
                    stroke="#10B981"
                  />
                  <path
                    d="M8 12l3 3 5-5"
                    stroke="#10B981"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <div className="text-xs text-green-700 mb-2 flex justify-between">
                <span className="font-semibold">Long-term Memory</span>
                <span>Holds information for days to lifetime</span>
              </div>

              <div className="space-y-1">
                {longTermMemory.map((item) => (
                  <div key={item.id} className="bg-green-100 p-2 rounded-lg">
                    <div className="flex justify-between">
                      <span className="text-sm">{item.content}</span>
                      <span className="text-xs bg-green-200 px-2 py-0.5 rounded">
                        {item.category}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 bg-indigo-50 p-6 rounded-lg border border-indigo-100 shadow-inner relative overflow-hidden">
        <div className="absolute top-0 right-0 opacity-10">
          <svg width="120" height="120" viewBox="0 0 120 120" fill="none">
            <path
              d="M60,10 C30,10 10,30 10,60 C10,90 30,110 60,110 C90,110 110,90 110,60 C110,30 90,10 60,10 Z"
              fill="#4F46E5"
            />
            <path
              d="M40,30 C35,35 30,45 35,55 C25,60 25,75 35,80 C30,90 40,100 50,95 C55,105 70,105 80,95 C90,100 100,90 95,80 C105,75 105,60 95,55 C100,45 95,35 85,40 C80,30 65,30 60,40 C50,35 40,40 40,30 Z"
              fill="#6366F1"
            />
          </svg>
        </div>

        <h3 className="font-semibold mb-3 text-indigo-800 text-lg">
          Key Concepts Comparison:
        </h3>
        <ul className="space-y-3 text-sm relative z-10">
          <li className="flex items-start p-2 hover:bg-indigo-100 rounded-lg transition-colors">
            <div className="bg-indigo-100 p-1 rounded-full mr-3 mt-0.5">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path
                  d="M4 6h16M4 12h16M4 18h10"
                  stroke="#4F46E5"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </div>
            <div>
              <strong className="text-indigo-700">Limited Capacity:</strong>{" "}
              Both computer cache and human working memory have strict capacity
              limits that require eviction/forgetting. Your working memory can
              only hold about 4-7 items at once!
            </div>
          </li>

          <li className="flex items-start p-2 hover:bg-indigo-100 rounded-lg transition-colors">
            <div className="bg-indigo-100 p-1 rounded-full mr-3 mt-0.5">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path
                  d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"
                  stroke="#4F46E5"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <div>
              <strong className="text-indigo-700">Access Speed:</strong> Cache
              memory is faster than main memory, just as working memory provides
              quicker access than long-term memory. This is why you can
              instantly recall a phone number you just heard but might need a
              moment to remember one you learned years ago.
            </div>
          </li>

          <li className="flex items-start p-2 hover:bg-indigo-100 rounded-lg transition-colors">
            <div className="bg-indigo-100 p-1 rounded-full mr-3 mt-0.5">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path
                  d="M5 3v4M3 5h4M6 17v4M4 19h4M13 3l4 4M17 3h-4v4M13 17l4 4M17 21h-4v-4"
                  stroke="#4F46E5"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <div>
              <strong className="text-indigo-700">Item Importance:</strong> Both
              systems try to keep the most valuable information - computers use
              algorithms (LRU, LFU), while humans retain emotionally significant
              or frequently rehearsed memories. Ever notice how you remember
              embarrassing moments much longer than routine ones?
            </div>
          </li>

          <li className="flex items-start p-2 hover:bg-indigo-100 rounded-lg transition-colors">
            <div className="bg-indigo-100 p-1 rounded-full mr-3 mt-0.5">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path
                  d="M12 8v4l2 2M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  stroke="#4F46E5"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </div>
            <div>
              <strong className="text-indigo-700">Decay:</strong> Without
              rehearsal, memories fade. Computer caches implement this through
              eviction policies while human memory has natural decay mechanisms.
              This is why studying the same material repeatedly (spaced
              repetition) helps you remember it better!
            </div>
          </li>

          <li className="flex items-start p-2 hover:bg-indigo-100 rounded-lg transition-colors">
            <div className="bg-indigo-100 p-1 rounded-full mr-3 mt-0.5">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path
                  d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z"
                  stroke="#4F46E5"
                  strokeWidth="2"
                />
                <path
                  d="M3.3 7L12 12l8.7-5M12 22V12"
                  stroke="#4F46E5"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </div>
            <div>
              <strong className="text-indigo-700">Organization:</strong> Both
              systems organize information for efficient retrieval - computers
              use addressing while human long-term memory uses semantic networks
              and associations. This is why relating new information to things
              you already know helps you learn better!
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default MemoryModelVisualization;
