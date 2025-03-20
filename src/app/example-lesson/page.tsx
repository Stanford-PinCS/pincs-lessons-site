import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Do While Loops",
  description:
    "Do while loops are a infrequently used type of loop in many programming languages",
};

export default function About() {
  return (
    <div className="h-full w-full bg-white text-slate-800 p-8 flex flex-col items-center gap-8">
      <div className="max-w-[800px] flex flex-col gap-4 bg-white rounded-xl py-8">
        <h1 className="font-bold text-3xl text-center">The Do While Loop</h1>
        <p>The do while loop looks like this:</p>
        <pre>
          {`do {
  i = i + 1;
  result = result + i;
} while (i < 5);`}
        </pre>
      </div>
    </div>
  );
}
