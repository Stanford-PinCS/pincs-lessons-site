"use client";

import EcosystemExplorer from "./EcosystemExplorer";
import Lesson from "@/components/Lesson";
import FoodWebBuilder from "./FoodWebBuilder";
import QuizQuestion from "@/components/QuizQuestion";
import List from "@/components/List";

export default function EcosystemsLesson() {
  const slides = [
    // Slide 1: Ecosystems and Food Webs
    <div className="space-y-6 bg-white/80 backdrop-blur-sm p-6 rounded-lg shadow-lg">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-bold">Ecosystems and Food Webs</h2>
      </div>
      <div className="space-y-4">
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
    </div>,

    // Slide 2: First Check for Understanding
    <div className="space-y-6 bg-white/80 backdrop-blur-sm p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6">Check Your Understanding</h2>
      <QuizQuestion
        question="What is the main purpose of a food web in understanding ecosystems?"
        choices={[
          {
            text: "To show which animals are the strongest in the ecosystem",
            isCorrect: false,
            explanation:
              "Not quite! While some animals might be stronger than others, that's not the main purpose of a food web.",
          },
          {
            text: "To map out how different species are connected through feeding relationships",
            isCorrect: true,
            explanation:
              "Correct! Food webs help us understand how different species are connected through what they eat and what eats them.",
          },
          {
            text: "To count the total number of animals in an ecosystem",
            isCorrect: false,
            explanation:
              "Not exactly! Food webs focus on relationships between species, not just counting them.",
          },
          {
            text: "To show which animals are the most dangerous",
            isCorrect: false,
            explanation:
              "Not quite! Food webs aren't about danger levels, but about how species are connected through feeding relationships.",
          },
        ]}
      />
    </div>,

    // Slide 3: Interactive Food Web Builder
    <div className="space-y-6 bg-white/80 backdrop-blur-sm p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6">Build Your Own Food Web</h2>
      <p className="mb-4">
        Now it's your turn to create a food web! Add different species and
        connect them to show who eats what. Remember:
      </p>
      <List
        items={[
          <>Producers (plants) are at the bottom of the food web</>,
          <>Herbivores eat plants</>,
          <>Carnivores eat other animals</>,
        ]}
      />
      <FoodWebBuilder />
    </div>,

    // Slide 4: Graph Algorithms
    <div className="space-y-6 bg-white/80 backdrop-blur-sm p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6">
        Exploring Ecosystems with Graph Algorithms
      </h2>
      <p className="mb-4">
        Graph algorithms like Breadth-First Search (BFS) and Depth-First Search
        (DFS) help scientists understand how species are connected in an
        ecosystem. These algorithms can show us:
      </p>
      <List
        items={[
          <>How energy flows through the food web</>,
          <>Which species are most connected to others</>,
          <>How changes in one species might affect the entire ecosystem</>,
          <>The shortest paths between different species</>,
        ]}
      />
      <p className="mb-4">
        Try building your own ecosystem below! Click to add species, connect
        them to show feeding relationships, and watch how BFS and DFS explore
        the connections differently.
      </p>
    </div>,

    // Slide 5: Second Check for Understanding
    <div className="space-y-6 bg-white/80 backdrop-blur-sm p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6">Check Your Understanding</h2>
      <QuizQuestion
        question="How do graph algorithms help scientists understand ecosystems?"
        choices={[
          {
            text: "They help count the total number of species in an ecosystem",
            isCorrect: false,
            explanation:
              "Not quite! While counting species is important, graph algorithms are more focused on understanding relationships between species.",
          },
          {
            text: "They help identify the strongest and weakest species",
            isCorrect: false,
            explanation:
              "Not exactly! Graph algorithms focus on connections and relationships, not the strength of individual species.",
          },
          {
            text: "They help map and analyze the complex feeding relationships between species",
            isCorrect: true,
            explanation:
              "Correct! Graph algorithms like BFS and DFS help scientists understand how species are connected through feeding relationships and how changes might affect the entire ecosystem.",
          },
          {
            text: "They help determine which species are the most dangerous",
            isCorrect: false,
            explanation:
              "Not quite! Graph algorithms are used to understand relationships and connections, not to assess danger levels.",
          },
        ]}
      />
    </div>,

    // Slide 6: Ecosystem Explorer
    <div className="space-y-6 bg-white/80 backdrop-blur-sm p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold">Interactive Ecosystem Explorer</h2>
      <p className="mb-4">
        Use the interactive explorer below to build and experiment with your own
        ecosystem. Add different species, create connections between them, and
        observe how they interact.
      </p>
      <div className="mt-4">
        <EcosystemExplorer />
      </div>
    </div>,

    // Slide 7: Key Concepts
    <div className="space-y-6 bg-white/80 backdrop-blur-sm p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold">Key Concepts</h2>
      <List
        items={[
          <>Producers (like plants) convert sunlight into energy</>,
          <>Herbivores eat producers</>,
          <>Carnivores eat other animals</>,
          <>Changes in one species can affect the entire ecosystem</>,
          <>Graph algorithms help scientists understand these relationships</>,
          <>BFS explores connections level by level</>,
          <>DFS explores one path completely before moving to another</>,
        ]}
      />
    </div>,
  ];

  return <Lesson slides={slides} />;
}
