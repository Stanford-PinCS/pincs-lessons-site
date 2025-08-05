import ReactKatex from "@pkasila/react-katex";
import "katex/dist/katex.min.css";
import React, { ReactNode } from "react";
import Text from "./Text";

type ListItem = string | string[];
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
            <Text>{item}</Text>
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
