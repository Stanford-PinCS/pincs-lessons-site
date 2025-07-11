import Link from "next/link";

export default function PincsHeader() {
  return (
    <div className="md:pt-2 lg:pt-4 md:pl-2 lg:pl-4 md:pb-3 lg:pb-6 bg-[#ff80cc] w-full">
      <Link
        href={"/"}
        className="flex text-2xl font-extralight inline-block no-underline hover:text-white text-[#ff0]"
      >
        Stanford PinCS{" "}
      </Link>
    </div>
  );
}
