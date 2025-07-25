import Link from "next/link";
import { LockClosedIcon } from "@heroicons/react/24/outline";
import { ArrowLeftStartOnRectangleIcon } from "@heroicons/react/24/outline";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

type PincsHeaderProps = {
  hideLogin?: boolean;
};

export default function PincsHeader({ hideLogin }: PincsHeaderProps) {
  const session = useSession();
  const router = useRouter();

  return (
    <div className="flex justify-between items-center md:pt-2 md:pb-2 md:px-2 lg:pt-4 lg:pb-4 lg:px-4 bg-[#ff80cc] w-full">
      <Link
        href={"/"}
        className="flex text-2xl font-extralight inline-block no-underline hover:text-white text-[#ff0]"
      >
        Stanford PinCS{" "}
      </Link>
      {hideLogin ? (
        <></>
      ) : session.status === "authenticated" ? (
        <button
          className={"flex text-sm gap-1 font-extralight hover:underline"}
          onClick={() => {
            signOut();
            router.refresh();
          }}
        >
          Logout
          <ArrowLeftStartOnRectangleIcon width={16} />
        </button>
      ) : (
        <Link
          href={"/login"}
          className={"flex text-sm gap-1 font-extralight hover:underline"}
        >
          Teacher login
          <LockClosedIcon width={16} />
        </Link>
      )}
    </div>
  );
}
