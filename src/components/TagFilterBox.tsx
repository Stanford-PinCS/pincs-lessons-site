// 

"use client";
import { Dispatch, SetStateAction, useState } from "react";
import { Checkbox, Field, Input, Label } from "@headlessui/react";
import { Tag } from "@/app/types";
import { CheckIcon } from "@heroicons/react/20/solid";

type Props = {
  selectedItems: Tag[];
  setSelectedItems: Dispatch<SetStateAction<Tag[]>>;
  allItems: Tag[];
};

export default function TagFilterBoxCheckbox({
  selectedItems,
  setSelectedItems,
  allItems,
}: Props) {
  const [query, setQuery] = useState("");

  const filteredOptions =
    query === ""
      ? allItems
      : allItems.filter((item) =>
          String(item.value).toLowerCase().includes(query.toLowerCase())
        );

  const toggleItem = (item: Tag, checked: boolean) =>
    setSelectedItems((prev) => {
      const exists = prev.some(
        (t) => t.type === item.type && t.value === item.value
      );
      if (checked && !exists) return [...prev, item];
      if (!checked && exists)
        return prev.filter(
          (t) => !(t.type === item.type && t.value === item.value)
        );
      return prev;
    });

  return (
    <div className="px-4 pt-2">
      <Field>
        <Label className="block mb-1">Subject</Label>
        <Input
          type="text"
          placeholder="Search…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="border border-gray-600 bg-white text-black w-64 px-2 py-1 rounded focus:outline-none focus:ring-2 focus:ring-gray-200"
          autoComplete="off"
        />

        <ul className="mt-2 max-h-60 w-64 overflow-auto space-y-1">
          {filteredOptions.map((item, idx) => {
            const checked = selectedItems.some(
              (t) => t.type === item.type && t.value === item.value
            );
            return (
              <li key={`${item.type}-${item.value}-${idx}`}>
                <Field className="flex items-center gap-2">
                  <Checkbox
                    checked={checked}
                    onChange={(c) => toggleItem(item, c)}
                    className="group block size-4 rounded border bg-white data-checked:bg-pink-600"
                  >
                    <CheckIcon className="stroke-white opacity-0 group-data-checked:opacity-100 w-3 h-3" />
                  </Checkbox>

                  <Label passive className="text-sm select-none">
                    {String(item.value)}
                  </Label>
                </Field>
              </li>
            );
          })}
          {!filteredOptions.length && (
            <li className="text-sm text-gray-500 py-2">No matches</li>
          )}
        </ul>
      </Field>
    </div>
  );
}
