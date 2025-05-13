import EcosystemExplorer from "./EcosystemExplorer";

export default function EcosystemsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Ecosystems and Food Webs</h1>

      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Understanding Food Webs</h2>
        <p className="mb-4">
          Food webs are complex networks that show how different species in an
          ecosystem are connected through feeding relationships. They help us
          understand how energy flows through an ecosystem and how changes in
          one species can affect others.
        </p>
        <p className="mb-4">
          In this interactive simulation, you can explore how different species
          interact in a food web. Watch how changes in one population affect
          others, and learn how computer science concepts like graph algorithms
          help scientists study these complex relationships.
        </p>
      </div>

      <div className="mt-12 mb-8">
        <h2 className="text-2xl font-bold mb-6">
          Exploring Ecosystems with Graph Algorithms
        </h2>
        <p className="mb-4">
          Graph algorithms like Breadth-First Search (BFS) and Depth-First
          Search (DFS) help scientists understand how species are connected in
          an ecosystem. These algorithms can show us:
        </p>
        <ul className="list-disc list-inside space-y-2 mb-6">
          <li>How energy flows through the food web</li>
          <li>Which species are most connected to others</li>
          <li>How changes in one species might affect the entire ecosystem</li>
          <li>The shortest paths between different species</li>
        </ul>
        <p className="mb-4">
          Try building your own ecosystem below! Click to add species, connect
          them to show feeding relationships, and watch how BFS and DFS explore
          the connections differently.
        </p>
      </div>

      <EcosystemExplorer />

      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">Key Concepts</h2>
        <ul className="list-disc list-inside space-y-2">
          <li>Producers (like plants) convert sunlight into energy</li>
          <li>Herbivores eat producers</li>
          <li>Carnivores eat other animals</li>
          <li>Changes in one species can affect the entire ecosystem</li>
          <li>
            Graph algorithms help scientists understand these relationships
          </li>
          <li>BFS explores connections level by level</li>
          <li>DFS explores one path completely before moving to another</li>
        </ul>
      </div>
    </div>
  );
}
