import Block from "@/components/Block";
import Lesson from "@/components/Lesson";
import RPGDataAnimation from "./RPGDataAnimation";
import UnityWrapper from "@/components/UnityWrapper";

export default function RenaissanceLesson() {
  const slides = [
    <Block color="green" title="Renaissance Learning Targets">
      You'll learn:
    </Block>,
    <Block color="blue" title="Background">
      What you need to know...
    </Block>,
    <Block
      color="yellow"
      title="Walk the Streets of Florence"
      mode="fullscreen"
    >
      <UnityWrapper projectName="florence"></UnityWrapper>
    </Block>,
    <Block color="blue" title="Behind The Scenes">
      Let's consider how we can store the data for a dialogue, with many
      messages and possible responses.
      <RPGDataAnimation></RPGDataAnimation>
    </Block>,
    <Block color="yellow" title="Make Your Own Story" mode="fullscreen">
      <iframe
        id="storyDataPlugin"
        title="Making Story Data"
        width="100%"
        style={{ height: "calc(100svh - 100px)" }}
        src="https://dev.pickcode.io/lesson/create-your-own-story-lesson-cmcdpn8cs000ek3y1wegxmemi-2025-07-29-09-38-49"
      ></iframe>
    </Block>,
  ];

  return <Lesson slides={slides} />;
}
