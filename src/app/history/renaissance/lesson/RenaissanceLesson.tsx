"use client";
import Block from "@/components/Block";
import Lesson from "@/components/Lesson";
import RPGDataAnimation from "./RPGDataAnimation";
import UnityWrapper from "@/components/UnityWrapper";
import List from "@/components/List";
import Emphasize from "@/components/Emphasize";

export default function RenaissanceLesson() {
  const slides = [
    // Slide 1: Introduction.
    <Block color="green" title="Renaissance Learning Targets">
      <p>You'll learn:</p>
      <List
        items={[
          <>
            What made the Renaissance period special:{" "}
            <Emphasize>innovation and creation.</Emphasize>
          </>,
          <>
            Two key influences of the Renaissance:{" "}
            <Emphasize>money and religion</Emphasize>.
          </>,
          <>
            How we can <Emphasize>store dialogue data</Emphasize> using objects.
          </>,
        ]}
      />
    </Block>,
    // Slide 2: Info about Renaissance / Florence.
    <Block color="blue" title="Background">
      What you need to know...
    </Block>,
    // Slide 3: Unity game in Florence.
    <Block
      color="yellow"
      title="Walk the Streets of Florence"
      mode="fullscreen"
    >
      <UnityWrapper projectName="florence"></UnityWrapper>
    </Block>,
    // Slide 4: How we might store data.
    <Block color="blue" title="Behind The Scenes">
      Let's consider how we can store the data for a dialogue, with many
      messages and possible responses.
      <RPGDataAnimation></RPGDataAnimation>
    </Block>,
    // Slide 5: Making their own data.
    <Block color="yellow" title="Make Your Own Story" mode="fullscreen">
      <iframe
        id="storyDataPlugin"
        title="Making Story Data"
        width="100%"
        style={{ height: "calc(100svh - 100px)" }}
        src="https://dev.pickcode.io/lesson/create-your-own-story-lesson-cmcdpn8cs000ek3y1wegxmemi-2025-07-29-09-38-49"
      ></iframe>
    </Block>,
    // Slide 6: Review.
    <Block color="green" title="Renaissance Recap">
      <p>
        Today, you've learned about the Renaissance through the lens of a
        Florence citizen. Specifically, you've learned:
      </p>
      <List
        items={[
          <>
            From DaVinci, you saw how the Renaissance was special because of the{" "}
            <Emphasize>exploration of ideas</Emphasize>.
          </>,
          <>
            In the Medici Bank, you saw how the Renaissance was the{" "}
            <Emphasize>first time money gave citizens power</Emphasize>.
          </>,
          <>
            With the Secretive Press, you saw how much power the Christian
            authorities had and{" "}
            <Emphasize>how people fought for science</Emphasize>.
          </>,
          <>
            Lastly, you learned how to{" "}
            <Emphasize>store dialogue data</Emphasize> using objects in a way
            that you can write, that's easy for the computer to read.
          </>,
        ]}
      />
    </Block>,
  ];

  return <Lesson slides={slides} />;
}
