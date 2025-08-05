import ReactKatex from "@pkasila/react-katex";
import "katex/dist/katex.min.css";
import React, { ReactNode } from "react";
import Text from "./Text";

type ListItem = string | string[] | ReactNode;
type ListType = "bulleted" | "numbered";

function ListItems({ items }: { items: ListItem[] }) {
  return (
    <>
      {items.map((item, id) => (
        <li key={id}>
          {typeof item == "string" || Array.isArray(item) ? (
            <Text>{item}</Text>
          ) : (
            item
          )}
        </li>
      ))}
    </>
  );
}

export default function List({
  items,
  type = "bulleted",
}: {
  items: ListItem[];
  type?: ListType;
}) {
  // Return the appropriate type of list based on type.
  if (type === "numbered") {
    return (
      <ol className="text-lg list-decimal list-outside ml-7 space-y-1">
        <ListItems items={items} />
      </ol>
    );
  }
  return (
    <ul className="text-lg list-disc list-outside ml-7 space-y-1">
      <ListItems items={items} />
    </ul>
  );
}
