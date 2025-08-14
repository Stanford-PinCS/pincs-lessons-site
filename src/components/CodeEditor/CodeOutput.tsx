/**
 * Handles displaying the plugin and sending messages to it
 * Plugins are rendered in iframe
 * Initializes a JSRuntime and tells it to execute when play is clicked
 * All messages from user code are routed to iframe, all console logs are displayed in here
 */

import { CommandLineIcon } from "@heroicons/react/24/outline";
import { PlayIcon } from "@heroicons/react/24/solid";
import classNames from "classnames";
import { useEffect, useRef, useState } from "react";
import { ConsoleOutput } from "./ConsoleOutput";
import { JSRuntime } from "./runtimes/JSRuntime";
import { PyRuntime } from "./runtimes/PyRuntime";
import { observer } from "mobx-react-lite";
import { ConsoleMessage, Runtime } from "./runtimes/Runtime";

const loadPluginImplementationCode = async (
  pluginId: string
): Promise<string> => {
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
  ({
    pluginId,
    userCode,
    language,
  }: {
    pluginId: string;
    userCode: string;
    language: "python" | "javascript";
  }) => {
    const [showConsole, setShowConsole] = useState(false);
    const iframeRef = useRef<HTMLIFrameElement>(null);
    const runtimeRef = useRef<Runtime>(null);
    const [consoleMessages, setConsoleMessages] = useState<ConsoleMessage[]>(
      []
    );
    const [pluginImplementationCode, setPluginImplementationCode] = useState<
      string | undefined
    >(undefined);
    useEffect(() => {
      loadPluginImplementationCode(pluginId).then((c) => {
        setPluginImplementationCode(c);
      });
    }, [pluginId]);

    const hasConsoleError = consoleMessages.some((m) => m.logType === "error");
    return (
      <div className="w-full h-full flex flex-col">
        <div
          ref={iframeRef}
          className={classNames("grow", showConsole && "hidden")}
        >
          <iframe
            ref={(iframe) => {
              if (!iframe || runtimeRef.current) return;
              // Define onmessage for any runtime.
              const onMessage = (message: any) => {
                iframe.contentWindow?.postMessage(message, "*");
                if (message.type === "log") {
                  setConsoleMessages((consoleMessages) => [
                    ...consoleMessages,
                    message,
                  ]);
                }
              };
              // Make proper runtime based on language.
              switch (language) {
                case "javascript":
                  runtimeRef.current = new JSRuntime(onMessage);
                  break;
                case "python":
                  runtimeRef.current = new PyRuntime(onMessage);
                  break;
                default:
                  throw new Error("Invalid language!");
              }
            }}
            className="h-full w-full"
            src={`${process.env.NEXT_PUBLIC_PLUGINS_URL}/embed/${pluginId}`}
          />
        </div>
        {showConsole && (
          <div className="grow bg-slate-900 overflow-y-scroll">
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
                runtimeRef.current?.startExecution(
                  userCode,
                  pluginImplementationCode ?? ""
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
