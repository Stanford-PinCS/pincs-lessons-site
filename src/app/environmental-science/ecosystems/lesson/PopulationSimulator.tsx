"use client";

import List from "@/components/List";
import React, { useState, useEffect, useRef } from "react";

interface Species {
  id: string;
  type: "producer" | "herbivore" | "carnivore";
  name: string;
  population: number;
  growthRate: number;
  consumptionRate: number;
  color: string;
  emoji: string;
}

interface Connection {
  from: string;
  to: string;
}

interface PopulationSimulatorProps {
  nodes: Array<{
    id: string;
    type: "producer" | "herbivore" | "carnivore";
    emoji: string;
    color: string;
  }>;
  edges: Array<{ from: string; to: string }>;
}

const PopulationSimulator: React.FC<PopulationSimulatorProps> = ({
  nodes,
  edges,
}) => {
  const [species, setSpecies] = useState<Species[]>([]);
  const [isSimulating, setIsSimulating] = useState(false);
  const [simulationSpeed, setSimulationSpeed] = useState(1);
  const [timeStep, setTimeStep] = useState(0);
  const [history, setHistory] = useState<{ [key: string]: number[] }>({});
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number | undefined>(undefined);

  // Initialize species from nodes
  useEffect(() => {
    const initialSpecies: Species[] = nodes.map((node) => ({
      id: node.id,
      type: node.type,
      name: `${node.emoji} ${
        node.type.charAt(0).toUpperCase() + node.type.slice(1)
      }`,
      population: 100,
      growthRate: node.type === "producer" ? 0.05 : -0.02,
      consumptionRate: node.type === "producer" ? 0 : 0.1,
      color: node.color,
      emoji: node.emoji,
    }));
    setSpecies(initialSpecies);
    setHistory(
      initialSpecies.reduce(
        (acc, s) => ({
          ...acc,
          [s.id]: [s.population],
        }),
        {}
      )
    );
  }, [nodes]);

  // Simulation logic
  const simulateStep = () => {
    setSpecies((prevSpecies) => {
      const newSpecies = prevSpecies.map((species) => {
        let newPopulation = species.population;

        if (species.type === "producer") {
          // Producers grow based on available space and resources
          const carryingCapacity = 1000; // Maximum population for producers
          const growthFactor = 1 - species.population / carryingCapacity;
          newPopulation +=
            species.population * species.growthRate * growthFactor;
        } else {
          // Find food sources for this species
          const foodSources = edges
            .filter((edge) => edge.to === species.id)
            .map((edge) => prevSpecies.find((s) => s.id === edge.from))
            .filter((s): s is Species => s !== undefined);

          // Calculate available food
          const availableFood = foodSources.reduce(
            (sum, food) => sum + food.population * species.consumptionRate,
            0
          );

          // Calculate carrying capacity based on available food
          const carryingCapacity = availableFood * 10; // Each unit of food can support 10 individuals

          // Population change based on available food and current population
          const foodFactor = availableFood / (species.population + 1); // +1 to avoid division by zero
          const carryingFactor = 1 - species.population / carryingCapacity;

          // Population decreases if there's not enough food
          if (foodFactor < 0.5) {
            newPopulation -= species.population * 0.1; // 10% decrease when food is scarce
          } else {
            // Population can grow if there's enough food and space
            newPopulation +=
              species.population *
              species.growthRate *
              carryingFactor *
              foodFactor;
          }

          // Natural death rate
          newPopulation -= species.population * 0.01; // 1% natural death rate
        }

        // Ensure population stays within reasonable bounds
        newPopulation = Math.max(0, Math.min(1000, newPopulation));

        return { ...species, population: newPopulation };
      });

      // Update history
      setHistory((prevHistory) => {
        const newHistory = { ...prevHistory };
        newSpecies.forEach((s) => {
          newHistory[s.id] = [...(newHistory[s.id] || []), s.population];
          // Keep only last 100 data points
          if (newHistory[s.id].length > 100) {
            newHistory[s.id] = newHistory[s.id].slice(-100);
          }
        });
        return newHistory;
      });

      return newSpecies;
    });

    setTimeStep((prev) => prev + 1);
  };

  // Animation loop
  useEffect(() => {
    if (isSimulating) {
      const interval = setInterval(simulateStep, 1000 / simulationSpeed);
      return () => clearInterval(interval);
    }
  }, [isSimulating, simulationSpeed]);

  // Draw population graph
  useEffect(() => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw background
    ctx.fillStyle = "#f8f9fa";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw grid lines
    ctx.strokeStyle = "#e9ecef";
    ctx.lineWidth = 1;
    for (let i = 0; i < canvas.height; i += 50) {
      ctx.beginPath();
      ctx.moveTo(0, i);
      ctx.lineTo(canvas.width, i);
      ctx.stroke();
    }

    // Draw population lines
    species.forEach((species, index) => {
      const data = history[species.id] || [];
      if (data.length < 2) return;

      ctx.beginPath();
      ctx.strokeStyle = species.color;
      ctx.lineWidth = 2;

      data.forEach((value, index) => {
        const x = (index / (data.length - 1)) * canvas.width;
        const y = canvas.height - (value / 1000) * canvas.height;
        if (index === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      });

      ctx.stroke();

      // Draw species label
      ctx.fillStyle = species.color;
      ctx.font = "12px Arial";
      ctx.fillText(species.name, 10, 20 + index * 20);
    });
  }, [species, history]);

  return (
    <div className="p-4 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4 text-center text-purple-700">
        🌱 Population Dynamics Simulator
      </h2>

      <div className="mb-4">
        <canvas
          ref={canvasRef}
          width={600}
          height={300}
          className="border-4 border-purple-300 rounded-lg shadow-lg"
        />
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <h3 className="font-semibold mb-2 text-blue-600">🎮 Controls</h3>
          <div className="space-y-4">
            <button
              onClick={() => setIsSimulating(!isSimulating)}
              className="px-6 py-3 bg-purple-500 text-white rounded-full hover:bg-purple-600 transform hover:scale-105 transition-transform shadow-lg"
            >
              {isSimulating ? "⏸️ Pause" : "▶️ Start"} Simulation
            </button>
            <div>
              <label className="block text-sm text-gray-600">
                Speed: 🐢 → 🐇
              </label>
              <input
                type="range"
                min="1"
                max="5"
                value={simulationSpeed}
                onChange={(e) => setSimulationSpeed(Number(e.target.value))}
                className="w-full"
              />
            </div>
          </div>
        </div>

        <div>
          <h3 className="font-semibold mb-2 text-purple-600">
            📊 Current Populations
          </h3>
          <div className="space-y-2">
            {species.map((s) => (
              <div
                key={s.id}
                className="p-2 rounded-lg bg-gray-50 flex items-center justify-between"
              >
                <span className="flex items-center">
                  <span className="text-2xl mr-2">{s.emoji}</span>
                  <span>{s.name}</span>
                </span>
                <span className="font-medium">{Math.round(s.population)}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-6 p-4 bg-purple-50 rounded-lg">
        <h3 className="font-semibold mb-2 text-purple-700">
          📚 Learning Points
        </h3>
        <List
          items={[
            <>Watch how producer populations affect herbivores</>,
            <>See how carnivore populations depend on their prey</>,
            <>Notice the time delay in population changes</>,
            <>Observe how the ecosystem reaches balance</>,
          ]}
        />
      </div>
    </div>
  );
};

export default PopulationSimulator;
