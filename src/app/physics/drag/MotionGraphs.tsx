"use client";
import Emphasize from "@/components/Emphasize";
import GraphGuessingGame from "./GraphGuessingGame";

export function MotionGraphs() {
  // Define a single, consistent set of 4 graph shapes to be reused.
  const commonGraphChoices = [
    {
      path: "M 11 100 C 20 40, 70 20, 100 20",
      id: "exponential-approach",
    },
    {
      path: "M 10 99 C 50 100, 70 60, 100 20",
      id: "exponential-increase",
    },
    {
      path: "M 10 100 L 100 10",
      id: "linear-increase",
    },
    {
      path: "M 11 20 C 40 100, 80 99, 100 99",
      id: "exponential-decay",
    },
  ];

  return (
    <>
      <GraphGuessingGame
        title="1. Velocity vs. Time"
        explanation={
          <p>
            The object is dropped from rest, with gravity and drag acting on it.
            The y-axis represents velocity (positive is downward) and the x-axis
            represents time.
          </p>
        }
        graphChoices={commonGraphChoices.map((choice) => ({
          ...choice,
          isCorrect: choice.id === "exponential-approach",
          feedback:
            choice.id === "exponential-approach"
              ? "Excellent! The velocity graph is a curve that starts with a steep slope (high initial acceleration) and flattens out as it approaches terminal velocity. The object starts from rest (zero velocity) and is pulled down by gravity. As it speeds up, the upward drag force increases, counteracting gravity. This causes the acceleration to decrease, so the velocity increases at a slower and slower rate until it approaches a constant terminal velocity."
              : choice.id === "exponential-increase"
              ? "Not quite. This shows velocity increasing at an ever-faster rate, which isn't right. Drag should slow the acceleration down."
              : choice.id === "linear-increase"
              ? "Incorrect. This shows a constant acceleration (a straight line for velocity). This would only happen if there were no drag force at all."
              : "This shows the value decreasing over time, but we know the velocity increases from zero.",
        }))}
      />

      <GraphGuessingGame
        title="2. Position vs. Time"
        explanation={
          <p>
            The scenario is the same: The object is dropped from rest, with
            gravity and drag acting on it. Here, the y-axis represents position
            (positive is downward) and the x-axis represents time.
          </p>
        }
        graphChoices={commonGraphChoices.map((choice) => ({
          ...choice,
          isCorrect: choice.id === "exponential-increase",
          feedback:
            choice.id === "exponential-increase"
              ? "Perfect! The slope of the position graph starts at zero and increases, eventually approaching a straight line as the object reaches terminal velocity. Position is the integral of velocity. Since the velocity starts at zero and increases, the position graph (representing distance fallen) should start flat and get progressively steeper. However, as the velocity levels off at terminal velocity, the position graph will approach a straight line (constant slope)."
              : choice.id === "exponential-approach"
              ? "This graph shows the object's position increasing, but its slope is decreasing, meaning it's slowing down. The opposite is true."
              : choice.id === "linear-increase"
              ? "This shows a constant velocity from the beginning, which we know isn't true. The object has to speed up first."
              : "This shows the object moving backward or upward, which isn't correct.",
        }))}
      />

      <GraphGuessingGame
        title="3. Acceleration vs. Time"
        explanation={
          <p>
            The scenario is the same: The object is dropped from rest, with
            gravity and drag acting on it. Here, the y-axis represents
            acceleration (positive is downward) and the x-axis represents time.
          </p>
        }
        graphChoices={commonGraphChoices.map((choice) => ({
          ...choice,
          isCorrect: choice.id === "exponential-decay",
          feedback:
            choice.id === "exponential-decay"
              ? "Exactly! Acceleration starts at its maximum value (g) and decreases, approaching zero as the object reaches terminal velocity. The curve flattens out as it approaches zero. The net force is F_net = mg - F_d. At the start (v=0), the net force is just mg, so acceleration is at its maximum (a = g). As velocity increases, the drag force grows, reducing the net force and thus reducing the acceleration. The acceleration will approach zero as the object reaches terminal velocity."
              : "This graph shows the value increasing, but acceleration must decrease from its maximum as drag builds up.",
        }))}
      />
    </>
  );
}
