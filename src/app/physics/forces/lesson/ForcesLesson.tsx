"use client";
import Block from "@/components/Block";
import Emphasize from "@/components/Emphasize";
import KeyTerm from "@/components/KeyTerm";
import Lesson from "@/components/Lesson";
import { Metadata } from "next";
import ClimbingAnimation from "./ClimbingAnimation";

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
        For example, if you are climbing up a ladder, you are pulling your
        entire body weight (the magnitude) upward (the direction).
      </p>
      <ClimbingAnimation />
    </Block>,
    // Slide 3: Explaining basics around forces.
    <Block color="blue" title="Newton's Laws">
      <></>
    </Block>,
    // Slide 4: Checking force understanding.
    <Block color="purple" title="Force check in">
      <></>
    </Block>,

    // Slide 5: Thinking about direction & magnitude.
    <Block color="blue" title="Forces are vectors">
      <></>
    </Block>,
    // Slide 6: Splitting up forces.
    <Block color="yellow" title="Splitting a force into components">
      <></>
    </Block>,
    // Slide 7: Coding up how to split a force.
    <Block color="yellow" title="Making components in code">
      <></>
    </Block>,
    // Slide 8: Check in.
    <Block color="purple" title="Check in">
      <></>
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
