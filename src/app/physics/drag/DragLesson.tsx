import Block from "@/components/Block";
import ColorBox from "@/components/ColorBox";
import Emphasize from "@/components/Emphasize";
import KeyTerm from "@/components/KeyTerm";
import Lesson from "@/components/Lesson";
import QuizQuestion from "@/components/QuizQuestion";

export default function DragLesson() {
  const slides = [
    <Block color="green" title="This is an example block">
      <p>
        You can put paragraphs of text within the block and it'll work nicely.
      </p>
      <p>
        Here's a second paragraph, and as long as you put them in the &lt;p&gt;
        tag, you're good to go!
      </p>
    </Block>,
  ];
  return <Lesson slides={slides} />;
}
