"use client";
import Block from "@/components/Block";
import ColorBox from "@/components/ColorBox";
import Emphasize from "@/components/Emphasize";
import KeyTerm from "@/components/KeyTerm";
import Lesson from "@/components/Lesson";
import QuizQuestion from "@/components/QuizQuestion";
import {
  useState,
  useEffect,
  useRef,
  useCallback,
  Suspense,
  MouseEvent,
} from "react";

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

        // B) Ball interaction (repulsion and drag)
        for (let i = 0; i < nextParticles.length; i++) {
          const p = nextParticles[i];
          const dx = p.x - currentBallPos.x;
          const dy = p.y - currentBallPos.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          const interactionRadius = BALL_SIZE / 2 + PARTICLE_SIZE / 2 + 10;

          if (distance < interactionRadius) {
            const force = BALL_REPULSION / (distance * distance);
            forces[i].x += (dx / distance) * force;
            forces[i].y += (dy / distance) * force;
          }
          if (distance < interactionRadius * 1.5) {
            forces[i].x += ballVelocity.x * BALL_DRAG;
            forces[i].y += ballVelocity.y * BALL_DRAG;
          }
        }

        // --- Apply forces to update particle positions ---
        return nextParticles.map((p, i) => {
          let newVx = (p.vx + forces[i].x) * DAMPING;
          let newVy = (p.vy + forces[i].y) * DAMPING;
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
    <Block color="green" title="Modeling Drag">
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
        "Resistive" means opposing, so this force{" "}
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
    <Block color="blue" title="What is the equation for drag?">
      <p>
        We would love if drag were a simple polynomial equation. Then we could
        put it on our formula sheet and be done.
      </p>
      <p>
        However, it's not so simple. There's a fancy equation for a{" "}
        <KeyTerm>Reynolds number</KeyTerm>.
      </p>
      <p></p>
    </Block>,
    <Block color="blue" title="High Velocity Drag">
      <p>
        You've now seen why the drag force exists. It's because the motion of
        the object displaces the fluid's particles.
      </p>
      <p>
        Consequently, the big and scary <KeyTerm>drag equation</KeyTerm> looks
        like this:
      </p>
      {/* Equation Box: Monospaced font for a "codey" feel, slightly different background. */}
      <div className="p-4 my-5 text-2xl text-center rounded bg-slate-200 font-mono">
        F<sub>D</sub> = ½ ρ v<sup>2</sup> C<sub>D</sub> A
      </div>

      <p className="mb-5 text-slate-700">
        Here's what each part means and how it relates to our simulation:
      </p>

      {/* Definition List: A list without bullets, where each item has some space below it. */}
      <ul className="pl-0 list-none">
        <li className="mb-5">
          <code className="p-1 mr-2 text-lg font-bold rounded bg-slate-200 text-orange-600">
            F<sub>D</sub>
          </code>
          <Emphasize>Drag Force</Emphasize>
          <p className="mt-1 text-slate-600">
            This is the total force pushing against the object (and also against
            the fluid).
          </p>
        </li>
        <li className="mb-5">
          <code className="p-1 mr-2 text-lg font-bold rounded bg-slate-200 text-orange-600">
            ρ
          </code>
          <Emphasize>Fluid Density (rho)</Emphasize>
          <p className="mt-1 text-slate-600">
            How much "stuff" is in the fluid. More particles would create a
            denser, more resistant fluid.
          </p>
        </li>
        <li className="mb-5">
          <code className="p-1 mr-2 text-lg font-bold rounded bg-slate-200 text-orange-600">
            v
          </code>
          <Emphasize>Velocity</Emphasize>
          <p className="mt-1 text-slate-600">
            The speed and direction of the object relative to the fluid. Notice
            how moving the ball faster creates a much stronger reaction. This is
            because the force increases with the <Emphasize>square</Emphasize>{" "}
            of the velocity (v<sup>2</sup>), making speed a huge factor!
          </p>
        </li>
        <li className="mb-5">
          <code className="p-1 mr-2 text-lg font-bold rounded bg-slate-200 text-orange-600">
            C<sub>D</sub>
          </code>
          <Emphasize>Drag Coefficient</Emphasize>
          <p className="mt-1 text-slate-600">
            This accounts for the object's shape. A pointy, aerodynamic shape
            has a low C<sub>D</sub>.
          </p>
        </li>
        <li className="mb-5">
          <code className="p-1 mr-2 text-lg font-bold rounded bg-slate-200 text-orange-600">
            A
          </code>
          <Emphasize>Cross-Sectional Area</Emphasize>
          <p className="mt-1 text-slate-600">
            The area of the object facing the fluid. A larger ball displaces
            more particles and experiences more drag.
          </p>
        </li>
      </ul>
    </Block>,
    <Block color="yellow" title="What does this look like in practice?">
      <p>
        In practice, depending on the scenario, the fluid density, drag
        coefficient, and cross-sectional area factors may all become constant,
        in which case, our formula becomes much simpler:
      </p>
      <div className="p-4 my-5 text-2xl text-center rounded bg-slate-200 font-mono">
        F<sub>D</sub> = k v<sup>2</sup>
      </div>
    </Block>,
    <Block color="blue" title="Forces on a Falling Object">
      <p>
        Let's look at the forces acting on a tennis ball falling through the
        air.
      </p>
      <p>
        Gravity (
        <KeyTerm>
          F<sub>g</sub>
        </KeyTerm>
        ) constantly pulls the ball downward. As the ball's speed increases, the
        drag force (
        <KeyTerm>
          F<sub>D</sub>
        </KeyTerm>
        ) pushing upward grows stronger.
      </p>
      {/* <FreeBodyDiagram /> */}
      <p>
        Initially, when the ball is slow, gravity is much stronger than drag, so
        the ball accelerates downward.
      </p>
    </Block>,

    // 5. Defining Terminal Velocity
    <Block color="blue" title="Terminal Velocity">
      <p>
        What happens when the upward drag force becomes exactly as strong as the
        downward force of gravity?
      </p>
      <p>
        The forces become balanced, meaning the{" "}
        <Emphasize>net force is zero</Emphasize>. According to Newton's Second
        Law (F=ma), if the net force is zero, the acceleration must also be
        zero.
      </p>
      <p>
        This constant, maximum velocity is called{" "}
        <KeyTerm>terminal velocity</KeyTerm>.
      </p>
      {/* <FreeBodyDiagram isTerminalVelocity={true} /> */}
    </Block>,

    // 6. Reynolds Number and the Quadratic Drag Equation
    <Block color="blue" title="The Full Drag Equation">
      <p>
        The exact drag force depends on many factors, like fluid viscosity and
        flow speed, often summarized by a complex value called the{" "}
        <KeyTerm>Reynolds number</KeyTerm>.
      </p>
      <p>
        For most everyday objects moving at a reasonable speed (like a tennis
        ball), the drag force is dominated by the object's velocity. The big and
        scary <KeyTerm>drag equation</KeyTerm> looks like this:
      </p>
      {/* <EquationBlock> */}F<sub>D</sub> = ½ ρ v<sup>2</sup> C<sub>D</sub> A
      {/* </EquationBlock> */}
      <p className="mt-4">
        This is called <KeyTerm>quadratic drag</KeyTerm> because the force is
        proportional to the velocity squared (v<sup>2</sup>).
      </p>
    </Block>,

    // 7. Modeling
    <Block color="yellow" title="Making it Simpler">
      <p>
        In many situations, the fluid density (ρ), drag coefficient (C
        <sub>D</sub>), and area (A) are constant. We can combine them all into a
        single drag constant, <KeyTerm>k</KeyTerm>.
      </p>
      <p>
        This allows us to work with a much simpler, "good enough" model for
        high-velocity drag:
      </p>
      {/* <EquationBlock> */}
      <code>
        F<sub>D</sub> = k v<sup>2</sup>
      </code>
      {/* </EquationBlock> */}
    </Block>,

    // 8. Solving by Separation of Variables
    <Block color="green" title="Solving an Easier Case">
      <p>
        While the quadratic drag equation is common, solving it analytically is
        hard. Let's look at a simpler model for{" "}
        <Emphasize>very low speeds</Emphasize>, called linear drag, where{" "}
        {/* <EquationBlock> */}
        <code>
          F<sub>D</sub> = -b v
        </code>
        {/* </EquationBlock> */}
      </p>
      <p>
        We can solve this using Newton's second law (<KeyTerm>F=ma</KeyTerm>)
        and a calculus technique called{" "}
        <KeyTerm>separation of variables</KeyTerm>.
      </p>
      <ol className="list-decimal list-inside my-4 space-y-2">
        <li>
          Start with Newton's Law: <code>ma = -bv</code>
        </li>
        <li>
          Replace acceleration (a) with <code>dv/dt</code>:{" "}
          <code>m(dv/dt) = -bv</code>
        </li>
        <li>
          Separate variables: Get all 'v' terms on one side and 't' terms on the
          other: <code>(1/v)dv = -(b/m)dt</code>
        </li>
        <li>Integrate both sides to find the velocity equation.</li>
      </ol>
      <p>
        This shows how we can find an exact equation for motion in some simple
        cases.
      </p>
    </Block>,

    // 9. Intro of Numerical Methods
    <Block color="yellow" title="Approximating the Harder Case">
      <p>
        What if we can't solve the equation exactly, like with our{" "}
        {/* <EquationBlock> */}
        <code>
          F = -kv<sup>2</sup>
        </code>
        {/* </EquationBlock>{" "} */}
        model? We can <Emphasize>approximate</Emphasize> the answer by taking
        small steps forward in time.
      </p>
      <p>
        This is the core idea of <KeyTerm>numerical methods</KeyTerm>. The
        simplest is the <KeyTerm>Forward Euler method</KeyTerm>:
      </p>
      {/* <EulerMethodDiagram /> */}
      <ColorBox color="yellow">
        To find the next position and velocity, we use the{" "}
        <Emphasize>current</Emphasize> acceleration to step forward by a small
        amount of time, Δt.
      </ColorBox>
    </Block>,

    // 10. Coding Forward Euler
    <Block color="yellow" title="Challenge: Code the Forward Euler Method">
      <p>
        Now it's your turn. Use the logic from the previous slide to complete
        the code below.
      </p>
      <p>
        You'll need to calculate the current acceleration based on gravity and
        drag, then use it to update the ball's velocity and position over a
        small timestep <code>dt</code>.
      </p>
      {/* <CodingChallenge /> */}
    </Block>,

    // 11. See the Results in a Simulation
    <Block color="yellow" title="Simulation: Tennis Ball vs. Headwind">
      <p>
        Let's see your code in action! This simulation uses your Forward Euler
        implementation to model a tennis ball thrown into a headwind.
      </p>
      {/* <TennisBallSimulation /> */}
      <p>
        Notice how the drag from the wind quickly slows the ball's forward
        motion, causing it to follow a steep arc.
      </p>
    </Block>,

    // 12. Higher Order Methods
    <Block color="blue" title="Improving Accuracy">
      <p>
        The Forward Euler method is simple, but it can be inaccurate, especially
        with larger timesteps (Δt). It calculates the acceleration at the start
        of the step and assumes it's constant throughout.
      </p>
      <p>
        More advanced methods improve accuracy by sampling the acceleration at
        multiple points within the timestep.
      </p>
      <ul className="list-disc list-inside">
        <li>
          <KeyTerm>2nd-Order Methods</KeyTerm> (like the Midpoint Method) "look
          ahead" to the middle of the timestep to get a better average
          acceleration.
        </li>
        <li>
          <KeyTerm>Runge-Kutta 4th Order (RK4)</KeyTerm> is a popular and highly
          accurate method that uses a weighted average of four different
          estimates.
        </li>
      </ul>
    </Block>,

    // 13. Coding a 2nd-Order Numerical Method
    <Block color="yellow" title="Challenge: A More Accurate Method">
      <p>Let's try implementing a 2nd-order method. The idea is to:</p>
      <ol className="list-decimal list-inside my-4 space-y-2">
        <li>
          Use Forward Euler to "predict" the velocity at the midpoint of the
          timestep.
        </li>
        <li>Calculate acceleration at that midpoint.</li>
        <li>
          Use this improved acceleration to take the full step from the
          beginning.
        </li>
      </ol>
      <p>Try coding this "predict-correct" logic.</p>
      {/* <CodingChallenge /> */}
    </Block>,

    // 14. Seeing the accuracy
    <Block color="yellow" title="Comparing Methods">
      <p>
        Let's see how much of a difference the method makes. The chart below
        compares the path of an object calculated with Forward Euler vs. a
        2nd-order method, using the same medium-sized timestep.
      </p>
      {/* <MethodComparisonChart /> */}
      <p>
        As you can see, the 2nd-order method gives a much more accurate result.
        This is why higher-order methods are crucial for reliable physics
        simulations.
      </p>
    </Block>,

    // 15. Recap
    <Block color="green" title="Lesson Recap">
      <p>Here's what we learned about modeling drag:</p>
      <ul className="list-disc list-inside">
        <li>
          <KeyTerm>Drag</KeyTerm> is a resistive force that opposes motion
          through a fluid.
        </li>
        <li>
          For high speeds, drag is proportional to velocity squared (
          <KeyTerm>
            F<sub>D</sub> = kv<sup>2</sup>
          </KeyTerm>
          ).
        </li>
        <li>
          <KeyTerm>Terminal velocity</KeyTerm> is reached when the drag force
          equals the force of gravity.
        </li>
        <li>
          Simple models can be solved exactly using techniques like{" "}
          <KeyTerm>separation of variables</KeyTerm>.
        </li>
        <li>
          Complex models require approximation with{" "}
          <KeyTerm>numerical methods</KeyTerm> like Forward Euler and RK4.
        </li>
        <li>
          Higher-order numerical methods provide better accuracy for a given
          timestep.
        </li>
      </ul>
    </Block>,
  ];
  return <Lesson slides={slides} />;
}
