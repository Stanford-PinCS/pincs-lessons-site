"use client";

import React, { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

interface ButtonProps {
  onClick: () => void;
  children: React.ReactNode;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({ onClick, children, className }) => {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded-md text-white bg-blue-500 hover:bg-blue-600 ${className}`}
    >
      {children}
    </button>
  );
};

type InterceptChoice = number | null;
type EndBehaviorChoice = "low" | "high" | "infinite" | null;
type MiddleBehaviorChoice = "decrease" | "increase" | "linear" | null;

const GraphBuilder: React.FC = () => {
  const [step, setStep] = useState<number>(0);
  const [intercept, setIntercept] = useState<InterceptChoice>(null);
  const [endBehavior, setEndBehavior] = useState<EndBehaviorChoice>(null);
  const [middleBehavior, setMiddleBehavior] =
    useState<MiddleBehaviorChoice>(null);

  const handleInterceptChoice = (choice: number) => {
    setIntercept(choice);
    if (choice === 0) {
      setStep(1);
    }
  };

  const handleEndBehaviorChoice = (choice: "low" | "high" | "infinite") => {
    setEndBehavior(choice);
    if (choice === "high") {
      setStep(2);
    }
  };

  const handleMiddleBehaviorChoice = (
    choice: "decrease" | "increase" | "linear"
  ) => {
    setMiddleBehavior(choice);
    if (choice === "increase") {
      setStep(3);
    }
  };

  const reset = () => {
    setStep(0);
    setIntercept(null);
    setEndBehavior(null);
    setMiddleBehavior(null);
  };

  const data = [
    { time: 0, velocity: 0 },
    { time: 1, velocity: 5 },
    { time: 2, velocity: 8 },
    { time: 3, velocity: 9.5 },
    { time: 4, velocity: 10 },
    { time: 5, velocity: 10 },
  ];

  const renderStep = () => {
    switch (step) {
      case 0:
        return (
          <div>
            <h3 className="text-lg font-semibold mb-2">
              Step 1: Choose the initial velocity (the y-intercept)
            </h3>
            <p>
              What is the velocity of the object at time t=0, just as it's
              dropped?
            </p>
            <div className="flex space-x-2 mt-2">
              <Button onClick={() => handleInterceptChoice(10)}>10 m/s</Button>
              <Button onClick={() => handleInterceptChoice(0)}>0 m/s</Button>
              <Button onClick={() => handleInterceptChoice(-10)}>
                -10 m/s
              </Button>
            </div>
            {intercept !== null && intercept !== 0 && (
              <p className="text-red-500 mt-2">
                Incorrect. The object is dropped, so its initial velocity is 0.
              </p>
            )}
          </div>
        );
      case 1:
        return (
          <div>
            <h3 className="text-lg font-semibold mb-2">
              Step 2: Choose the end behavior
            </h3>
            <p>
              What happens to the velocity after a long time? (Terminal
              Velocity)
            </p>
            <div className="flex space-x-2 mt-2">
              <Button onClick={() => handleEndBehaviorChoice("low")}>
                Goes to zero
              </Button>
              <Button onClick={() => handleEndBehaviorChoice("infinite")}>
                Keeps increasing forever
              </Button>
              <Button onClick={() => handleEndBehaviorChoice("high")}>
                Reaches a high, constant velocity
              </Button>
            </div>
            {endBehavior !== null && endBehavior !== "high" && (
              <p className="text-red-500 mt-2">
                Incorrect. The object reaches a terminal velocity and holds a
                constant speed.
              </p>
            )}
          </div>
        );
      case 2:
        return (
          <div>
            <h3 className="text-lg font-semibold mb-2">
              Step 3: Choose the behavior in the middle
            </h3>
            <p>How does the velocity change between the start and the end?</p>
            <div className="flex space-x-2 mt-2">
              <Button onClick={() => handleMiddleBehaviorChoice("increase")}>
                It increases, but the rate of increase slows down
              </Button>
              <Button onClick={() => handleMiddleBehaviorChoice("decrease")}>
                It decreases
              </Button>
              <Button onClick={() => handleMiddleBehaviorChoice("linear")}>
                It increases at a constant rate
              </Button>
            </div>
            {middleBehavior !== null && middleBehavior !== "increase" && (
              <p className="text-red-500 mt-2">
                Incorrect. The velocity increases, but air resistance causes the
                acceleration to decrease.
              </p>
            )}
          </div>
        );
      case 3:
        return (
          <div>
            <h3 className="text-lg font-semibold mb-2">Congratulations!</h3>
            <p>
              You've correctly built the velocity-time graph for an object with
              air resistance.
            </p>
            <Button onClick={reset} className="mt-2">
              Start Over
            </Button>
          </div>
        );
      default:
        return null;
    }
  };

  const getChartData = () => {
    if (step === 0) return [{ time: 0, velocity: intercept }];
    if (step === 1) return [{ time: 0, velocity: 0 }];
    if (step === 2)
      return [
        { time: 0, velocity: 0 },
        { time: 5, velocity: 10 },
      ];
    if (step === 3) return data;
    return [];
  };

  return (
    <div className="p-4 border rounded-lg">
      <h2 className="text-xl font-bold mb-4">Build the Velocity-Time Graph</h2>
      <div className="grid grid-cols-2 gap-4">
        <div>{renderStep()}</div>
        <div>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart
              data={getChartData()}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="time"
                label={{
                  value: "Time",
                  position: "insideBottomRight",
                  offset: 0,
                }}
              />
              <YAxis
                label={{
                  value: "Velocity",
                  angle: -90,
                  position: "insideLeft",
                }}
              />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="velocity"
                stroke="#8884d8"
                activeDot={{ r: 8 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default GraphBuilder;
