"use client";
import { Config, Render } from "@measured/puck";
import { config } from "@/app/lesson-maker/puck.config";
import LessonWrapper from "./LessonWrapper";
import Lesson from "./Lesson";
import { Data } from "@measured/puck";
import React, { useState } from "react";

/**
 * Note: Data cannot change, since it only loads in the data once to avoid rerenders.
 */
export default function ({
  data,
  customComponents = {},
}: {
  data: Data[];
  customComponents: Record<string, React.ComponentType<any>>;
}) {
  const lessonConfig: Config = {
    ...config,
    components: {
      ...config.components,
      Custom: {
        fields: {},
        defaultProps: {
          name: "",
        },
        render: ({ name }) => {
          const cleanName = name.replace(/[^A-Za-z0-9_]/g, "");
          const Component = customComponents["custom_" + cleanName];
          if (Component == undefined) {
            return (
              <span className="bg-red-500 p-4 rounded-md text-white">
                Error: Invalid custom component.
              </span>
            );
          }
          return <Component />;
        },
      },
    },
    root: {
      render: ({ children }) => {
        return <>{children}</>;
      },
    },
  };

  // Only load once, otherwise it will try to reload every time the url changes,
  // causing glitchy behavior as <Text/> will take a few milliseconds to load in.
  const [slides, setSlides] = useState(() => {
    return data.map((slide: Data, index: number) => {
      return <Render key={index} config={lessonConfig} data={slide}></Render>;
    });
  });

  return (
    <LessonWrapper>
      <Lesson slides={slides}></Lesson>
    </LessonWrapper>
  );
}
