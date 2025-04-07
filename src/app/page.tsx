import Link from "next/link";

const lessons = [
  { title: "Cell health", link: "/biology/cell-health" },
  { title: "Disease spread", link: "/biology/disease-spread" },
  { title: "Memory model", link: "/biology/memory" },
  { title: "Fractals+Recursion", link: "/geometry" },
  { title: "Arpanet", link: "/history/arpanet" },
  { title: "Cryptography", link: "/history/cryptography" },
  { title: "Music Analysis", link: "/music" },
  { title: "Emoji Translator", link: "/poetry/emoji-translator" },
  { title: "Next Word Prediction", link: "/poetry/next-word-prediction" },
  { title: "Probability Intro", link: "/probability" },
  { title: "Code Editor Example", link: "/code-editor-example" },
];

export default function Home() {
  return (
    <div className="h-[100vh] w-full flex flex-col items-center justify-center gap-8">
      <h1 className="text-xl">PinCS interactive lessons</h1>
      <div className="flex flex-row flex-wrap gap-4 w-2xl justify-center items-center">
        {lessons.map((l, i) => (
          <Link
            key={i}
            className="p-4 rounded-lg border-slate-500 border w-60 flex items-center justify-center hover:border-indigo-500 cursor-pointer"
            href={l.link}
          >
            {l.title}
          </Link>
        ))}
      </div>
    </div>
  );
}
