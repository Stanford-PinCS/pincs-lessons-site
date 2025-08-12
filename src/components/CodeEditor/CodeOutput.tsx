import { CommandLineIcon } from "@heroicons/react/24/outline";
import { PlayIcon } from "@heroicons/react/24/solid";
import classNames from "classnames";
import { useEffect, useRef, useState } from "react";
import { ConsoleOutput } from "./ConsoleOutput";
import { ConsoleMessage, JSRuntime } from "./runtimes/JSRuntime";
import { observer } from "mobx-react-lite";

const loadPluginImplementation = async (pluginId: string): Promise<string> => {
  let manifest: any;
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_PLUGINS_URL}/plugins-manifest.json`
    );
    if (!res.ok) throw new Error(`API error: ${res.statusText}`);
    manifest = await res.json();
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error(
      `Failed to load plugins from ${process.env.NEXT_PUBLIC_PLUGINS_URL}`,
      e
    );
    return "";
  }
  const implementationURL = manifest[pluginId]?.BasicJS.implUrl;
  if (!implementationURL) return "";
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_PLUGINS_URL}${implementationURL}`
    );
    if (!res.ok) throw new Error(`Failed to fetch ${name}: ${res.statusText}`);

    return res.text();
  } catch (e) {
    console.error(
      `Failed to load implementation from ${process.env.NEXT_PUBLIC_PLUGINS_URL}`,
      e
    );
    return "";
  }
};

export const CodeOutput = observer(
  ({ pluginId, userCode }: { pluginId: string; userCode: string }) => {
    const [showConsole, setShowConsole] = useState(false);
    const iframeRef = useRef<HTMLIFrameElement>(null);
    const jsRuntimeRef = useRef<JSRuntime>(null);
    const [consoleMessages, setConsoleMessages] = useState<ConsoleMessage[]>(
      []
    );
    const [implementation, setImplementation] = useState<string | undefined>(
      undefined
    );
    useEffect(() => {
      loadPluginImplementation(pluginId).then((c) => {
        setImplementation(c);
      });
    }, [pluginId]);

    const hasConsoleError = consoleMessages.some((m) => m.logType === "error");
    return (
      <div className="w-full h-full relative flex flex-col">
        <div
          ref={iframeRef}
          className={classNames("grow", showConsole && "hidden")}
        >
          <iframe
            ref={(iframe) => {
              if (!iframe) return;
              jsRuntimeRef.current = new JSRuntime((message) => {
                iframe.contentWindow?.postMessage(message, "*");
                if (message.type === "log") {
                  setConsoleMessages((consoleMessages) => [
                    ...consoleMessages,
                    message,
                  ]);
                }
              });
            }}
            className="h-full w-full"
            src={`${process.env.NEXT_PUBLIC_PLUGINS_URL}/embed/${pluginId}`}
          />
        </div>
        {showConsole && (
          <div className="grow bg-slate-900">
            <ConsoleOutput outputLines={consoleMessages} />
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
            {consoleMessages.length > 0 && (
              <div
                className={classNames(
                  "absolute -top-1 -right-1 h-4 w-4 rounded-full",
                  hasConsoleError ? "bg-red-500" : "bg-blue-500"
                )}
              />
            )}
          </div>
          <div className="ml-auto flex flex-row gap-1 items-end">
            <div
              id="play"
              onClick={() => {
                setConsoleMessages([]);
                setShowConsole(false);
                jsRuntimeRef.current?.startExecution(
                  userCode,
                  implementation ?? ""
                );
              }}
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
  }
);

export default CodeOutput;
