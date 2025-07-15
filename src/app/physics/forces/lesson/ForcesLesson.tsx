import Block from "@/components/Block";
import Emphasize from "@/components/Emphasize";
import Lesson from "@/components/Lesson";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Forces",
  description:
    "This lesson teaches how to forces work, how to add forces, and how to build a free body diagram.",
};

export default function ForcesLesson() {
  const slides = [
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
  ];

  return <Lesson slides={slides}></Lesson>;
}
