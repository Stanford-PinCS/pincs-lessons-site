import { ReactNode } from "react";

/* Feel free to extend this button with functionality + generality as you see fit. */
type PincsButtonProps = {
  text?: string;
  onClick?: () => void;
  iconRight?: ReactNode;
};

export default function PincsButton({
  text,
  onClick,
  iconRight,
}: PincsButtonProps) {
  return (
    <button
      className="flex self-start flex-row gap-2 m-4 p-2 bg-[#ff80cc] text-white rounded hover:bg-pink-400 cursor-pointer"
      onClick={onClick}
    >
      {text}
      {iconRight !== undefined && iconRight}
    </button>
  );
}
