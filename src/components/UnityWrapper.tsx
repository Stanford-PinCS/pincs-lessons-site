"use client";
import { Unity, useUnityContext } from "react-unity-webgl";

export default function UnityGame({ projectName }: { projectName: string }) {
  const { unityProvider, isLoaded, loadingProgression } = useUnityContext({
    loaderUrl: `/interactive-lessons/unity-builds/${projectName}/app.loader.js`,
    dataUrl: `/interactive-lessons/unity-builds/${projectName}/app.data.unityweb`,
    frameworkUrl: `/interactive-lessons/unity-builds/${projectName}/app.framework.js.unityweb`,
    codeUrl: `/interactive-lessons/unity-builds/${projectName}/app.wasm.unityweb`,
  });

  function Loading() {
    if (isLoaded === true) {
      return <></>;
    }
    return <>We're {loadingProgression} loaded</>;
  }

  return (
    <>
      <Loading></Loading>
      <Unity
        unityProvider={unityProvider}
        style={{ width: "100%", height: "calc(100svh - 100px)" }}
      />
    </>
  );
}
