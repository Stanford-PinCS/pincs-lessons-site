import Block from "@/components/Block";
import Lesson from "@/components/Lesson";

export default function RenaissanceLesson() {
  const slides = [
    <Block color="green" title="Renaissance Learning Targets">
      You'll learn:
    </Block>,
    <Block color="blue" title="Background">
      What you need to know...
    </Block>,
    <Block color="yellow" title="Walk the Streets of Florence">
      Say hi to DaVinci
    </Block>,
    <Block color="blue" title="Behind The Scenes">
      How does it work?
    </Block>,
    <Block color="blue" title="Make Your Own Story" mode="pickcode">
      Pickcode goes here
    </Block>,
  ];

  return <Lesson slides={slides} />;
}
