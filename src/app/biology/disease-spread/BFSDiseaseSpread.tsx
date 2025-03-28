"use client";
import React, { useState, useEffect } from "react";

const BFSDiseaseSpread = () => {
  const [grid, setGrid] = useState<any[]>([]);
  const [speed, setSpeed] = useState(1000);
  const [isRunning, setIsRunning] = useState(false);
  const [currentDay, setCurrentDay] = useState(0);
  const [gridSize, setGridSize] = useState(5);
  const [showLabels, setShowLabels] = useState(true);
  const [animationHistory, setAnimationHistory] = useState<any[]>([]);
  const [historyIndex, setHistoryIndex] = useState(0);
  const [autoAdvance, setAutoAdvance] = useState(true);

  // Initialize the grid
  useEffect(() => {
    resetSimulation();
  }, [gridSize]);

  // Create initial grid
  const createGrid = (size: number) => {
    const newGrid = [];
    for (let i = 0; i < size; i++) {
      const row = [];
      for (let j = 0; j < size; j++) {
        row.push({
          id: `${i}-${j}`,
          row: i,
          col: j,
          status: "healthy",
          wave: -1,
        });
      }
      newGrid.push(row);
    }
    return newGrid;
  };

  // Auto-advance timer effect
  useEffect(() => {
    if (!isRunning || !autoAdvance) return;

    const timer = setTimeout(() => {
      if (historyIndex < animationHistory.length - 1) {
        setHistoryIndex(historyIndex + 1);
      } else {
        setIsRunning(false);
      }
    }, speed);

    return () => clearTimeout(timer);
  }, [isRunning, historyIndex, animationHistory, speed, autoAdvance]);

  // Update grid when history index changes
  useEffect(() => {
    if (animationHistory.length > 0 && historyIndex < animationHistory.length) {
      const historyStep = animationHistory[historyIndex];
      setGrid(historyStep.grid);
      setCurrentDay(historyStep.day);
    }
  }, [historyIndex, animationHistory]);

  // Run the BFS algorithm and create animation history
  const runBFSAlgorithm = () => {
    const newGrid = createGrid(gridSize);
    const history = [];

    // Set patient zero (middle of grid)
    const startRow = Math.floor(gridSize / 2);
    const startCol = Math.floor(gridSize / 2);

    newGrid[startRow][startCol].status = "infected";
    newGrid[startRow][startCol].wave = 0;

    // Save initial state (day 0)
    history.push({
      day: 0,
      grid: JSON.parse(JSON.stringify(newGrid)),
      infected: 1,
    });

    let queue = [{ row: startRow, col: startCol, wave: 0 }];
    const visited = [{ row: startRow, col: startCol }];

    // Define directions for adjacency
    const directions = [
      [-1, 0],
      [1, 0],
      [0, -1],
      [0, 1],
    ]; // up, down, left, right

    // Process wave by wave
    let currentWave = 0;

    // Continue until queue is empty
    while (queue.length > 0) {
      // Get all nodes in the current wave
      const currentWaveNodes = [];

      // Filter only nodes in the current wave
      while (queue.length > 0 && queue[0].wave === currentWave) {
        currentWaveNodes.push(queue.shift());
      }

      // If no nodes in current wave, move to next wave
      if (currentWaveNodes.length === 0) {
        if (queue.length > 0) {
          currentWave = queue[0].wave;
          continue;
        } else {
          break; // No more nodes to process
        }
      }

      // Process all nodes in the current wave
      const newNeighbors: any[] = [];

      currentWaveNodes.forEach((node) => {
        if (!node) return;
        directions.forEach(([dx, dy]) => {
          const newRow = node.row + dx;
          const newCol = node.col + dy;

          // Check if within bounds and not visited
          if (
            newRow >= 0 &&
            newRow < gridSize &&
            newCol >= 0 &&
            newCol < gridSize &&
            !visited.some((v) => v.row === newRow && v.col === newCol) &&
            !newNeighbors.some((n) => n.row === newRow && n.col === newCol)
          ) {
            const neighbor = { row: newRow, col: newCol, wave: node.wave + 1 };
            newNeighbors.push(neighbor);

            // Update grid
            newGrid[newRow][newCol].status = "infected";
            newGrid[newRow][newCol].wave = neighbor.wave;
          }
        });
      });

      // Add all new neighbors to queue and visited
      queue = [...queue, ...newNeighbors];
      visited.push(...newNeighbors);

      // Increment the wave counter
      currentWave++;

      // Save this state to history if there were new infections
      if (newNeighbors.length > 0) {
        history.push({
          day: currentWave,
          grid: JSON.parse(JSON.stringify(newGrid)),
          infected: visited.length,
        });
      }
    }

    return history;
  };

  // Start the simulation
  const startSimulation = () => {
    // Run the full BFS algorithm and save the animation history
    const history = runBFSAlgorithm();
    setAnimationHistory(history);

    // Reset to the beginning of the animation
    setHistoryIndex(0);
    setIsRunning(true);
  };

  // Reset the simulation
  const resetSimulation = () => {
    setIsRunning(false);
    setGrid(createGrid(gridSize));
    setCurrentDay(0);
    setAnimationHistory([]);
    setHistoryIndex(0);
  };

  // Pause the simulation
  const pauseSimulation = () => {
    setIsRunning(false);
  };

  // Resume the simulation
  const resumeSimulation = () => {
    if (historyIndex < animationHistory.length - 1) {
      setIsRunning(true);
    }
  };

  // Step forward one day
  const stepForward = () => {
    if (historyIndex < animationHistory.length - 1) {
      setHistoryIndex(historyIndex + 1);
    }
  };

  // Step backward one day
  const stepBackward = () => {
    if (historyIndex > 0) {
      setHistoryIndex(historyIndex - 1);
    }
  };

  const getNodeColor = (status: string, wave: number) => {
    if (status === "healthy") return "bg-green-200";

    // Create a gradient of reds based on wave number
    let intensity;

    // Make sure the color intensity is appropriate
    if (wave === 0) {
      return "bg-purple-500"; // Patient zero is purple
    } else if (wave === 1) {
      intensity = 600;
    } else if (wave === 2) {
      intensity = 500;
    } else if (wave === 3) {
      intensity = 400;
    } else {
      intensity = 300;
    }

    return `bg-red-${intensity}`;
  };

  return (
    <div className="flex flex-col items-center p-4 bg-gray-100 rounded-lg shadow-md w-full max-w-3xl">
      <h1 className="text-2xl font-bold mb-4">Disease Spread Using BFS</h1>

      <div className="mb-4 text-center max-w-xl">
        <p className="mb-2">
          This visualization shows how a disease spreads through a population
          using the Breadth-First Search (BFS) algorithm.
        </p>
        <p className="mb-2">
          Each square represents a person. Green squares are healthy, and red
          squares are infected.
        </p>
        <p className="mb-2 font-bold">
          Important: Watch how the disease spreads in complete "waves" day by
          day - this is exactly how BFS works!
        </p>
      </div>

      <div className="flex mb-4 space-x-4">
        <div>
          <label className="block text-sm mb-1">Grid Size:</label>
          <select
            value={gridSize}
            onChange={(e) => setGridSize(parseInt(e.target.value))}
            className="p-1 border rounded"
            disabled={isRunning}
          >
            <option value="3">3x3</option>
            <option value="5">5x5</option>
            <option value="7">7x7</option>
            <option value="9">9x9</option>
          </select>
        </div>

        <div>
          <label className="block text-sm mb-1">Speed:</label>
          <select
            value={speed}
            onChange={(e) => setSpeed(parseInt(e.target.value))}
            className="p-1 border rounded"
          >
            <option value="2000">Slow</option>
            <option value="1000">Medium</option>
            <option value="500">Fast</option>
          </select>
        </div>

        <div className="flex items-end">
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={showLabels}
              onChange={() => setShowLabels(!showLabels)}
              className="mr-1"
            />
            <span className="text-sm">Show Wave Numbers</span>
          </label>
        </div>

        <div className="flex items-end">
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={autoAdvance}
              onChange={() => setAutoAdvance(!autoAdvance)}
              className="mr-1"
            />
            <span className="text-sm">Auto Advance</span>
          </label>
        </div>
      </div>

      <div className="flex space-x-2 mb-4">
        <button
          onClick={startSimulation}
          disabled={isRunning}
          className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-blue-300"
        >
          Start
        </button>
        {isRunning ? (
          <button
            onClick={pauseSimulation}
            className="px-4 py-2 bg-yellow-500 text-white rounded"
          >
            Pause
          </button>
        ) : (
          <button
            onClick={resumeSimulation}
            disabled={
              historyIndex >= animationHistory.length - 1 ||
              animationHistory.length === 0
            }
            className="px-4 py-2 bg-green-500 text-white rounded disabled:bg-green-300"
          >
            Resume
          </button>
        )}
        <button
          onClick={resetSimulation}
          className="px-4 py-2 bg-red-500 text-white rounded"
        >
          Reset
        </button>
      </div>

      <div className="flex space-x-2 mb-4">
        <button
          onClick={stepBackward}
          disabled={historyIndex <= 0 || isRunning}
          className="px-4 py-2 bg-gray-500 text-white rounded disabled:bg-gray-300"
        >
          Previous Day
        </button>
        <button
          onClick={stepForward}
          disabled={historyIndex >= animationHistory.length - 1 || isRunning}
          className="px-4 py-2 bg-gray-500 text-white rounded disabled:bg-gray-300"
        >
          Next Day
        </button>
      </div>

      <div className="mb-4">
        <div className="font-bold">Current Day: {currentDay}</div>
        <div>
          People Infected: {animationHistory[historyIndex]?.infected || 0}
        </div>
      </div>

      <div
        className="grid gap-1 p-2 bg-white rounded-lg shadow-inner"
        style={{
          gridTemplateColumns: `repeat(${gridSize}, minmax(0, 1fr))`,
          width: `${gridSize * 40}px`,
        }}
      >
        {grid.flat().map((node) => (
          <div
            key={node.id}
            className={`w-8 h-8 flex items-center justify-center rounded ${getNodeColor(
              node.status,
              node.wave
            )}`}
          >
            {showLabels && node.wave >= 0 && node.wave}
          </div>
        ))}
      </div>

      <div className="mt-4 p-2 bg-white rounded-lg shadow-inner max-w-xl">
        <h3 className="font-bold mb-2">How BFS Works in Disease Spread:</h3>
        <ol className="list-decimal pl-5 space-y-1 text-sm">
          <li>
            The disease starts with one infected person (patient zero) - Day 0.
          </li>
          <li>
            In the first wave (Day 1), the disease spreads to all direct
            contacts.
          </li>
          <li>
            In the second wave (Day 2), it spreads to contacts of those infected
            on Day 1.
          </li>
          <li>
            In the third wave (Day 3), it spreads to contacts of those infected
            on Day 2.
          </li>
          <li>
            This continues in "waves" or "levels" - exactly how BFS algorithm
            works!
          </li>
          <li>
            Each wave corresponds to the distance (shortest path) from patient
            zero.
          </li>
          <li>
            The algorithm completes each "level" before moving to the next.
          </li>
        </ol>

        <div className="mt-3 p-2 bg-gray-100 rounded">
          <h4 className="font-bold">Key BFS Concepts Illustrated:</h4>
          <ul className="list-disc pl-5 space-y-1 text-sm mt-1">
            <li>Queue: People waiting to spread the disease</li>
            <li>Visit Marking: Once infected, you can't be infected again</li>
            <li>
              Level-by-level exploration: Complete one wave before starting the
              next
            </li>
            <li>
              Distance tracking: The wave number shows distance from source
            </li>
          </ul>
        </div>

        <div className="mt-3 p-2 bg-yellow-100 rounded">
          <h4 className="font-bold">Interactive Controls:</h4>
          <ul className="list-disc pl-5 space-y-1 text-sm mt-1">
            <li>
              Use "Previous Day" and "Next Day" buttons to step through the BFS
              process
            </li>
            <li>Patient Zero is shown in purple</li>
            <li>Each day (wave) is a different shade of red</li>
            <li>Turn off "Auto Advance" to manually control the simulation</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default BFSDiseaseSpread;
