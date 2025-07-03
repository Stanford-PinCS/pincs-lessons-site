import Block from "@/components/Block";
import ColorBox from "@/components/ColorBox";
import Emphasize from "@/components/Emphasize";
import KeyTerm from "@/components/KeyTerm";
import Lesson from "@/components/Lesson";
import QuizQuestion from "@/components/QuizQuestion";

export default function Example() {
  const slides = [
    <div>
      Slide 1 - This is how you use slides, by having a React Node in a comma
      seperated array passed into a Lesson component.
    </div>,
    <Block color="green" title="This is an example block">
      <p>
        You can put paragraphs of text within the block and it'll work nicely.
      </p>
      <p>
        Here's a second paragraph, and as long as you put them in the &lt;p&gt;
        tag, you're good to go!
      </p>
    </Block>,
    <Block color="blue" title="We should make the text engaging!">
      <p>
        Here's a normal paragraph, but it has{" "}
        <Emphasize>an &lt;Emphasize&gt; tag within it!</Emphasize>
      </p>
      <p>
        That makes it bold. We can also use a <KeyTerm>&lt;KeyTerm&gt;</KeyTerm>{" "}
        whenever we have a term that deserves extra attention.
      </p>
    </Block>,
    <Block color="yellow" title="Breaking up longer sections">
      <p>
        <Emphasize>Sometimes the paragraphs get big...</Emphasize> (and yes
        that's an Emphasize tag.)
      </p>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde veritatis
        repellat praesentium inventore adipisci. Nisi voluptatum totam quibusdam
        odit voluptas. Similique iure eligendi tempore veniam nobis maxime
        nostrum labore debitis, optio, commodi minima at iste maiores voluptatum
        eum officiis ipsum? Eos laboriosam enim alias libero delectus ad placeat
        impedit deserunt!
      </p>
      <ColorBox color="blue">
        But we can use a <KeyTerm>&lt;ColorBox&gt;</KeyTerm> to break it up with
        a short sentence. (Yes that's a KeyTerm tag.)
      </ColorBox>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius ratione
        necessitatibus ad sed incidunt minima quibusdam ipsa qui eos blanditiis
        delectus atque accusamus dolores cum, soluta natus cumque et
        consequatur? Earum pariatur possimus cupiditate neque cumque nam,
        tenetur expedita debitis! Veritatis voluptatum sed eaque qui temporibus!
        Dignissimos modi eveniet reiciendis!
      </p>
    </Block>,
    <Block color="purple" title="Questions...">
      <QuizQuestion
        question="When we want to ask questions, we use a...?"
        choices={[
          {
            text: "Emphasize tag or KeyTerm tag",
            isCorrect: false,
            explanation:
              "No, despite us emphasizing key terms through quizzing.",
          },
          {
            text: "Block tag",
            isCorrect: false,
            explanation:
              "No, although we may want to put a block tag around a question.",
          },
          {
            text: "ColorBox",
            isCorrect: false,
            explanation: "No, eventhough a question has boxes.",
          },
          {
            text: "QuizQuestion",
            isCorrect: true,
            explanation: "Yup, that's me!",
          },
        ]}
      />
    </Block>,
    <div className="space-y-12">
      <h2 className="text-2xl font-bold mb-12">Color Coding Convention</h2>
      <br />
      <Block color="green" title="Green Blocks">
        <p>
          Use green blocks for learning targets at the start of lessons and for
          lesson recaps at the end.
        </p>
      </Block>
      <Block color="blue" title="Blue Blocks">
        <p>
          Use blue blocks for definitions and key concepts that students need to
          understand.
        </p>
      </Block>
      <Block color="yellow" title="Yellow Blocks">
        <p>
          Use yellow blocks for interactive content and hands-on exercises where
          students will be actively engaged.
        </p>
      </Block>
      <Block color="purple" title="Purple Blocks">
        <p>
          Use purple blocks for quiz questions and other forms of assessment.
        </p>
      </Block>
    </div>,
    <Block color="blue" title="Component Showcase">
      <p>
        Thanks for learning about the different components. Check out this link
        to see them all in one place.
      </p>
      <a
        className="text-blue-500"
        href="/interactive-lessons/components-showcase"
      >
        Component Showcase
      </a>
    </Block>,
  ];
  return <Lesson slides={slides} />;
}
