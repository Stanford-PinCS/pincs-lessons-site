import Link from "next/link";
import { LockClosedIcon } from "@heroicons/react/24/outline";

export default function PincsHeader() {
  return (
    <div className="flex justify-between items-center md:pt-2 md:pb-2 md:px-2 lg:pt-4 lg:pb-4 lg:px-4 bg-[#ff80cc] w-full">
      <Link
        href={"/"}
        className="flex text-2xl font-extralight inline-block no-underline hover:text-white text-[#ff0]"
      >
        Stanford PinCS{" "}
      </Link>
      <Link
        href={"/"}
        className={"flex text-sm gap-1 font-extralight hover:underline"}
      >
        Teacher login
        <LockClosedIcon width={16} />
      </Link>
    </div>
  );
}
