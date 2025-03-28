"use client";
import React, { useState, useEffect } from "react";
import { Play, Pause, RefreshCw, Info } from "lucide-react";

const ArpanetSimulation = () => {
  // Network nodes with historical accuracy
  const [nodes, setNodes] = useState([
    { id: 1, name: "UCLA", x: 120, y: 200, active: true, year: 1969 },
    { id: 2, name: "Stanford", x: 150, y: 150, active: true, year: 1969 },
    { id: 3, name: "UCSB", x: 180, y: 220, active: true, year: 1969 },
    { id: 4, name: "Utah", x: 220, y: 170, active: true, year: 1969 },
    { id: 5, name: "BBN", x: 390, y: 130, active: false, year: 1970 },
    { id: 6, name: "MIT", x: 410, y: 100, active: false, year: 1970 },
    { id: 7, name: "RAND", x: 90, y: 240, active: false, year: 1971 },
    { id: 8, name: "Harvard", x: 430, y: 120, active: false, year: 1971 },
  ]);

  // State variables
  const [currentYear, setCurrentYear] = useState(1969);
  const [isPlaying, setIsPlaying] = useState(false);
  const [packetRoute, setPacketRoute] = useState<any[]>([]);
  const [packetPosition, setPacketPosition] = useState<number | null>(null);
  const [selectedSource, setSelectedSource] = useState<number | null>(null);
  const [selectedDestination, setSelectedDestination] = useState<number | null>(
    null
  );
  const [showInfo, setShowInfo] = useState(false);
  const [packetSteps, setPacketSteps] = useState<any[]>([]);
  const [currentStep, setCurrentStep] = useState(0);

  // Cold War events for historical context
  const coldWarEvents = [
    { year: 1969, event: "First ARPANET message sent from UCLA to Stanford" },
    { year: 1969, event: "Apollo 11 moon landing amid Space Race with USSR" },
    { year: 1970, event: "First cross-country ARPANET connection" },
    { year: 1970, event: "U.S. invades Cambodia, expanding Vietnam War" },
    { year: 1971, event: "Email invented on ARPANET" },
    { year: 1971, event: "Pentagon Papers published, revealing war secrets" },
  ];

  // Generate connections between nodes based on historical topology
  const getConnections = () => {
    const activeNodes = nodes.filter((n) => n.active);
    let connections = [];

    // Historical ARPANET topology (initial four-node network)
    if (
      activeNodes.find((n) => n.id === 1) &&
      activeNodes.find((n) => n.id === 2)
    )
      connections.push([1, 2]);
    if (
      activeNodes.find((n) => n.id === 2) &&
      activeNodes.find((n) => n.id === 4)
    )
      connections.push([2, 4]);
    if (
      activeNodes.find((n) => n.id === 3) &&
      activeNodes.find((n) => n.id === 4)
    )
      connections.push([3, 4]);
    if (
      activeNodes.find((n) => n.id === 1) &&
      activeNodes.find((n) => n.id === 3)
    )
      connections.push([1, 3]);

    // East coast expansion
    if (
      activeNodes.find((n) => n.id === 4) &&
      activeNodes.find((n) => n.id === 5)
    )
      connections.push([4, 5]);
    if (
      activeNodes.find((n) => n.id === 5) &&
      activeNodes.find((n) => n.id === 6)
    )
      connections.push([5, 6]);
    if (
      activeNodes.find((n) => n.id === 6) &&
      activeNodes.find((n) => n.id === 8)
    )
      connections.push([6, 8]);

    // West coast expansion
    if (
      activeNodes.find((n) => n.id === 1) &&
      activeNodes.find((n) => n.id === 7)
    )
      connections.push([1, 7]);

    return connections;
  };

  // Track current connections
  const [connections, setConnections] = useState(getConnections());

  // Update connections when nodes change
  useEffect(() => {
    setConnections(getConnections());
  }, [nodes]);

  // Simulate network growth over time
  useEffect(() => {
    if (isPlaying) {
      const timer = setTimeout(() => {
        if (currentYear < 1971) {
          advanceYear();
        } else {
          setIsPlaying(false);
        }
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [isPlaying, currentYear]);

  // Process packet animation
  useEffect(() => {
    if (packetSteps.length > 0 && currentStep < packetSteps.length) {
      const timer = setTimeout(() => {
        setPacketPosition(packetSteps[currentStep]);
        setCurrentStep((prev) => prev + 1);
      }, 800);
      return () => clearTimeout(timer);
    }
  }, [packetSteps, currentStep]);

  // Advance the timeline
  const advanceYear = () => {
    setCurrentYear((prev) => prev + 1);

    // Activate nodes for the new year
    const newNodes = [...nodes];
    newNodes.forEach((node) => {
      if (node.year <= currentYear + 1 && !node.active) {
        node.active = true;
      }
    });

    setNodes(newNodes);
    resetPacket();
  };

  // Reset the simulation to initial state
  const resetSimulation = () => {
    setIsPlaying(false);
    setCurrentYear(1969);

    // Reset to initial 4 nodes
    const newNodes = [...nodes];
    newNodes.forEach((node) => {
      node.active = node.year <= 1969;
    });

    setNodes(newNodes);
    resetPacket();
  };

  // Reset packet-related state
  const resetPacket = () => {
    setPacketRoute([]);
    setPacketPosition(null);
    setSelectedSource(null);
    setSelectedDestination(null);
    setPacketSteps([]);
    setCurrentStep(0);
  };

  // Handle node click for selecting source/destination
  const handleNodeClick = (nodeId: number) => {
    // Can only click active nodes
    if (!nodes.find((n) => n.id === nodeId)?.active) return;

    // If no source selected, set as source
    if (!selectedSource) {
      setSelectedSource(nodeId);
    }
    // If source selected but no destination, set as destination
    else if (!selectedDestination) {
      if (nodeId === selectedSource) return; // Can't select same node
      setSelectedDestination(nodeId);

      // Calculate packet route once source and destination are set
      const route = findPath(selectedSource, nodeId);
      setPacketRoute(route || []);
      if (route) {
        setPacketSteps(route);
        setCurrentStep(0);
        setPacketPosition(route[0]);
      }
    }
    // If both are set, reset and start over
    else {
      resetPacket();
      setSelectedSource(nodeId);
    }
  };

  // Simple path finding between nodes (breadth-first search)
  const findPath = (startId: number, endId: number) => {
    const activeNodeIds = nodes.filter((n) => n.active).map((n) => n.id);
    const queue = [[startId]];
    const visited = new Set([startId]);

    while (queue.length > 0) {
      const path = queue.shift();
      const currentNode = path![path!.length - 1];

      if (currentNode === endId) {
        return path;
      }

      // Find all connected nodes
      const connectedNodes = connections
        .filter((conn) => conn.includes(currentNode))
        .map((conn) => (conn[0] === currentNode ? conn[1] : conn[0]))
        .filter(
          (nodeId) => activeNodeIds.includes(nodeId) && !visited.has(nodeId)
        );

      for (const nextNode of connectedNodes) {
        visited.add(nextNode);
        queue.push([...path!, nextNode]);
      }
    }

    return null; // No path found
  };

  // Helper to determine node color
  const getNodeColor = (nodeId: number) => {
    if (selectedSource === nodeId) return "#10B981"; // Source is green
    if (selectedDestination === nodeId) return "#3B82F6"; // Destination is blue
    if (packetRoute.includes(nodeId)) return "#8B5CF6"; // Route nodes are purple
    return "#6B7280"; // Default gray
  };

  // Helper to determine if a connection is highlighted (part of the route)
  const isConnectionHighlighted = (node1: number, node2: number) => {
    if (!packetRoute || packetRoute.length <= 1) return false;

    for (let i = 0; i < packetRoute.length - 1; i++) {
      if (
        (packetRoute[i] === node1 && packetRoute[i + 1] === node2) ||
        (packetRoute[i] === node2 && packetRoute[i + 1] === node1)
      ) {
        return true;
      }
    }
    return false;
  };

  return (
    <div className="flex flex-col p-4 max-w-5xl mx-auto bg-gradient-to-b from-blue-50 to-indigo-50">
      <h1 className="text-2xl font-bold text-center mb-1">
        Cold War & ARPANET: Packet Routing Simulation
      </h1>
      <p className="text-center text-gray-600 mb-4">
        Explore how the internet began as a Cold War defense project
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Left panel - Cold War Timeline */}
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="font-bold mb-4 flex items-center">
            Cold War Timeline
          </h2>

          <div className="flex justify-between mb-4">
            <div className="text-lg font-semibold">Year: {currentYear}</div>
            <div className="flex space-x-2">
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="bg-indigo-600 text-white p-2 rounded-full hover:bg-indigo-700"
                disabled={currentYear >= 1971}
              >
                {isPlaying ? (
                  <Pause className="w-4 h-4" />
                ) : (
                  <Play className="w-4 h-4" />
                )}
              </button>
              <button
                onClick={resetSimulation}
                className="bg-gray-600 text-white p-2 rounded-full hover:bg-gray-700"
              >
                <RefreshCw className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="relative">
            {/* Timeline bar */}
            <div className="absolute top-0 bottom-0 left-[20px] w-0.5 bg-gray-300"></div>

            {/* Events */}
            <div className="space-y-4 ml-7">
              {coldWarEvents
                .filter((event) => event.year <= currentYear)
                .map((event, idx) => (
                  <div
                    key={idx}
                    className="p-2 border rounded-lg bg-blue-50 text-blue-800 border-blue-200"
                  >
                    <div className="absolute w-3 h-3 bg-gray-500 rounded-full -ml-8 mt-2"></div>
                    <div className="font-semibold">{event.year}</div>
                    <div className="text-sm">{event.event}</div>
                  </div>
                ))}
            </div>
          </div>

          <button
            onClick={() => setShowInfo(!showInfo)}
            className="mt-4 text-indigo-600 flex items-center text-sm hover:underline"
          >
            <Info className="w-4 h-4 mr-1" />
            Learn about ARPANET's Cold War origins
          </button>
        </div>

        {/* Middle and Right - Network visualization and explanation */}
        <div className="bg-white p-4 rounded-lg shadow md:col-span-2">
          <h2 className="font-bold mb-3">ARPANET Network Map</h2>

          {/* Network visualization */}
          <div className="border bg-gray-50 rounded-lg overflow-hidden">
            <div className="relative" style={{ height: "400px" }}>
              <div className="absolute inset-0">
                <svg width="100%" height="100%" viewBox="0 0 500 300">
                  {/* Simplified US map */}
                  <path
                    d="M50,160 C100,140 150,130 200,130 C250,130 300,140 350,130 C400,120 450,100 470,90 L470,250 L50,250 Z"
                    fill="#EFF6FF"
                    stroke="#DBEAFE"
                    strokeWidth="2"
                  />

                  {/* West Coast */}
                  <path
                    d="M50,160 C60,150 70,140 80,130 L80,250 L50,250 Z"
                    fill="#DBEAFE"
                  />

                  {/* East Coast */}
                  <path
                    d="M420,100 C430,95 440,92 450,90 L470,90 L470,250 L420,250 Z"
                    fill="#DBEAFE"
                  />

                  {/* Connections between nodes */}
                  {connections.map(([nodeId1, nodeId2], index) => {
                    const node1 = nodes.find((n) => n.id === nodeId1);
                    const node2 = nodes.find((n) => n.id === nodeId2);

                    const highlighted = isConnectionHighlighted(
                      nodeId1,
                      nodeId2
                    );

                    return (
                      <line
                        key={`conn-${index}`}
                        x1={node1.x}
                        y1={node1.y}
                        x2={node2.x}
                        y2={node2.y}
                        stroke={highlighted ? "#8B5CF6" : "#9CA3AF"}
                        strokeWidth={highlighted ? 3 : 1}
                      />
                    );
                  })}

                  {/* Nodes */}
                  {nodes.map((node) => {
                    if (!node.active) return null;

                    const isHighlighted = node.id === packetPosition;

                    return (
                      <g key={`node-${node.id}`}>
                        <circle
                          cx={node.x}
                          cy={node.y}
                          r={isHighlighted ? 10 : 6}
                          fill={getNodeColor(node.id)}
                          stroke={isHighlighted ? "#F59E0B" : "white"}
                          strokeWidth={isHighlighted ? 3 : 1}
                          onClick={() => handleNodeClick(node.id)}
                          style={{ cursor: "pointer" }}
                        />

                        {/* Node label */}
                        <text
                          x={node.x}
                          y={node.y - 10}
                          fontSize="10"
                          textAnchor="middle"
                          fill="#4B5563"
                        >
                          {node.name}
                        </text>
                      </g>
                    );
                  })}
                </svg>
              </div>
            </div>
          </div>

          {/* Instruction and status */}
          <div className="mt-3 p-3 bg-gray-50 rounded-lg text-sm">
            <p className="mb-2">
              Click on nodes to select source and destination for packet
              routing.
            </p>
            <div className="flex justify-between text-xs text-gray-600">
              <span>
                Source:{" "}
                {selectedSource
                  ? nodes.find((n) => n.id === selectedSource)?.name
                  : "Not selected"}
              </span>
              <span>
                Destination:{" "}
                {selectedDestination
                  ? nodes.find((n) => n.id === selectedDestination)?.name
                  : "Not selected"}
              </span>
            </div>
            {packetRoute.length === 0 &&
              selectedSource &&
              selectedDestination && (
                <p className="text-red-500 text-xs mt-2">
                  No route available between these nodes.
                </p>
              )}
          </div>

          {/* Packet journey explanation */}
          {packetPosition && (
            <div className="mt-3 p-3 bg-indigo-50 rounded-lg">
              <h3 className="font-semibold text-sm text-indigo-800">
                Packet Journey
              </h3>
              <p className="text-xs text-indigo-700">
                {currentStep === 0
                  ? `Packet created at ${
                      nodes.find((n) => n.id === selectedSource)?.name
                    }`
                  : currentStep >= packetSteps.length
                  ? `Packet successfully delivered to ${
                      nodes.find((n) => n.id === selectedDestination)?.name
                    }!`
                  : `Packet routed through ${
                      nodes.find((n) => n.id === packetPosition)?.name
                    }`}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Informational section */}
      <div className="bg-white p-6 rounded-lg shadow mt-6">
        <h2 className="text-xl font-bold mb-4">
          Understanding ARPANET & The Birth of the Internet
        </h2>

        <div className="space-y-4 text-gray-700">
          <p>
            <span className="font-semibold text-indigo-700">
              ARPANET: The Internet's Ancestor
            </span>{" "}
            was a military and research network created in 1969 during the Cold
            War. Imagine if the Soviets bombed U.S. communication centers - the
            entire military command would collapse! ARPANET's genius was
            creating a network with no central point of failure. If Moscow took
            out Washington DC, messages could still travel between Los Angeles
            and New York using whatever connections remained.
          </p>

          <p>
            <span className="font-semibold text-indigo-700">
              Packet Switching: The Big Innovation
            </span>{" "}
            broke messages into small "packets" of data labeled with destination
            addresses. Unlike phone calls that need a continuous connection,
            packets travel independently through the network, finding any
            available path. If one route is destroyed, the packets automatically
            find another path - perfect for surviving a nuclear attack! This
            revolutionary approach is still how the internet works today.
          </p>

          <p>
            <span className="font-semibold text-indigo-700">
              From 4 Computers to Global Internet
            </span>{" "}
            - ARPANET started with just four connected computers at U.S.
            universities. Each location had a refrigerator-sized Interface
            Message Processor (IMP) - the world's first routers! The first
            ARPANET message in October 1969 was supposed to be "LOGIN" but the
            system crashed after "LO" - accidentally sending the first "LOL"
            message! By 1973, ARPANET had gone international, connecting to
            universities in Europe, beginning the global network we now call the
            internet.
          </p>
        </div>
      </div>

      {/* Information modal */}
      {showInfo && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-10">
          <div className="bg-white rounded-lg p-6 max-w-lg mx-4">
            <h3 className="text-xl font-bold mb-3">
              ARPANET's Cold War Origins
            </h3>
            <p className="text-gray-700 mb-6">
              ARPANET was developed by the Advanced Research Projects Agency
              (ARPA) of the US Department of Defense in 1969 during the height
              of Cold War tensions. Its primary goal was to create a
              communications network that could survive a nuclear attack.
              <br />
              <br />
              Traditional communications were centralized and vulnerable - if
              Moscow attacked Washington DC, the entire US command structure
              could be crippled. ARPANET pioneered a decentralized approach
              where messages could automatically find alternative paths if parts
              of the network were destroyed.
              <br />
              <br />
              This "survivable communications" concept was revolutionary and
              eventually evolved into today's internet protocols. While designed
              for military resilience, researchers quickly discovered its value
              for academic collaboration, showing how military technology can
              ultimately serve civilian purposes.
            </p>
            <div className="flex justify-end">
              <button
                onClick={() => setShowInfo(false)}
                className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ArpanetSimulation;
