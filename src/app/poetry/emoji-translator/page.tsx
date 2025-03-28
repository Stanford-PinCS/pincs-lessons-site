import { Metadata } from "next";
import LessonWrapper from "@/components/LessonWrapper";
import EmojiTranslator from "./EmojiTranslator";

export const metadata: Metadata = {
  title: "Emoji Translator",
  description: "",
};

export default function EmojiTranslatorLesson() {
  return (
    <LessonWrapper>
      <EmojiTranslator />
    </LessonWrapper>
  );
}
