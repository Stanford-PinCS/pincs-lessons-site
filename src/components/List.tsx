import ReactKatex from "@pkasila/react-katex";
import "katex/dist/katex.min.css";
import React, { ReactNode } from "react";

type ListItem = string | ReactNode | { katex: string };
type ListType = "bulleted" | "numbered";

export default function List({
  items,
  type = "bulleted",
}: {
  items: ListItem[];
  type?: ListType;
}) {
  // Make li's out of the items prop.
  function Items() {
    return (
      <>
        {items.map((item, id) => (
          <li key={id}>
            {typeof item === "object" && item !== null && "katex" in item ? (
              <ReactKatex>{(item as { katex: string }).katex}</ReactKatex>
            ) : typeof item === "string" || React.isValidElement(item) ? (
              item
            ) : null}
          </li>
        ))}
      </>
    );
  }
  // Return the appropriate type of list based on type.
  if (type === "numbered") {
    return (
      <ol className="text-lg list-decimal list-outside ml-7 space-y-1">
        <Items />
      </ol>
    );
  }
  return (
    <ul className="text-lg list-disc list-outside ml-7 space-y-1">
      <Items />
    </ul>
  );
}
