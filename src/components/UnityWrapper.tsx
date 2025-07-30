"use client";
import { ErrorBoundary } from "next/dist/client/components/error-boundary";
import { useEffect, useMemo, useState } from "react";
import { Unity, useUnityContext } from "react-unity-webgl";

export default function UnityGame({ projectName }: { projectName: string }) {
  const { unityProvider, unload, isLoaded, loadingProgression } =
    useUnityContext({
      loaderUrl: `/interactive-lessons/unity-builds/${projectName}/app.loader.js`,
      dataUrl: `/interactive-lessons/unity-builds/${projectName}/app.data.unityweb`,
      frameworkUrl: `/interactive-lessons/unity-builds/${projectName}/app.framework.js.unityweb`,
      codeUrl: `/interactive-lessons/unity-builds/${projectName}/app.wasm.unityweb`,
    });
  const messages = [
    "Loading Assets...",
    "Configuring Window...",
    "Preparing Module...",
    "Adjusting Settings...",
    "Adding Finishing Touches...",
  ];
  const maxMessageIndex = messages.length - 1;
  const timeForMessages = 12000; // Have the messages load in over 12 seconds.
  const [messageIndex, setMessageIndex] = useState(0);

  const percentage = useMemo(() => {
    const percentageToNinety = Math.min(loadingProgression, 0.9);
    const percentagePastNinety = (0.09 * messageIndex) / maxMessageIndex;
    return Math.round((percentageToNinety + percentagePastNinety) * 100);
  }, [loadingProgression, messageIndex]);

  useEffect(() => {
    let index = messageIndex;
    const interval = setInterval(() => {
      // Increment messages
      index += 1;
      setMessageIndex(index);
      // If done, stop...
      if (index == maxMessageIndex) {
        clearInterval(interval);
      }
    }, timeForMessages / maxMessageIndex);
    return () => {
      clearInterval(interval);
    };
  }, []);

  function Loading() {
    if (isLoaded === true) {
      return <></>;
    }

    return (
      <div className="top-[30svh] m-20 bg-gray-200 rounded-full h-8 dark:bg-gray-700 relative overflow-hidden">
        <div
          className="bg-gradient-to-r from-blue-500 to-cyan-400 h-8 rounded-full"
          style={{
            width: `${percentage}%`,
            transition: "width 0.5s ease-in-out",
          }}
        />

        <div className="absolute inset-0 flex items-center justify-center">
          <span className="font-bold text-white text-shadow">
            {messages[messageIndex]}
          </span>
        </div>
      </div>
    );
  }

  return (
    <ErrorBoundary errorComponent={undefined}>
      <Loading></Loading>
      <Unity
        unityProvider={unityProvider}
        style={{ width: "100%", height: "calc(100svh - 100px)" }}
      />
    </ErrorBoundary>
  );
}
