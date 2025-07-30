import ReactKatex from "@pkasila/react-katex";
import "katex/dist/katex.min.css";
import React, { ReactNode } from "react";

type ListItem = string | ReactNode | { katex: string };

export default function List({ items }: { items: ListItem[] }) {
  return (
    <ul className="text-lg list-disc list-outside ml-7 space-y-1">
      {items.map((item, id) => (
        <li key={id}>
          {typeof item === "object" && item !== null && "katex" in item ? (
            <ReactKatex>{(item as { katex: string }).katex}</ReactKatex>
          ) : typeof item === "string" || React.isValidElement(item) ? (
            item
          ) : null}
        </li>
      ))}
    </ul>
  );
}
