import LessonWrapper from "@/components/LessonWrapper";
import { Metadata } from "next";
import HistoricalCryptographyExplorer from "./HistoricalCryptographyExplorer";

export const metadata: Metadata = {
  title: "Historical Cryptography Explorer",
  description: "",
};

export default function CryptographyLesson() {
  return (
    <LessonWrapper>
      <HistoricalCryptographyExplorer />
    </LessonWrapper>
  );
}
