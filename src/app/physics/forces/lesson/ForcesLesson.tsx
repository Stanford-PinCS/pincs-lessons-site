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
import { ForceComponentDerivation } from "./ForceComponentDerivation";

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
      <ul className="list-disc list-inside">
        <li>Learn what forces are.</li>
        <li>Understand and practice using free body diagrams.</li>
        <li>Learn how to use force components.</li>
      </ul>
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
          A <KeyTerm>force</KeyTerm> is an influence that causes an object ot
          accelerate
        </Emphasize>
        . Essentially, a force is a <Emphasize>push or pull</Emphasize>.
      </p>
      <p>
        When you play Tug of War, pulling on the rope is exerting a force.
        Similarly, any time you carry objects, or even just walk, you are
        exerting forces.
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
        Just like how a drop of rain keeps falling until it gets stopped by the
        ground, every object won't change its velocity unless there's a force.
      </ColorBox>
      <p>
        <Emphasize>Newton's Second Law</Emphasize> tells us how to calculate the
        effect of a force: <KeyTerm>F = ma</KeyTerm>, where <KeyTerm>F</KeyTerm>{" "}
        is force, <KeyTerm>m</KeyTerm> is mass, and <KeyTerm>a</KeyTerm> is
        acceleration.
      </p>
      <ColorBox color="blue">
        Eventhough it gives us the formula as F = ma, since we're often given
        the force and want to find the acceleration, it can be helpful to
        rewrite it as: <ReactKatex>{`$a = \\frac{F}{m}$`}</ReactKatex>. This
        also helps us understand that a large force can get cancelled out by a
        large mass.
      </ColorBox>
      <p>
        <Emphasize>Newton's Third Law</Emphasize> says that for every action,
        there is an equal and opposite reaction.
      </p>
      <ColorBox color="blue">
        Imagine if you punched a wall. You're the one making the force against
        the wall, but your hand would still hurt. That's because however much
        force you put into the wall, the wall exerts right back at you!
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
              "Exactly! Newtons and pounds are units of force magnitude, whereas mass refers to the amount of particles, not a force strength. For example, the same mass weighs more pounds on earth than on the moon because gravity is stronger on earth.",
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
        Since cosine gives us a number between -1 and 1 telling us what fraction
        of the total force is in the x-direction, we can multiply it by the
        magnitude to get x-component of our force.{" "}
      </p>
      <p>
        Sine does the same for our y-component. You can see them both in action
        in the diagram below.
      </p>
      <FootballComponentsDiagram />
      <ForceComponentDerivation />
    </Block>,

    // Slide 7: Coding up how to split a force.
    <Block color="yellow" title="Making components in code">
      <></>
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
            isCorrect: false,
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
    </Block>,

    // Slide 9: Introducing different types of forces.
    <Block color="blue" title="Forces come in many types">
      <></>
    </Block>,
    // Slide 10: Free body diagrams.
    <Block color="blue" title="Free body diagrams">
      <></>
    </Block>,
    // Slide 11: Feeling the forces.
    <Block color="yellow" title="Feeling the forcees">
      <></>
    </Block>,
    // Slide 12: Checking in on different force types.
    <Block color="purple" title="Check in">
      <></>
    </Block>,

    // Slide 13: Solving problems with F=MA.
    <Block color="yellow" title="Solving problems with forces">
      <></>
    </Block>,
    // Slide 14: Check in problem.
    <Block color="purple" title="Force problem">
      <></>
    </Block>,
    // Slide 15: Coding up force addition.
    <Block color="yellow" title="Coding up force addition">
      <></>
    </Block>,

    // Slide 16: Checking in on different force types.
    <Block color="green" title="Lesson Recap">
      <></>
    </Block>,
  ];

  return <Lesson slides={slides}></Lesson>;
}
