"use client";
import Block from "@/components/Block";
import ColorBox from "@/components/ColorBox";
import Emphasize from "@/components/Emphasize";
import KeyTerm from "@/components/KeyTerm";
import Lesson from "@/components/Lesson";
import QuizQuestion from "@/components/QuizQuestion";
import { ForwardEulerDerivation } from "./ForwardEulerDerivation";
import { EulerAnimator } from "./EulerAnimator";
import { ReynoldsDiagram } from "./ReynoldsDiagram";
import { DragComponentSimulator } from "./DragComponentSimulator";
import { EulerMethodDiagram } from "./EulerMethodDiagram";
import { FreeBodyDiagram } from "./FreeBodyDiagram";
import FluidDragSimulator from "./FluidDragSimulator";
import { AirflowAnimation } from "./AirflowAnimation";
import { MotionGraphs } from "./MotionGraphs";

export default function DragLesson() {
  const slides = [
    // Slide 1: Learning targets.
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
    // Slide 2: Defining Drag
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
        <KeyTerm>Air drag </KeyTerm>(or aerodynamic drag) is the drag caused by
        an object interacting with air, so either an object moving through air,
        wind hitting an object, or both!
      </p>
      <p>
        Use the interactive demo below to see what happens when you click and
        drag to move an object through a fluid.
      </p>
      <FluidDragSimulator />
    </Block>,
    // Slide 4: Free Body Diagram.
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
        ) constantly pulls the ball downward. As the ball's{" "}
        <Emphasize>speed increases</Emphasize>, the ball is pushing more air out
        of the way, so the <Emphasize>drag force</Emphasize> (
        <KeyTerm>
          F<sub>D</sub>
        </KeyTerm>
        ) pushing upward <Emphasize>grows stronger</Emphasize>.
      </p>
      <FreeBodyDiagram />
      <p>
        Initially, when the ball is slow, gravity is much stronger than drag, so
        the ball accelerates downward, as the above diagram shows.
      </p>
    </Block>,
    // Slide 5: Terminal Velocity.
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
        This constant, stable velocity is called{" "}
        <KeyTerm>terminal velocity</KeyTerm>.
      </p>
      <FreeBodyDiagram isTerminalVelocity={true} />
      <p>
        Question to ponder:{" "}
        <Emphasize>
          What would happen if velocity were greater than terminal velocity?
        </Emphasize>{" "}
        Would it even be possible?
      </p>
      <p>Hint: Consider what forces are involved.</p>
    </Block>,
    // Slide 6: Check-in.
    <Block color="purple" title="Check-in">
      <QuizQuestion
        question="When you release a ball and it starts to fall (so it's velocity is 0, but its acceleration is downward), what are all the forces on that ball?"
        choices={[
          {
            text: "There is a downward drag force causing the ball to start moving down.",
            isCorrect: false,
            explanation: "Not quite, the downward forcce is gravity.",
          },
          {
            text: "There is a downward gravitational force and an upward drag force.",
            isCorrect: false,
            explanation:
              "Not quite, since it's not moving yet, there wouldn't be a drag force. Drag is resistive against motion, so there should not be any drag until an object starts moving.",
          },
          {
            text: "There is a downward gravitational force and no others.",
            isCorrect: true,
            explanation:
              "Exactly! Gravity acts on the object, but since velocity is zero, there is no drag.",
          },
          {
            text: "Velocity is 0, so there are no forces.",
            isCorrect: false,
            explanation:
              "Not quite! If acceleration were 0, that would mean that there is no net force, but the ball is accelerating downward so there is force.",
          },
        ]}
      />
      <QuizQuestion
        question="What is terminal velocity?"
        choices={[
          {
            text: "Terminal velocity is the velocity at the end of the problem, often when t = 1s.",
            isCorrect: false,
            explanation: "Not quite.",
          },
          {
            text: "Terminal velocity is the top speed.",
            isCorrect: false,
            explanation:
              "Not quite, we can have an object that never reaches terminal velocity (and would thus have a lower top speed) and we can have objects that exceed their terminal velocity.",
          },
          {
            text: "Terminal velocity is when the forces cancel out.",
            isCorrect: true,
            explanation:
              "Exactly! Terminal velocity is when the net acceleration is 0. If an object is below terminal velocity, gravity is stronger than drag, so it speeds up. And if an object is above terminal velocity, gravity is weaker than drag, so it slows down.",
          },
        ]}
      />
    </Block>,
    // Slide 7: Different drag forces.
    <Block color="yellow" title="Where Does Drag Come From? The Two Components">
      <p>
        Drag isn't a single phenomenon. It's the{" "}
        <Emphasize>sum of two distinct forces</Emphasize> that arise from a
        fluid interacting with an object's surface and shape.
      </p>

      {/* A two-column layout to compare the drag components */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6">
        {/* Friction (Shear) Drag */}
        <div className="p-4 border border-blue-300 bg-blue-50 rounded-lg">
          <h3 className="text-xl font-bold text-blue-800">
            1. Friction Drag (Shear Drag)
          </h3>
          <p className="mt-2 text-slate-700">
            This is essentially surface friction, caused by the fluid "sticking"
            to the object's surface due to its <KeyTerm>viscosity</KeyTerm>.
          </p>
          <p className="mt-2 text-sm text-slate-600">
            <Emphasize>Analogy:</Emphasize> Rubbing your hand across a rough
            tabletop. The force you feel is friction.
          </p>
        </div>

        {/* Form (Pressure) Drag */}
        <div className="p-4 border border-red-300 bg-red-50 rounded-lg">
          <h3 className="text-xl font-bold text-red-800">
            2. Form Drag (Pressure Drag)
          </h3>
          <p className="mt-2 text-slate-700">
            This is caused by the object's shape. As the object moves, it
            creates a high-pressure zone in front and a low-pressure turbulent{" "}
            <KeyTerm>wake</KeyTerm> behind.
          </p>
          <p className="mt-2 text-sm text-slate-600">
            <Emphasize>Analogy:</Emphasize> Sticking your hand out of a car
            window. The force pushing your hand back is mostly form drag.
          </p>
        </div>
      </div>

      <p>
        Use the interactive simulation below to see this in action.{" "}
        <Emphasize>Try changing the object's shape with the slider</Emphasize>{" "}
        and see how the two drag components change.
      </p>

      {/* The interactive element */}
      <DragComponentSimulator />

      <h3 className="text-2xl font-bold mt-8 mb-2">
        So, Which Component Dominates?
      </h3>
      <p>
        This is the critical question, and the answer is:{" "}
        <Emphasize>it depends!</Emphasize> The balance between friction and form
        drag is precisely what the <KeyTerm>Reynolds Number (Re)</KeyTerm>{" "}
        describes.
      </p>

      <ColorBox color="yellow">
        The Reynolds Number is a ratio of <KeyTerm>inertial forces</KeyTerm>{" "}
        (which cause form drag) to <KeyTerm>viscous forces</KeyTerm> (which
        cause friction drag).
        <ul className="list-disc list-inside space-y-2 mt-2">
          <li>
            <Emphasize>Low Re:</Emphasize> Viscous forces win.{" "}
            <Emphasize>Friction Drag</Emphasize> is the main component.
          </li>
          <li>
            <Emphasize>High Re:</Emphasize> Inertial forces win.{" "}
            <Emphasize>Form Drag</Emphasize> is the main component.
          </li>
        </ul>
      </ColorBox>

      <p className="mt-4">
        For most objects you see every day, like a falling tennis ball or a
        moving car, the Reynolds number is very high (often in the millions),
        and <Emphasize>form drag is by far the biggest contributor</Emphasize>{" "}
        to air resistance.
      </p>
    </Block>,

    // Slide 8: Reynolds number.
    <Block color="blue" title="What Drag Model Should We Use?">
      <p>
        Since drag is the resulting phenomenon of tons of different forces (many
        particle collisions), there are two models we commonly use. One model is
        proportional to velocity (<KeyTerm>F ∝ v</KeyTerm>) and one is
        proportional to velocity squared (<KeyTerm>F ∝ v²</KeyTerm>).
      </p>
      <p className="mt-4">
        Which one is correct? The answer depends on the nature of the fluid
        flow, which is described by
        <KeyTerm> Reynolds Number (Re)</KeyTerm>.
      </p>
      <ColorBox color="yellow">
        The Reynolds number relates an object's speed and size to the fluid's
        density and viscosity.
      </ColorBox>
      {/* Using the custom diagram component */}
      <ReynoldsDiagram />

      <p>This leads us to two main drag regimes we can model:</p>
      <ul className="list-disc list-inside mt-4 space-y-4">
        <li>
          <Emphasize>Linear Drag (F = -b v)</Emphasize>
          <br />
          This model applies at{" "}
          <strong className="text-blue-600">low Reynolds numbers</strong>. The
          drag force comes mainly from the fluid's viscosity. It's
          mathematically simpler to solve, but only applies to very slow or
          microscopic objects.
        </li>
        <li>
          <Emphasize>Quadratic Drag (F = -k v²)</Emphasize>
          <br />
          This model applies at{" "}
          <strong className="text-red-600">high Reynolds numbers</strong>. The
          drag force is dominated by the inertia of the fluid being pushed out
          of the way. This is the correct model for most everyday objects like
          cars, airplanes, and thrown balls.
        </li>
      </ul>
    </Block>,

    // Slide 10: Quadratic Drag Equation.
    <Block color="blue" title="High Velocity Drag">
      <p>
        You've now seen why the drag force exists. It's because the motion of
        the object displaces and drags along the fluid's particles.
      </p>
      <p>
        Since there are a few factors that affect drag, the big and scary{" "}
        <KeyTerm>drag equation</KeyTerm> looks like this:
      </p>
      {/* Equation Box: Monospaced font for a "codey" feel, slightly different background. */}
      <div className="p-4 my-5 text-2xl text-center rounded bg-slate-200 font-mono">
        F<sub>D</sub> = ½ ρ v<sup>2</sup> C<sub>D</sub> A
      </div>

      <p className="mb-5 text-slate-700">Here's what each part means:</p>

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

    // Slide 11: Equational Check-in.
    <Block color="purple" title="Check-in">
      <QuizQuestion
        question="What is Reynolds number (Re)?"
        choices={[
          {
            text: "Reynold's number is ~3.72641 and is a ratio of static metaphysical relevance and external bouyancy, coined by John Reynold.",
            isCorrect: false,
            explanation:
              "Not quite, Reynolds number is not a constant, but depends on the specific context.",
          },
          {
            text: "Reynolds Number depends on a few factors like viscosity and speed, representing how turbulent or laminar the liquid flow will be.",
            isCorrect: true,
            explanation:
              "Exactly! Reynolds number is a ratio of inertial and viscous forces, and it is used to predict liquid flow.",
          },
          {
            text: "Reynolds number is the coefficent of drag in the equation F_D = Re v",
            isCorrect: false,
            explanation:
              "Not quite, Reynolds number is not used as a direct coefficient, although it may appear in certain equations.",
          },
        ]}
      />
      <QuizQuestion
        question="True or false? Friction (or shear) drag is the drag caused by pushing air molecules."
        choices={[
          {
            text: "True.",
            isCorrect: false,
            explanation: "Not quite, that would be form (or pressure) drag.",
          },
          {
            text: "False.",
            isCorrect: true,
            explanation:
              "Exactly! That would be form (or pressure) drag. Friction (or shear) drag is caused by the particles sticking to and sliding along the surface.",
          },
        ]}
      />
    </Block>,

    // Slide 12: Explaining Modeling.
    <Block color="blue" title="What does this look like in practice?">
      <p>
        When modeling drag,{" "}
        <Emphasize>
          we often use a simple formula like a constant times velocity ( 𝑘 𝑣 )
          or velocity squared ( 𝑘 𝑣 <sup>2</sup> )
        </Emphasize>{" "}
        instead of writing out the full formula with fluid density, drag
        coefficient, and cross-sectional area.
      </p>
      <p>
        This is because <Emphasize>sometimes those extra details</Emphasize>{" "}
        usually stay the same for a given object moving through the same fluid,
        and they <Emphasize>can be combined into one constant</Emphasize>.
      </p>
      <p>
        Using a simpler formula makes the math easier and still gives us a good
        idea of how drag works, especially when we're mostly interested in how
        drag changes with speed.
      </p>
      <ColorBox color="yellow">
        Practically, for the sake of learning, we can often deal with the
        following simple linear equation!
        <div className="flex flex-row justify-center font-semibold my-2">
          <code>
            F<sub>D</sub> = k v
          </code>
        </div>
      </ColorBox>
    </Block>,

    <Block color="purple" title="Visualizing the Motion">
      <p className="mb-4">
        We've talked about the forces, but what does the actual motion of a
        falling object with drag look like over time? Let's visualize the graphs
        for velocity, position, and acceleration.
      </p>
      <ColorBox color="yellow">
        Read the descriptions below and click on the graph that you think would
        fit the scenario.
      </ColorBox>
      <MotionGraphs />
    </Block>,

    // Slide 13: Solving by Separation of Variables.
    <Block color="yellow" title="Solving an Easier Case">
      <p>
        While the quadratic drag equation is common, solving it analytically is
        hard. Let's look at a simpler model, linear drag, where{" "}
      </p>
      <ColorBox color="yellow">
        <code>
          F<sub>D</sub> = -b v
        </code>
      </ColorBox>
      <p>
        We can solve this using Newton's second law (<KeyTerm>F=ma</KeyTerm>)
        and a calculus technique called{" "}
        <KeyTerm>separation of variables</KeyTerm>.
      </p>
      <ol className="list-decimal list-inside my-4 space-y-2">
        <li>
          <Emphasize>Start with Newton's Law, F = ma.</Emphasize> Then
          substitute the forces we have (here, it's just drag, but we could have
          more forces).
          <ColorBox color="blue">
            <code>ma = -bv</code>
          </ColorBox>
        </li>
        <li>
          <Emphasize>
            Replace acceleration (a) with <code>dv/dt</code>.
          </Emphasize>{" "}
          We can do this since acceleration is the derivative of velocity. This
          leaves us with a differential equation in terms of just velocity and
          time:
          <ColorBox color="blue">
            <code>m(dv/dt) = -bv</code>
          </ColorBox>
        </li>
        <li>
          <Emphasize>Separate the variables.</Emphasize> Get all 'v' terms on
          one side and 't' terms on the other:
          <ColorBox color="blue">
            <code>(1/v)dv = -(b/m)dt</code>
          </ColorBox>
        </li>
        <li>
          <Emphasize>
            Your turn! Integrate both sides to find the velocity equation.
          </Emphasize>
        </li>
      </ol>
      <p>
        This shows how we can find an exact equation for motion in some simple
        cases.
      </p>
    </Block>,

    // Slide 14: Seeing if they can perform the math.
    <Block color="purple" title="Check in">
      <QuizQuestion
        question="Assume that at time 0, velocity is v_0. What is the formula for velocity from the equation F_D = -b v (from the previous slide), given that there are no other forces?"
        choices={[
          {
            text: "v = v_0 e^(-bt/m)",
            isCorrect: true,
            explanation: "Correct!",
          },
          {
            text: "v = v_0^2 + 4t",
            isCorrect: false,
            explanation:
              "Not quite, we wouldn't expect the object to get faster as the only force acting on it is a resistive force - drag.",
          },
          {
            text: "v = (v_0 t / b)^m",
            isCorrect: false,
            explanation:
              "Not quite. Try carefully integrating both sides and using some rules of logarithms to figure it out.",
          },
          {
            text: "v = (v_0 b / m)^t",
            isCorrect: false,
            explanation:
              "Not quite. Try carefully integrating both sides and using some rules of logarithms to figure it out.",
          },
        ]}
      />
    </Block>,

    // Slide 15: Intro of Numerical Methods.
    <Block color="yellow" title="Approximating the Harder Case">
      <p>
        What if we can't solve the equation exactly? We can{" "}
        <Emphasize>approximate</Emphasize> the answer by taking small steps
        forward in time.
      </p>
      <p>
        This is the core idea of <KeyTerm>numerical methods</KeyTerm>, which are
        mathematical techniques of approximating hard or unsolvable equation.
        The simplest numerical method is the{" "}
        <KeyTerm>Forward Euler method</KeyTerm>:
      </p>
      <EulerMethodDiagram />
      <ColorBox color="yellow">
        <Emphasize>
          Try entering a few different numbers of steps (small and large) below
        </Emphasize>{" "}
        to see how accurately we can predict the blue path.
      </ColorBox>
      <EulerAnimator />
    </Block>,

    // Slide 15.5: Derivation
    <ForwardEulerDerivation />,

    // Slide 16. Coding Forward Euler.
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

    // Slide 17: Higher Order Methods.
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

    // Slide 18: Coding a 2nd-Order Numerical Method.
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

    // Slide 19: Recap.
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
