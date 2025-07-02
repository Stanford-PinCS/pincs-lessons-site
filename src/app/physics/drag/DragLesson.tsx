"use client";
import Block from "@/components/Block";
import ColorBox from "@/components/ColorBox";
import Emphasize from "@/components/Emphasize";
import KeyTerm from "@/components/KeyTerm";
import Lesson from "@/components/Lesson";
import QuizQuestion from "@/components/QuizQuestion";
import { useState, useEffect, useRef, useCallback, Suspense } from "react";

const FluidDragSimulator = () => {
  // --- Constants for Simulation ---
  const NUM_PARTICLES = 150;
  const CONTAINER_WIDTH = 600;
  const CONTAINER_HEIGHT = 400;
  const BALL_SIZE = 80;
  const PARTICLE_SIZE = 10;

  // Physics parameters
  const REPULSION_STRENGTH = 80;
  const DRAG_FORCE = 0.2; // How much the ball's movement drags particles
  const DAMPING = 0.96; // Friction/air resistance for particles

  // --- Type Definitions ---
  interface Vector2D {
    x: number;
    y: number;
  }

  interface Particle extends Vector2D {
    vx: number; // velocity x
    vy: number; // velocity y
  }

  // --- State Management ---
  const [ballPosition, setBallPosition] = useState<Vector2D>({
    x: CONTAINER_WIDTH / 2,
    y: CONTAINER_HEIGHT / 2,
  });

  const [particles, setParticles] = useState<Particle[]>(() =>
    Array.from({ length: NUM_PARTICLES }, () => ({
      x: Math.random() * CONTAINER_WIDTH,
      y: Math.random() * CONTAINER_HEIGHT,
      vx: 0,
      vy: 0,
    }))
  );

  const [isDragging, setIsDragging] = useState(false);

  // --- Refs ---
  const dragOffsetRef = useRef<Vector2D>({ x: 0, y: 0 });
  const prevBallPositionRef = useRef<Vector2D>(ballPosition);
  const animationFrameId = useRef<number | null>(null);

  // --- Physics and Animation Loop ---
  useEffect(() => {
    const animate = () => {
      const ballVelocity = {
        x: ballPosition.x - prevBallPositionRef.current.x,
        y: ballPosition.y - prevBallPositionRef.current.y,
      };

      setParticles((prevParticles) =>
        prevParticles.map((p) => {
          let forceX = 0;
          let forceY = 0;

          const dx = p.x - ballPosition.x;
          const dy = p.y - ballPosition.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          const interactionRadius = BALL_SIZE / 2 + PARTICLE_SIZE / 2 + 10;

          // 1. Repulsion from the ball
          if (distance < interactionRadius) {
            const force = REPULSION_STRENGTH / (distance * distance);
            forceX += (dx / distance) * force;
            forceY += (dy / distance) * force;
          }

          // --- THE FIX ---
          // 2. Drag from the ball's movement (only for nearby particles)
          // We'll use a slightly larger radius for the drag "wake" effect.
          const dragRadius = interactionRadius * 1.5;
          if (distance < dragRadius) {
            forceX += ballVelocity.x * DRAG_FORCE;
            forceY += ballVelocity.y * DRAG_FORCE;
          }

          let newVx = (p.vx + forceX) * DAMPING;
          let newVy = (p.vy + forceY) * DAMPING;

          let newX = p.x + newVx;
          let newY = p.y + newVy;

          // Boundary collision
          if (newX < 0 || newX > CONTAINER_WIDTH - PARTICLE_SIZE) {
            newVx *= -0.8;
            newX = Math.max(0, Math.min(newX, CONTAINER_WIDTH - PARTICLE_SIZE));
          }
          if (newY < 0 || newY > CONTAINER_HEIGHT - PARTICLE_SIZE) {
            newVy *= -0.8;
            newY = Math.max(
              0,
              Math.min(newY, CONTAINER_HEIGHT - PARTICLE_SIZE)
            );
          }

          return { x: newX, y: newY, vx: newVx, vy: newVy };
        })
      );

      prevBallPositionRef.current = ballPosition;
      animationFrameId.current = requestAnimationFrame(animate);
    };

    animationFrameId.current = requestAnimationFrame(animate);

    return () => {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, [ballPosition]);

  // --- Mouse Event Handlers ---
  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    setIsDragging(true);
    const rect = e.currentTarget.getBoundingClientRect();
    dragOffsetRef.current = {
      x: e.clientX - rect.left - BALL_SIZE / 2,
      y: e.clientY - rect.top - BALL_SIZE / 2,
    };
    e.preventDefault();
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging) return;

    const containerRect = e.currentTarget.getBoundingClientRect();
    const newX = e.clientX - containerRect.left - dragOffsetRef.current.x;
    const newY = e.clientY - containerRect.top - dragOffsetRef.current.y;

    setBallPosition({
      x: Math.max(0, Math.min(newX, CONTAINER_WIDTH)),
      y: Math.max(0, Math.min(newY, CONTAINER_HEIGHT)),
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  // --- Component Render ---
  return (
    <div
      style={{
        width: `${CONTAINER_WIDTH}px`,
        height: `${CONTAINER_HEIGHT}px`,
        border: "2px solid #444",
        borderRadius: "8px",
        position: "relative",
        overflow: "hidden",
        backgroundColor: "#1a1a1a",
        cursor: isDragging ? "grabbing" : "default",
        touchAction: "none",
      }}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseLeave}
    >
      {/* Render Particles */}
      {particles.map((p, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            width: `${PARTICLE_SIZE}px`,
            height: `${PARTICLE_SIZE}px`,
            backgroundColor: "#00bfff",
            borderRadius: "50%",
            left: `${p.x}px`,
            top: `${p.y}px`,
            opacity: 0.7,
            willChange: "transform",
          }}
        />
      ))}

      {/* Render Draggable Ball */}
      <div
        onMouseDown={handleMouseDown}
        style={{
          position: "absolute",
          width: `${BALL_SIZE}px`,
          height: `${BALL_SIZE}px`,
          backgroundColor: "#ff4500",
          borderRadius: "50%",
          left: `${ballPosition.x - BALL_SIZE / 2}px`,
          top: `${ballPosition.y - BALL_SIZE / 2}px`,
          cursor: "grab",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "white",
          fontWeight: "bold",
          userSelect: "none",
          boxShadow: isDragging
            ? "0 0 25px rgba(255, 69, 0, 0.8)"
            : "0 0 10px rgba(0,0,0,0.5)",
          transition: "box-shadow 0.2s ease-in-out",
          willChange: "transform, box-shadow",
        }}
      >
        Drag Me
      </div>
    </div>
  );
};

function AirflowAnimation() {
  // Define the smooth paths for the wind particles to follow.
  const windPaths = [
    // Paths flowing over the top
    {
      id: "p-top-1",
      d: "M -10,60 C 80,60 100,20 150,20 C 200,20 220,60 310,60",
    },
    {
      id: "p-top-2",
      d: "M -10,80 C 80,80 110,50 150,50 C 190,50 220,80 310,80",
    },
    // Paths flowing under the bottom
    {
      id: "p-bottom-1",
      d: "M -10,140 C 80,140 100,180 150,180 C 200,180 220,140 310,140",
    },
    {
      id: "p-bottom-2",
      d: "M -10,120 C 80,120 110,150 150,150 C 190,150 220,120 310,120",
    },
  ];

  // Increased particle count for a denser, more fluid visual.
  const particlesPerPath = 30;

  return (
    <div
      className="
        font-sans max-w-lg mx-auto my-8 p-6 bg-white 
        rounded-lg border border-slate-200 shadow-lg
      "
    >
      <h3 className="text-center text-xl font-medium text-slate-700 mb-4">
        Airflow Around a Sphere
      </h3>
      <svg
        className="w-full h-auto block"
        viewBox="0 0 300 200"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* SVG definitions are not styled by Tailwind, they use attributes */}
        <defs>
          {windPaths.map((path) => (
            <path
              key={path.id}
              id={path.id}
              d={path.d}
              fill="none"
              stroke="rgba(150, 150, 150, 0.3)" // Fainter stroke for denser particles
            />
          ))}
          <radialGradient id="grad-ball-light">
            <stop offset="0%" stopColor="#f0f0f0" />
            <stop offset="100%" stopColor="#a0a0a0" />
          </radialGradient>
        </defs>

        {/* The Ball/Sphere */}
        <circle
          cx="150"
          cy="100"
          r="40"
          fill="url(#grad-ball-light)"
          stroke="#b0b0b0"
          strokeWidth="1"
        />

        {/* Animated Wind Particles */}
        {windPaths.map(({ id }) =>
          Array.from({ length: particlesPerPath }).map((_, i) => (
            <circle key={`${id}-particle-${i}`} r="1.5" fill="#3b82f6">
              <animateMotion
                dur={`7s`}
                begin={`-${i * (7 / particlesPerPath)}s`}
                repeatCount="indefinite"
              >
                <mpath href={`#${id}`} />
              </animateMotion>
            </circle>
          ))
        )}
      </svg>
    </div>
  );
}

export default function DragLesson() {
  const slides = [
    <Block color="green" title="This is an example block">
      <p>
        <Emphasize>In this lesson, you'll...</Emphasize>
      </p>
      <ul className="list-disc list-inside">
        <li>Learn what drag is.</li>
        <li>Understand and apply the equations surrounding drag.</li>
        <li>Use numerical methods to predict motion.</li>
      </ul>
      <AirflowAnimation />
      <p>
        <Emphasize>
          Click the arrow at the top right to continue with the lesson.
        </Emphasize>
      </p>
    </Block>,
    <Block color="blue" title="What is drag?">
      <p>
        <KeyTerm>Drag</KeyTerm>, also known as fluid resistance,{" "}
        <Emphasize>
          is a resistive force caused by movement through fluids
        </Emphasize>
        .
      </p>
      <ColorBox color="blue">
        "Resistive" means opposing, so it{" "}
        <Emphasize>goes in the opposite direction of motion</Emphasize>.
      </ColorBox>
      <p>
        <KeyTerm>Air drag </KeyTerm>is the drag caused by an object interacting
        with air, so either an object moving through air, wind hitting an
        object, or both!
      </p>
      <p>
        Here, you can see how air moves around an object. Since air can't go
        through this object, it's path bends around the object.
      </p>
      <AirflowAnimation />
    </Block>,
    <Block color="yellow" title="Why is there a drag force?">
      <p>
        Use the interactive demo below to see what happens when you click and
        drag to move an object through a fluid.
      </p>
      <p>
        You can think of this like sticking your finger in a jar of honey or
        peanut butter and trying to move it.
      </p>
      <FluidDragSimulator />
    </Block>,
  ];
  return <Lesson slides={slides} />;
}
