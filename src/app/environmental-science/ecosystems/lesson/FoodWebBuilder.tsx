"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import List from "@/components/List";

interface Species {
  id: string;
  name: string;
  type: "producer" | "herbivore" | "carnivore";
  position: { x: number; y: number };
}

interface Connection {
  from: string;
  to: string;
}

const speciesList = [
  { name: "Grass", type: "producer" as const },
  { name: "Berries", type: "producer" as const },
  { name: "Rabbit", type: "herbivore" as const },
  { name: "Deer", type: "herbivore" as const },
  { name: "Fox", type: "carnivore" as const },
  { name: "Owl", type: "carnivore" as const },
];

const FoodWebBuilder = () => {
  const [species, setSpecies] = useState<Species[]>([]);
  const [connections, setConnections] = useState<Connection[]>([]);
  const [selectedSpecies, setSelectedSpecies] = useState<string | null>(null);
  const [draggedSpecies, setDraggedSpecies] = useState<string | null>(null);

  const addSpecies = (
    name: string,
    type: "producer" | "herbivore" | "carnivore"
  ) => {
    const newSpecies: Species = {
      id: `${name}-${Date.now()}`,
      name,
      type,
      position: { x: 100, y: 100 },
    };
    setSpecies([...species, newSpecies]);
  };

  const handleDragStart = (id: string) => {
    setDraggedSpecies(id);
  };

  const handleDragEnd = (id: string, position: { x: number; y: number }) => {
    setSpecies(species.map((s) => (s.id === id ? { ...s, position } : s)));
    setDraggedSpecies(null);
  };

  const handleSpeciesClick = (id: string) => {
    if (selectedSpecies && selectedSpecies !== id) {
      // Check if connection is valid
      const fromSpecies = species.find((s) => s.id === selectedSpecies);
      const toSpecies = species.find((s) => s.id === id);

      if (fromSpecies && toSpecies) {
        const isValid =
          (fromSpecies.type === "producer" && toSpecies.type === "herbivore") ||
          (fromSpecies.type === "herbivore" &&
            toSpecies.type === "carnivore") ||
          (fromSpecies.type === "herbivore" && toSpecies.type === "herbivore");

        if (isValid) {
          setConnections([...connections, { from: selectedSpecies, to: id }]);
        }
      }
      setSelectedSpecies(null);
    } else {
      setSelectedSpecies(id);
    }
  };

  const getSpeciesColor = (type: string) => {
    switch (type) {
      case "producer":
        return "bg-green-500";
      case "herbivore":
        return "bg-yellow-500";
      case "carnivore":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-4 mb-6">
        {speciesList.map((s) => (
          <button
            key={s.name}
            onClick={() => addSpecies(s.name, s.type)}
            className={`px-4 py-2 rounded-lg text-white ${getSpeciesColor(
              s.type
            )} hover:opacity-80 transition-opacity`}
          >
            Add {s.name}
          </button>
        ))}
      </div>

      <div className="relative h-[400px] border-2 border-dashed border-gray-300 rounded-lg bg-gray-50">
        {species.map((s) => (
          <motion.div
            key={s.id}
            drag
            dragMomentum={false}
            onDragStart={() => handleDragStart(s.id)}
            onDragEnd={(_, info) =>
              handleDragEnd(s.id, {
                x: s.position.x + info.offset.x,
                y: s.position.y + info.offset.y,
              })
            }
            initial={s.position}
            animate={s.position}
            className={`absolute cursor-move p-3 rounded-full text-white ${getSpeciesColor(
              s.type
            )} 
              ${selectedSpecies === s.id ? "ring-4 ring-blue-500" : ""}`}
            onClick={() => handleSpeciesClick(s.id)}
          >
            {s.name}
          </motion.div>
        ))}

        {connections.map((conn, index) => {
          const from = species.find((s) => s.id === conn.from);
          const to = species.find((s) => s.id === conn.to);

          if (!from || !to) return null;

          return (
            <svg
              key={index}
              className="absolute top-0 left-0 w-full h-full pointer-events-none"
            >
              <line
                x1={from.position.x + 20}
                y1={from.position.y + 20}
                x2={to.position.x + 20}
                y2={to.position.y + 20}
                stroke="black"
                strokeWidth="2"
                markerEnd="url(#arrowhead)"
              />
            </svg>
          );
        })}

        <svg className="hidden">
          <defs>
            <marker
              id="arrowhead"
              markerWidth="10"
              markerHeight="7"
              refX="9"
              refY="3.5"
              orient="auto"
            >
              <polygon points="0 0, 10 3.5, 0 7" fill="black" />
            </marker>
          </defs>
        </svg>
      </div>

      <div className="text-lg text-gray-600">
        <p className="mb-2">How to use:</p>
        <List
          items={[
            <>Click the buttons above to add species to the food web</>,
            <>Drag species to position them</>,
            <>
              Click one species, then another to create a feeding relationship
            </>,
            <>Green = Producers (plants)</>,
            <>Yellow = Herbivores (plant-eaters)</>,
            <>Red = Carnivores (meat-eaters)</>,
          ]}
        />
      </div>
    </div>
  );
};

export default FoodWebBuilder;
