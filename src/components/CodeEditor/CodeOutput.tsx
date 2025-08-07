import {
  ArrowsPointingOutIcon,
  CommandLineIcon,
} from "@heroicons/react/24/outline";
import { PlayIcon } from "@heroicons/react/24/solid";
import { useEffect, useRef, useState } from "react";
import classNames from "classnames";
import { ConsoleOutput } from "./ConsoleOutput";
import { PluginLoader } from "./PluginLoader";

export const CodeOutput = ({
  pluginId,
  runCode,
}: {
  pluginId: string;
  runCode: () => void;
}) => {
  const [showConsole, setShowConsole] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  return (
    <div className="w-full h-full relative flex flex-col">
      <div
        ref={iframeRef}
        className={classNames("grow", showConsole && "hidden")}
      >
        <PluginLoader pluginId={pluginId} />
      </div>
      {showConsole && (
        <div className="grow bg-slate-900">
          <ConsoleOutput outputLines={[]} />
        </div>
      )}
      <div className="flex flex-row items-center border-t border-slate-500 bg-slate-100 py-1 px-2 gap-1 h-14 shrink-0">
        <div className="relative">
          <div
            className={classNames(
              "cursor-pointer border border-slate-400 h-10 w-10 text-slate-400 bg-white rounded-full flex items-center justify-center hover:ring-2 hover:ring-indigo-500 transition-all shrink-0",
              showConsole && "ring-2 ring-indigo-500"
            )}
            onClick={() => setShowConsole(!showConsole)}
          >
            <CommandLineIcon className="text-slate-500 h-6" />
          </div>
          {/* TODO */}
          {false && (
            <div
              className={classNames(
                "absolute -top-1 -right-1 h-4 w-4 rounded-full"
                // consoleBadge === "err" && "bg-red-500",
                // consoleBadge === "info" && "bg-blue-500"
              )}
            />
          )}
        </div>
        <div className="ml-auto flex flex-row gap-1 items-end">
          <div
            id="play"
            onClick={() => runCode()}
            className={
              "cursor-pointer relative bg-green-500 p-2 h-10 w-10 rounded-full ring-green-300 transition-all shadow-xl opacity-90 hover:opacity-100"
            }
          >
            <PlayIcon className={`text-white h-6 w-6`} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CodeOutput;
