import Link from "next/link";

export default function Home() {
  return (
    <div className="h-[100vh] w-full flex flex-col items-center justify-center gap-2">
      <h1>PinCS lesson site coming soon!</h1>
      <Link href={"/example-lesson"} className="underline">
        Go to example lesson
      </Link>
    </div>
  );
}
