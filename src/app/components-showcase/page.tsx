"use client";

import React from "react";
import Block from "@/components/Block";
import ColorBox from "@/components/ColorBox";
import Emphasize from "@/components/Emphasize";
import KeyTerm from "@/components/KeyTerm";
import Slide from "@/components/Slide";
import TagFilterBox from "@/components/TagFilterBox";
import { Subject, Tag } from "@/app/types";

export default function ComponentShowcase() {
  const [selectedTags, setSelectedTags] = React.useState<Tag[]>([]);
  const sampleTags: Tag[] = [
    { type: "subject", value: Subject.Mathematics },
    { type: "subject", value: Subject.ComputerScience },
    { type: "subject", value: Subject.History },
    { type: "subject", value: Subject.Biology },
  ];

  return (
    <div className="p-8 space-y-12">
      <h1 className="text-4xl font-bold mb-8">Component Showcase</h1>

      {/* Block Component */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Block Component</h2>
        <p className="text-gray-600 mb-4">
          Used for creating highlighted content blocks with titles
        </p>
        <Block color="blue" title="Example Block">
          <p>
            This is an example of the Block component. It creates a bordered
            section with a title.
          </p>
          <p>You can include multiple paragraphs and other content inside.</p>
        </Block>
      </section>

      {/* ColorBox Component */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">ColorBox Component</h2>
        <p className="text-gray-600 mb-4">
          Used for creating colored background boxes
        </p>
        <div className="space-y-4">
          <ColorBox color="blue">
            <p>This is a blue ColorBox</p>
          </ColorBox>
          <ColorBox color="green">
            <p>This is a green ColorBox</p>
          </ColorBox>
          <ColorBox color="yellow">
            <p>This is a yellow ColorBox</p>
          </ColorBox>
        </div>
      </section>

      {/* Emphasize Component */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Emphasize Component</h2>
        <p className="text-gray-600 mb-4">Used for emphasizing text inline</p>
        <p>
          This is a sentence with <Emphasize>emphasized text</Emphasize> in the
          middle.
        </p>
      </section>

      {/* KeyTerm Component */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">KeyTerm Component</h2>
        <p className="text-gray-600 mb-4">
          Used for highlighting key terms in yellow
        </p>
        <p>
          Here's an example of a <KeyTerm>key term</KeyTerm> in a sentence.
        </p>
      </section>

      {/* Slide Component */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Slide Component</h2>
        <p className="text-gray-600 mb-4">
          Used for creating centered, full-width slides
        </p>
        <div className="border border-gray-200 h-96">
          <Slide>
            <div className="text-center">
              <h3 className="text-2xl mb-4">Example Slide Content</h3>
              <p>
                This content is centered both horizontally and vertically within
                the slide.
              </p>
            </div>
          </Slide>
        </div>
      </section>

      {/* TagFilterBox Component */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">TagFilterBox Component</h2>
        <p className="text-gray-600 mb-4">Used for filtering content by tags</p>
        <div className="border border-gray-200 rounded-lg">
          <TagFilterBox
            selectedItems={selectedTags}
            setSelectedItems={setSelectedTags}
            allItems={sampleTags}
          />
        </div>
        <div className="mt-4">
          <p>
            Selected tags: {selectedTags.map((tag) => tag.value).join(", ")}
          </p>
        </div>
      </section>
    </div>
  );
}
