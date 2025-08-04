"use client";
import Block from "@/components/Block";
import Emphasize from "@/components/Emphasize";
import KeyTerm from "@/components/KeyTerm";
import Lesson from "@/components/Lesson";
import { Metadata } from "next";
import ClimbingAnimation from "./ClimbingAnimation";
import ColorBox from "@/components/ColorBox";
import ReactKatex from "@pkasila/react-katex";
import "katex/dist/katex.min.css";
import QuizQuestion from "@/components/QuizQuestion";
import FootballComponentsDiagram from "./FootballComponentsDiagram";
import GravityComponentsDiagram from "./GravityComponentsDiagram";
import ForceComponentDerivation from "./ForceComponentDerivation";
import SpringBoxFrictionDiagram from "./SpringBoxFrictionDiagram";
import FreeBodyDiagramBuilder from "./FreeBodyDiagramBuilder";
import PersonFreeBodyDiagram from "./PersonFreeBodyDiagram";
import FreeBodyDiagramStepper from "./FreeBodyDiagramStepper";
import ForcesBulletsWalkThrough from "./ForcesBulletsWalkThrough";
import pulleyProblem from "./Pulley Problem.png";
import MultiSelectQuizQuestion from "@/components/MultiSelectQuizQuestion";
import List from "@/components/List";

export const metadata: Metadata = {
  title: "Forces",
  description:
    "This lesson teaches how to forces work, how to add forces, and how to build a free body diagram.",
};

export default function ForcesLesson() {
  const slides = [
    // Slide 1: Learning targets.
    <Block color="green" title="Learning Targets">
      <p>
        <Emphasize>In this lesson, you'll...</Emphasize>
      </p>
      <List
        items={[
          <>Learn what forces are.</>,
          <>Understand and practice using free body diagrams.</>,
          <>Learn how to use force components.</>,
        ]}
      />
      <p>
        <Emphasize>
          Click the arrow at the top right to continue with the lesson.
        </Emphasize>
      </p>
    </Block>,

    // Slide 2: Defining Force.
    <Block color="blue" title="What is a force?">
      <p>
        <Emphasize>
          A <KeyTerm>force</KeyTerm> is an influence that causes an object to
          accelerate
        </Emphasize>
        . Essentially, a force is a <Emphasize>push or pull</Emphasize>.
      </p>
      <p>
        When you play Tug of War, pulling the rope means applying a force.
        Similarly, when you hold a pencil or walk around, you are also applying
        forces.
      </p>
      <p>
        Every force has a{" "}
        <Emphasize>magnitude (how strong the force is)</Emphasize> and a{" "}
        <Emphasize>direction (where the force goes)</Emphasize>.
      </p>
      <p>
        The magnitude of forces are often{" "}
        <Emphasize>
          measured in <KeyTerm>Newtons (N)</KeyTerm>
        </Emphasize>
        , but they can also be measured in pounds (lbs).
      </p>
      <p>
        For example, if you are climbing up a ladder, you are pulling your
        entire body weight (the magnitude) upward (the direction).
      </p>
      <ClimbingAnimation />
    </Block>,

    // Slide 3: Explaining basics around forces.
    <Block color="blue" title="Newton's Laws">
      <p>
        <Emphasize>Newton's First Law</Emphasize> (also known as The Law of
        Inertia) states that an object will remain at rest or in uniform motion
        unless acted upon by a net external force.
      </p>
      <ColorBox color="blue">
        Objects won't change their velocity unless acted on by a force.
      </ColorBox>
      <p>
        <Emphasize>Newton's Second Law</Emphasize> tells us how to calculate the
        effect of a force: <KeyTerm>F = ma</KeyTerm>, where <KeyTerm>F</KeyTerm>{" "}
        is force, <KeyTerm>m</KeyTerm> is mass, and <KeyTerm>a</KeyTerm> is
        acceleration.
      </p>
      <ColorBox color="blue">
        Even though the second law gives us the formula as F = ma, since we're
        often given the force and want to find the acceleration, it can be
        helpful to rewrite it as:{" "}
        <ReactKatex>{`$a = \\frac{F}{m}$`}</ReactKatex>. This also helps us
        understand that a large mass can resist a large force.
      </ColorBox>
      <p>
        <Emphasize>Newton's Third Law</Emphasize> says that for every action,
        there is an equal and opposite reaction.
      </p>
      <ColorBox color="blue">
        Imagine if you punched a wall. You're the one making the force against
        the wall, but your hand would still hurt. That's because however much
        force you put into the wall, the wall applies right back at you!
      </ColorBox>
    </Block>,

    // Slide 4: Checking force understanding.
    <Block color="purple" title="Force check in">
      <QuizQuestion
        question="What are the two parts of every force?"
        choices={[
          {
            text: "The push and the pull.",
            isCorrect: false,
            explanation:
              "While every force is a push or a pull, forces are usually just one.",
          },
          {
            text: "The mass and the acceleration.",
            isCorrect: false,
            explanation:
              "Not quite. Forces are influences that cause acceleration and are slowed down by mass, but they are not made of mass and acceleration.",
          },
          {
            text: "The magnitude and the direction.",
            isCorrect: true,
            explanation:
              "Exactly! Every force has a strength (magnitude) measured in Newtons and a direction in which the force acts.",
          },
          {
            text: "The pulse and the width.",
            isCorrect: false,
            explanation:
              "Nope. Try reviewing the previous slides and coming back to try again.",
          },
        ]}
      />
      <QuizQuestion
        question="Which of these terms is not like the others?"
        choices={[
          {
            text: "Newtons",
            isCorrect: false,
            explanation: "Not quite.",
          },
          {
            text: "Mass",
            isCorrect: true,
            explanation:
              "Exactly! Newtons and pounds are units for force, whereas mass refers to the amount of particles, not a force strength. For example, the same mass weighs more pounds on earth than on the moon because gravity is stronger on earth. How much it weighs is the force.",
          },
          {
            text: "Pounds",
            isCorrect: false,
            explanation: "Not quite.",
          },
        ]}
      />
    </Block>,

    // Slide 5: Thinking about direction & magnitude.
    <Block color="blue" title="Forces are vectors">
      <p>
        Since forces are <KeyTerm>vectors</KeyTerm>, they have both a magnitude
        and a direction. However,{" "}
        <Emphasize>sometimes, we only care about one part of a force</Emphasize>
        .
      </p>
      <p>
        For example, if you're walking up a hill, it's important to break up
        gravity to see how much of gravity is pushing you into the hill and how
        much gravity is pushing you downhill.
      </p>
      <GravityComponentsDiagram />
    </Block>,

    // Slide 6: Splitting up forces.
    <Block color="yellow" title="Splitting a force into components">
      <p>
        Sometimes a force acts at an angle. In these cases, we often split the
        force into two components: one horizontal and one vertical.
      </p>
      <p>This process uses trigonometry:</p>
      <p>
        Since <Emphasize>cosine</Emphasize> gives us a number between -1 and 1
        telling us what fraction of the total force is in the x-direction, we
        can multiply it by the magnitude to get x-component of our force.{" "}
      </p>
      <p>
        Sine does the same for our y-component. You can see them both in action
        in the diagram below.
      </p>
      <FootballComponentsDiagram />
      <p>Drag and drop below to derive the equations.</p>
      <ForceComponentDerivation />
    </Block>,

    // Slide 7: Coding up how to split a force.
    <Block color="yellow" title="Code Force Components" mode="pickcode">
      <iframe
        id="forceComponentsPlugin"
        title="Code Force Components"
        width="100%"
        style={{ height: "calc(100vh - 100px)" }}
        src="https://dev.pickcode.io/lesson/force-components-logic-lesson-cmcdpn8cs000ek3y1wegxmemi-2025-07-18-09-40-00"
      ></iframe>
    </Block>,

    // Slide 8: Check in.
    <Block color="purple" title="Check in">
      <QuizQuestion
        question="If you have a force of 10 N to the right, what is the upward component of that force?"
        choices={[
          {
            text: "7.12 N",
            isCorrect: false,
            explanation: "Nope, not quite.",
          },
          {
            text: "0 N",
            isCorrect: true,
            explanation:
              "Exactly! Since the entire vector is to the right, it has zero going up.",
          },
          {
            text: "10 N",
            isCorrect: false,
            explanation: "Nope, not quite.",
          },
        ]}
      />
      <QuizQuestion
        question="If you have a force of 20 N to the up and right at a 60 degree angle above horizontal, what is the horizontal component of that force?"
        choices={[
          {
            text: <ReactKatex>{`$14 \\sqrt{3}$ N`}</ReactKatex>,
            isCorrect: false,
            explanation: "Nope, not quite.",
          },
          {
            text: "10 N",
            isCorrect: true,
            explanation:
              "Exactly! We take cosine of 60 degrees to get 0.5, which we multiply by 20 N to get 10 N.",
          },
          {
            text: <ReactKatex>$20 \pi$ N</ReactKatex>,
            isCorrect: false,
            explanation: "Nope, not quite.",
          },
        ]}
      />
    </Block>,

    // Slide 9: Introducing different types of forces.
    <Block color="yellow" title="Forces come in many types">
      <p>
        <Emphasize>
          Several distinct forces occur in mechanical systems.
        </Emphasize>{" "}
        Understanding each allows us to model interactions accurately. Here are
        a few examples you may see in this physics course:
      </p>
      <List
        items={[
          <>
            <KeyTerm>
              Gravity <ReactKatex>($F_g$)</ReactKatex>
            </KeyTerm>{" "}
            — the universal attraction between masses, acting downward near
            Earth's surface.
          </>,
          <>
            <KeyTerm>
              Normal force <ReactKatex>($F_N$)</ReactKatex>
            </KeyTerm>{" "}
            — the force when two objects are touching each other, such as you
            standing on the ground.
          </>,
          <>
            <KeyTerm>
              Tension <ReactKatex>($F_T$)</ReactKatex>
            </KeyTerm>{" "}
            — a pulling force transmitted through a string, rope, or cable.
          </>,
          <>
            <KeyTerm>
              Friction <ReactKatex>($F_f$)</ReactKatex>
            </KeyTerm>{" "}
            — a resistive force tangent to the interface between surfaces;
            includes static and kinetic forms. An example is a car using its
            breaks.
          </>,
          <>
            <KeyTerm>
              Spring force <ReactKatex>($F_s$)</ReactKatex>
            </KeyTerm>{" "}
            — the restoring force that increases the farther it is from
            equilibrium.
          </>,
          <>
            <KeyTerm>
              Applied force <ReactKatex>($F_A$)</ReactKatex>
            </KeyTerm>{" "}
            — a generic external push or pull.
          </>,
        ]}
      />
      <ColorBox color="blue">
        Most introductory problems combine only two or three of these forces,
        yet the underlying principles scale to complex systems.
      </ColorBox>
      <p>
        Here's an example of a spring pushing a block along a rough surface.{" "}
        <Emphasize>
          See if you can identify the 4 forces above that are acting on the
          box...
        </Emphasize>
      </p>
      <SpringBoxFrictionDiagram></SpringBoxFrictionDiagram>
      <MultiSelectQuizQuestion
        question="What forces are acting on the box?"
        choices={[
          {
            text: "Gravitational Force",
            isCorrect: true,
            explanation:
              "Yes, we know there must be gravity since if there were no gravity, the object wouldn't be pushed into the rough surface, so there wouldn't be friction and it wouldn't slow down to a stop.",
          },
          {
            text: "The Charleston Force",
            isCorrect: false,
            explanation: "Nope, that one's made up.",
          },
          {
            text: "Normal Force",
            isCorrect: true,
            explanation:
              "Yes, since gravity pulls the object into the surface, the normal force must exist to stop it from going straight through the surface.",
          },
          {
            text: "Applied Force",
            isCorrect: false,
            explanation:
              "Nope, all of the forces have a more descriptive name than that.",
          },
          {
            text: "Friction Force",
            isCorrect: true,
            explanation:
              "Yes, since the object slows down to a stop, we know it has friction. Also, since the object is on a rough surface with gravity pulling it into the surface, friction would form.",
          },
          {
            text: "Spring Force",
            isCorrect: true,
            explanation:
              "Yes, this is the force that pulls it back and forth. The spring force is what's causing the object to keep accelerating toward the equilibrium of the spring.",
          },
          {
            text: "Negative Force",
            isCorrect: false,
            explanation: "Nope, that one's made up.",
          },
        ]}
      />
    </Block>,

    // Slide 9b: A Note on Friction
    <Block color="blue" title="How do these forces work?">
      <h2 className="font-semibold text-center">Gravity</h2>
      <p>
        The gravitational force is given by <ReactKatex>$F_g = mg$</ReactKatex>,
        where <KeyTerm>m</KeyTerm> is mass and <KeyTerm>g</KeyTerm> is the
        acceleration due to gravity. This force acts downward toward the center
        of the Earth and grows proportional to mass.
      </p>

      <h2 className="font-semibold text-center">Normal Force</h2>
      <p>
        The <KeyTerm>normal force</KeyTerm> is the contact force applied
        perpendicular to a surface. It is not fixed, but it adjusts to prevent
        objects from passing through the surface. For example, when standing
        still, the normal force equals your weight so you don't fall through the
        ground.
      </p>

      <h2 className="font-semibold text-center">Friction</h2>
      <p>
        Friction resists motion between surfaces in contact. There are two
        kinds:
      </p>
      <List
        items={[
          <>
            <KeyTerm>Static friction</KeyTerm> prevents motion from starting and
            is governed by <ReactKatex>$F_s \leq \mu_s F_N$</ReactKatex>.
          </>,
          <>
            <KeyTerm>Kinetic friction</KeyTerm> resists motion already in
            progress and is given by <ReactKatex>$F_k = \mu_k F_N$</ReactKatex>.
          </>,
        ]}
      />
      <p>
        Both friction forces depend on the <KeyTerm>normal force</KeyTerm>,
        since that determines how tightly the surfaces are pressed together.
        Think of pushing your hand lightly on sandpaper versus pressing hard—the
        harder the contact, the greater the resistance.
      </p>
    </Block>,

    // Slide 10: Free body diagrams.
    <Block color="blue" title="Free body diagrams">
      <p>
        <Emphasize>
          A <KeyTerm>free body diagram (FBD)</KeyTerm> isolates a single object
          and displays every external force acting upon it.
        </Emphasize>
      </p>
      <p>
        These are super useful to solving any problem with forces. Here's how
        you make a free body diagram:
      </p>
      <List
        type="numbered"
        items={[
          <>Represent the object as a simple dot or box.</>,
          <>
            Draw arrows for <Emphasize>each</Emphasize> external force, with
            length proportionate to magnitude and orientation indicating
            direction.
          </>,
          <>Label each arrow.</>,
          <>Indicate a coordinate system and positive directions.</>,
        ]}
      />
      <ColorBox color="blue">
        Once complete, by Newton's second law of motion, the sum of all of the
        forces{" "}
        <KeyTerm>
          <ReactKatex>$F$</ReactKatex>
        </KeyTerm>{" "}
        equals
        <KeyTerm>
          <ReactKatex> $ma$</ReactKatex>
        </KeyTerm>
        , allowing us to find the acceleration (if we're given the mass, or vice
        versa).
      </ColorBox>
      <p>Here's a free body diagram for a person standing:</p>
      <PersonFreeBodyDiagram />
      <p>
        Notice how we didn't draw a person or the ground they are standing on,{" "}
        <Emphasize>we just drew a dot</Emphasize>. Then, we drew each force as
        an arrow, labeled with what that force is. You can see that since
        gravity and the normal force have the{" "}
        <Emphasize>same strengths, they have the same length</Emphasize>.
      </p>
    </Block>,

    // Slide 11: Making their own free body diagram.
    <Block color="yellow" title="Making your own Free Body Diagram">
      <p>
        Now let's think back to the spring example. See if you can make a free
        body diagram for the block in the system below.
      </p>
      <SpringBoxFrictionDiagram></SpringBoxFrictionDiagram>
      <p>
        Specifically, let's draw <Emphasize>Free Body Diagram</Emphasize> for
        when the block is <Emphasize>accelerating to the left</Emphasize>.
      </p>
      <FreeBodyDiagramBuilder></FreeBodyDiagramBuilder>
    </Block>,

    // Slide 12: Checking in on different force types.
    <Block color="purple" title="Check in">
      <QuizQuestion
        question="Which of the following forces always acts perpendicular to the surface?"
        choices={[
          {
            text: "Friction",
            isCorrect: false,
            explanation:
              "Not quite. Friction acts parallel to the surface in the direction opposite motion.",
          },
          {
            text: "Normal force",
            isCorrect: true,
            explanation:
              "Correct. The normal force is always perpendicular to the surface that applies it.",
          },
          {
            text: "Tension",
            isCorrect: false,
            explanation:
              "Not quite. Tension acts along the direction of the string or rope, not necessarily perpendicular to any surface.",
          },
        ]}
      />
      <QuizQuestion
        question="A block slides down a rough ramp. Which forces act on it?"
        choices={[
          {
            text: "Gravity, normal force, friction",
            isCorrect: true,
            explanation:
              "Correct. Gravity pulls it down, the ramp provides a normal force, and friction resists the sliding motion.",
          },
          {
            text: "Only gravity",
            isCorrect: false,
            explanation:
              "Incorrect. The ramp also provides a normal force and friction, both essential in the force model.",
          },
          {
            text: "Gravity and tension",
            isCorrect: false,
            explanation:
              "Incorrect. Tension only appears if there's a rope or cable involved, which was not stated.",
          },
        ]}
      />
    </Block>,

    // Slide 13: Solving problems with F=MA.
    <Block color="yellow" title="Solving problems with forces">
      <p>
        Now let's use a free body diagram to solve a physics problem together.
        Here's the problem:
      </p>
      <ColorBox color="blue">
        <p>
          Suppose we have a{" "}
          <KeyTerm>
            <ReactKatex>$10kg$ block</ReactKatex>
          </KeyTerm>{" "}
          sitting on a flat surface, with a static coefficient of friction at{" "}
          <KeyTerm>
            <ReactKatex>$\mu_s = 0.2$</ReactKatex>
          </KeyTerm>
          .
        </p>
        <p>
          If gravity acts at{" "}
          <KeyTerm>
            <ReactKatex>{`$g=10\\frac{m}{s^2}$`}</ReactKatex>
          </KeyTerm>
          ,{" "}
          <Emphasize>
            how many Newtons of force to right is necessary to start sliding the
            box?
          </Emphasize>
        </p>
      </ColorBox>
      <p>
        <Emphasize>Step 1:</Emphasize> Draw a free body diagram.
      </p>
      <ColorBox color="yellow">
        <FreeBodyDiagramStepper></FreeBodyDiagramStepper>
      </ColorBox>
      <p>
        <Emphasize>Step 2:</Emphasize> Write out the equations you know.
      </p>
      <ColorBox color="yellow">
        <ForcesBulletsWalkThrough></ForcesBulletsWalkThrough>
      </ColorBox>
      <p>
        <Emphasize>Step 3:</Emphasize> Start putting the equations together to
        solve for the unknowns.
      </p>
      <ColorBox color="yellow">
        <p>
          By Newton's second law of motion, we know F=ma, which{" "}
          <Emphasize>
            we can split into horizontal and vertical components
          </Emphasize>
          . First, we'll look at the vertical forces.
        </p>
        <br />
        <p>
          <ReactKatex>
            {`Our force sum is $F_y = normal - gravity = N - mg$. Since our
            vertical acceleration is 0, our $ma$ term is $ma_y = m(0) = 0$.
            Setting the two sides of $F=ma$ equal, we get $N-mg=0$.`}
          </ReactKatex>
          <Emphasize>
            {" "}
            <ReactKatex>
              {`From our horizontal components, we can conclude that
              $N=mg=(10kg)(10\\frac{m}{s^2})=100 \\text{ Newtons}$.`}
            </ReactKatex>
          </Emphasize>
        </p>
        <br />
        <p>
          Now, let's look at our horizontal forces to figure out how much we
          need to push to get this block to slide.
        </p>
        <br />
        <p>
          <ReactKatex>
            {`Our force sum is $F_x = push - friction = F - \\mu_s N$. Since we
            want our block to accelerate to the right, we have $ma_x \\gt 0$.
            Setting these equal, we get $F - \\mu_s N \\gt 0$. Substituting our
            values for $\\mu_s$ and $N$,`}
          </ReactKatex>
          <Emphasize>
            <ReactKatex>
              {` we get that our force applied must be $F \\gt \\mu_s N = (0.2) (\\text{100 Newtons}) = 20 \\text{ Newtons}$.`}
            </ReactKatex>
          </Emphasize>
        </p>
      </ColorBox>
    </Block>,
    // Slide 14: Check in problem.
    <Block color="purple" title="Force problem">
      <p>
        Now it's your turn to solve a problem on your own. Use the same steps as
        the previous slide to solve the following problem.
      </p>
      <ColorBox color="purple">
        <Emphasize>Blocks and a Pulley Problem: </Emphasize>
        <ReactKatex>
          {`Suppose we have two blocks, with masses $5kg$ and $10kg$, held
          together by a (weightless) string that is strung over a pulley. If we
          hold the blocks still and let go, how fast will they accelerate?
          (Note: You can assume gravity acts at $g=10\\frac{m}{s^2}$.)`}
        </ReactKatex>
        <img
          src={pulleyProblem.src}
          alt="Two blocks held together by a string over a pulley."
        ></img>
      </ColorBox>
    </Block>,
    // Slide 15: Coding up force addition.
    <Block color="yellow" title="Code force addition" mode="pickcode">
      <iframe
        id="forceAdditionPlugin"
        title="Code Force Addition"
        width="100%"
        style={{ height: "calc(100vh - 100px)" }}
        src="https://dev.pickcode.io/lesson/force-addition-logic-lesson-cmcdpn8cs000ek3y1wegxmemi-2025-07-21-08-12-45"
      ></iframe>
    </Block>,

    // Slide 16: Checking in on different force types.
    <Block color="green" title="Lesson Recap">
      <p>Here's what we learned about forces:</p>
      <List
        items={[
          <>
            A <KeyTerm>force</KeyTerm> a push or a pull, that causes objects to
            accelerate.
          </>,
          <>
            Often, we want to split a force into its{" "}
            <KeyTerm>force components</KeyTerm>. To do so, we we use
            trigonometry and get back two <Emphasize>perpendicular</Emphasize>{" "}
            parts of a force as a result.
          </>,
          <>
            <KeyTerm>Newton's Laws of Motions</KeyTerm> describe how forces
            interact with objects, such as how objects don't change their speed
            or direction unless there's a force <KeyTerm>(1st law)</KeyTerm>,
            Force is equal to Mass times Acceleration{" "}
            <KeyTerm>(2nd law)</KeyTerm>, and that every force has an opposite
            force of equal strength <KeyTerm>(3rd law)</KeyTerm>.
          </>,
          <>
            There are <Emphasize>many types of forces</Emphasize>, including{" "}
            <KeyTerm>gravitational</KeyTerm>, <KeyTerm>frictional</KeyTerm>,{" "}
            <KeyTerm>normal forces</KeyTerm>, <KeyTerm>tension forces</KeyTerm>,
            and <KeyTerm>spring forces</KeyTerm>.
          </>,
          <>
            <KeyTerm>Free Body Diagrams (FBDs)</KeyTerm> are a standard way to
            represent all the forces in a problem, which is helpful for using
            equations to solve the problem.
          </>,
          <>
            How to <KeyTerm>add together forces</KeyTerm> to solve problems.
          </>,
        ]}
      />
    </Block>,
  ];

  return <Lesson slides={slides}></Lesson>;
}
