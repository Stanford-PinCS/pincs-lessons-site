import { ReactNode } from "react";

/* Feel free to extend this button with functionality + generality as you see fit. */
type PincsButtonProps = {
  text?: string;
  onClick?: () => void;
  iconRight?: ReactNode;
  className?: string;
  type?: "button" | "submit" | "reset";
};

export default function PincsButton({
  text,
  onClick,
  iconRight,
  className,
  type,
}: PincsButtonProps) {
  const providedClassName = className ? className + " " : "";

  return (
    <button
      type={type}
      className={
        providedClassName +
        "flex flex-row gap-2 m-4 p-2 bg-[#ff80cc] text-white rounded hover:bg-pink-400 cursor-pointer"
      }
      onClick={onClick}
    >
      {text}
      {iconRight !== undefined && iconRight}
    </button>
  );
}
