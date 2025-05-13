"use client";

import React, { useState, useRef, useEffect } from "react";

interface Node {
  id: string;
  type: "producer" | "herbivore" | "carnivore";
  x: number;
  y: number;
  connections: string[];
  color: string;
  emoji: string;
}

interface Edge {
  from: string;
  to: string;
  visited: boolean;
}

type NodeType = {
  type: "producer" | "herbivore" | "carnivore";
  emoji: string;
  color: string;
  name: string;
};

const EcosystemExplorer: React.FC = () => {
  const [nodes, setNodes] = useState<Node[]>([]);
  const [edges, setEdges] = useState<Edge[]>([]);
  const [selectedNode, setSelectedNode] = useState<string | null>(null);
  const [isSimulating, setIsSimulating] = useState(false);
  const [algorithm, setAlgorithm] = useState<"bfs" | "dfs">("bfs");
  const [currentStep, setCurrentStep] = useState(0);
  const [simulationSpeed, setSimulationSpeed] = useState(1);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number | undefined>(undefined);

  const nodeTypes: NodeType[] = [
    { type: "producer", emoji: "🌿", color: "#4CAF50", name: "Plant" },
    { type: "herbivore", emoji: "🦓", color: "#FFB6C1", name: "Herbivore" },
    { type: "carnivore", emoji: "🦁", color: "#FFA500", name: "Carnivore" },
  ];

  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!canvasRef.current) return;

    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Check if clicking on an existing node
    const clickedNode = nodes.find((node) => {
      const dx = node.x - x;
      const dy = node.y - y;
      return Math.sqrt(dx * dx + dy * dy) < 20; // 20 is the node radius
    });

    if (clickedNode) {
      setSelectedNode(clickedNode.id);
      return;
    }

    if (selectedNode) {
      // Connect nodes
      const newEdge: Edge = {
        from: selectedNode,
        to: `node-${nodes.length}`,
        visited: false,
      };
      setEdges([...edges, newEdge]);
      setSelectedNode(null);
    } else {
      // Add new node
      const newNode: Node = {
        id: `node-${nodes.length}`,
        type: "producer",
        x,
        y,
        connections: [],
        color: nodeTypes[0].color,
        emoji: nodeTypes[0].emoji,
      };
      setNodes([...nodes, newNode]);
      setSelectedNode(newNode.id);
    }
  };

  const handleNodeTypeChange = (
    type: "producer" | "herbivore" | "carnivore"
  ) => {
    if (!selectedNode) return;

    const nodeType = nodeTypes.find((t) => t.type === type);
    if (!nodeType) return;

    setNodes(
      nodes.map((node) =>
        node.id === selectedNode
          ? { ...node, type, color: nodeType.color, emoji: nodeType.emoji }
          : node
      )
    );
  };

  const runSimulation = () => {
    if (nodes.length === 0) return;

    const visited = new Set<string>();
    const queue: string[] = [];
    const path: string[] = [];

    // Start with the first node
    queue.push(nodes[0].id);
    visited.add(nodes[0].id);

    const simulateStep = () => {
      if (queue.length === 0) {
        setIsSimulating(false);
        return;
      }

      const currentId = algorithm === "bfs" ? queue.shift()! : queue.pop()!;
      path.push(currentId);

      // Update edges to show visited state
      setEdges(
        edges.map((edge) => ({
          ...edge,
          visited: path.includes(edge.from) && path.includes(edge.to),
        }))
      );

      // Add unvisited neighbors to queue
      const current = nodes.find((n) => n.id === currentId);
      if (current) {
        edges
          .filter((edge) => edge.from === currentId || edge.to === currentId)
          .forEach((edge) => {
            const neighborId = edge.from === currentId ? edge.to : edge.from;
            if (!visited.has(neighborId)) {
              queue.push(neighborId);
              visited.add(neighborId);
            }
          });
      }

      setCurrentStep(path.length);
    };

    const interval = setInterval(simulateStep, 1000 / simulationSpeed);
    return () => clearInterval(interval);
  };

  useEffect(() => {
    if (isSimulating) {
      const cleanup = runSimulation();
      return cleanup;
    }
  }, [isSimulating, algorithm, simulationSpeed]);

  useEffect(() => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw edges
    edges.forEach((edge) => {
      const fromNode = nodes.find((n) => n.id === edge.from);
      const toNode = nodes.find((n) => n.id === edge.to);
      if (!fromNode || !toNode) return;

      ctx.beginPath();
      ctx.moveTo(fromNode.x, fromNode.y);
      ctx.lineTo(toNode.x, toNode.y);
      ctx.strokeStyle = edge.visited ? "#4CAF50" : "#ccc";
      ctx.lineWidth = edge.visited ? 3 : 1;
      ctx.stroke();
    });

    // Draw nodes
    nodes.forEach((node) => {
      // Draw shadow
      ctx.beginPath();
      ctx.arc(node.x, node.y + 5, 20, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(0,0,0,0.1)";
      ctx.fill();

      // Draw node
      ctx.beginPath();
      ctx.arc(node.x, node.y, 20, 0, Math.PI * 2);
      ctx.fillStyle = node.color;
      ctx.fill();

      // Draw emoji
      ctx.font = "24px Arial";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(node.emoji, node.x, node.y);
    });
  }, [nodes, edges, currentStep]);

  return (
    <div className="p-4 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4 text-center text-green-700">
        🌿 Ecosystem Explorer 🦁
      </h2>

      <div className="mb-4">
        <canvas
          ref={canvasRef}
          width={600}
          height={400}
          className="border-4 border-green-300 rounded-lg shadow-lg cursor-pointer"
          onClick={handleCanvasClick}
        />
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <h3 className="font-semibold mb-2 text-blue-600">🎮 Controls</h3>
          <div className="space-y-4">
            <div className="flex space-x-2">
              <button
                onClick={() => setAlgorithm("bfs")}
                className={`px-4 py-2 rounded-full ${
                  algorithm === "bfs"
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200 text-gray-700"
                }`}
              >
                BFS
              </button>
              <button
                onClick={() => setAlgorithm("dfs")}
                className={`px-4 py-2 rounded-full ${
                  algorithm === "dfs"
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200 text-gray-700"
                }`}
              >
                DFS
              </button>
            </div>
            <button
              onClick={() => setIsSimulating(!isSimulating)}
              className="px-6 py-3 bg-green-500 text-white rounded-full hover:bg-green-600 transform hover:scale-105 transition-transform shadow-lg"
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
            🎨 Species Palette
          </h3>
          <div className="space-y-2">
            {nodeTypes.map((type) => (
              <button
                key={type.type}
                onClick={() => handleNodeTypeChange(type.type)}
                className={`w-full p-2 rounded-lg ${
                  selectedNode
                    ? "bg-gray-50 hover:bg-gray-100"
                    : "bg-gray-200 cursor-not-allowed"
                } flex items-center space-x-2`}
                disabled={!selectedNode}
              >
                <span className="text-2xl">{type.emoji}</span>
                <span>{type.name}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-6 p-4 bg-green-50 rounded-lg">
        <h3 className="font-semibold mb-2 text-green-700">
          📚 Learning Points
        </h3>
        <ul className="list-disc list-inside space-y-2 text-sm">
          <li>Click to place species in the ecosystem</li>
          <li>Click one species then another to create a connection</li>
          <li>Watch how BFS and DFS explore the ecosystem differently</li>
          <li>Notice how energy flows through the food web</li>
        </ul>
      </div>
    </div>
  );
};

export default EcosystemExplorer;
