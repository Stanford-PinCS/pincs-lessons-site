"use client";
import { useState, useEffect, useRef, MouseEvent } from "react";

const FluidDragSimulator = () => {
  const NUM_PARTICLES = 250;
  const CONTAINER_WIDTH = 600;
  const CONTAINER_HEIGHT = 400;
  const BALL_SIZE = 80;
  const PARTICLE_SIZE = 10;

  const BALL_REPULSION = 100;
  const BALL_DRAG = 0.25;
  const DAMPING = 0.95;
  const PARTICLE_REPULSION = 0.5;
  const PARTICLE_INTERACTION_RADIUS = 30;
  interface Vector2D {
    x: number;
    y: number;
  }

  interface Particle extends Vector2D {
    vx: number;
    vy: number;
  }

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

  const dragOffsetRef = useRef<Vector2D>({ x: 0, y: 0 });
  const prevBallPositionRef = useRef<Vector2D>(ballPosition);
  const ballPositionRef = useRef<Vector2D>(ballPosition);
  const animationFrameId = useRef<number | null>(null);

  useEffect(() => {
    ballPositionRef.current = ballPosition;
  }, [ballPosition]);

  useEffect(() => {
    const animate = () => {
      const currentBallPos = ballPositionRef.current;
      const ballVelocity = {
        x: currentBallPos.x - prevBallPositionRef.current.x,
        y: currentBallPos.y - prevBallPositionRef.current.y,
      };

      setParticles((prevParticles: Particle[]) => {
        const nextParticles = [...prevParticles];
        const forces = nextParticles.map(() => ({ x: 0, y: 0 }));

        for (let i = 0; i < nextParticles.length; i++) {
          for (let j = i + 1; j < nextParticles.length; j++) {
            const p1 = nextParticles[i];
            const p2 = nextParticles[j];
            const dx = p1.x - p2.x;
            const dy = p1.y - p2.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < PARTICLE_INTERACTION_RADIUS && distance > 0) {
              const force = PARTICLE_REPULSION / (distance * distance);
              const forceX = (dx / distance) * force;
              const forceY = (dy / distance) * force;
              // Apply force to both particles in opposite directions
              forces[i].x += forceX;
              forces[i].y += forceY;
              forces[j].x -= forceX;
              forces[j].y -= forceY;
            }
          }
        }

        // B) Ball interaction (drag)
        for (let i = 0; i < nextParticles.length; i++) {
          const p = nextParticles[i];
          const dx = p.x - currentBallPos.x;
          const dy = p.y - currentBallPos.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          const dragRadius = (BALL_SIZE / 2) * 2.5;

          if (distance < dragRadius) {
            forces[i].x += ballVelocity.x * BALL_DRAG;
            forces[i].y += ballVelocity.y * BALL_DRAG;
          }
        }

        // --- Apply forces and handle collisions ---
        return nextParticles.map((p, i) => {
          // Update velocity with forces
          let newVx = (p.vx + forces[i].x) * DAMPING;
          let newVy = (p.vy + forces[i].y) * DAMPING;

          // --- Speed Limit ---
          const MAX_SPEED = 15;
          const speed = Math.sqrt(newVx * newVx + newVy * newVy);
          if (speed > MAX_SPEED) {
            newVx = (newVx / speed) * MAX_SPEED;
            newVy = (newVy / speed) * MAX_SPEED;
          }

          // Update position
          let newX = p.x + newVx;
          let newY = p.y + newVy;

          // --- Ball Collision and Response ---
          const dxBall = newX - currentBallPos.x;
          const dyBall = newY - currentBallPos.y;
          const distanceToBall = Math.sqrt(dxBall * dxBall + dyBall * dyBall);
          const minDistance = BALL_SIZE / 2 + PARTICLE_SIZE / 2;

          if (distanceToBall < minDistance && distanceToBall > 0) {
            // 1. Correct Position to prevent overlap
            const overlap = minDistance - distanceToBall;
            const normalX = dxBall / distanceToBall;
            const normalY = dyBall / distanceToBall;
            newX += normalX * overlap;
            newY += normalY * overlap;

            // 2. Respond to collision by adjusting velocity (bounce)
            // Relative velocity
            const rvx = newVx - ballVelocity.x;
            const rvy = newVy - ballVelocity.y;

            // Velocity component along the normal
            const velAlongNormal = rvx * normalX + rvy * normalY;

            // Do not resolve if velocities are separating
            if (velAlongNormal < 0) {
              const restitution = 0.5; // Bounciness
              const j = -(1 + restitution) * velAlongNormal;
              newVx += j * normalX;
              newVy += j * normalY;
            }
          }

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
        });
      });

      prevBallPositionRef.current = currentBallPos;
      animationFrameId.current = requestAnimationFrame(animate);
    };

    animationFrameId.current = requestAnimationFrame(animate);

    return () => {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, []); // Run this effect only once on mount

  // --- Mouse Event Handlers (no changes) ---
  const handleMouseDown = (e: MouseEvent<HTMLDivElement>) => {
    setIsDragging(true);
    const rect = e.currentTarget.getBoundingClientRect();
    dragOffsetRef.current = {
      x: e.clientX - rect.left - BALL_SIZE / 2,
      y: e.clientY - rect.top - BALL_SIZE / 2,
    };
    e.preventDefault();
  };

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    const containerRect = e.currentTarget.getBoundingClientRect();
    const newX = e.clientX - containerRect.left - dragOffsetRef.current.x;
    const newY = e.clientY - containerRect.top - dragOffsetRef.current.y;
    setBallPosition({
      x: Math.max(0, Math.min(newX, CONTAINER_WIDTH)),
      y: Math.max(0, Math.min(newY, CONTAINER_HEIGHT)),
    });
  };

  const handleMouseUp = () => setIsDragging(false);
  const handleMouseLeave = () => setIsDragging(false);

  // --- Component Render (no changes) ---
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
      {particles.map((p: Particle, i: number) => (
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

export default FluidDragSimulator;
