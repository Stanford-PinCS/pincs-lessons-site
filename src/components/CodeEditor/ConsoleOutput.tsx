/**
 * Display console messages in a list, monospace font, red for errors, white otherwise
 */

import classNames from "classnames";
import { ConsoleMessage } from "./runtimes/JSRuntime";

export const ConsoleOutput = ({
  outputLines,
}: {
  outputLines: ConsoleMessage[];
}) => {
  return (
    <div className="flex flex-col p-1">
      {outputLines.map((m: ConsoleMessage, i: number) => {
        return (
          <div
            className={`w-full px-2 mr-1 bg-slate-900 place-self-end`}
            key={`${i}`}
          >
            <pre
              className={classNames(
                `font-mono w-fit whitespace-pre-wrap`,
                m.logType === "error" && "text-red-500",
                m.logType === "log" && "text-slate-100"
              )}
            >
              {m.message}
            </pre>
          </div>
        );
      })}
    </div>
  );
};
