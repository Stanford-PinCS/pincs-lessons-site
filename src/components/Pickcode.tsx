"use client";

import { usePathname } from "next/navigation";

/**
 * This whole file will be changed into a self-contained Pickcode component,
 * rather than an iframe, so it's all subject to change.
 */
export default function Pickcode({
  name,
  src,
  fullscreen = true,
}: {
  name: string;
  src: string;
  fullscreen?: boolean;
}) {
  // Use path to determine if it's in lesson mode.
  const pathname = usePathname();
  if (src == "" || !pathname.split("/").includes("lesson")) {
    // If not in lesson mode, return place holder.
    return (
      <div className="w-full h-[500px] bg-blue-400 flex items-center justify-center">
        <h1 className="text-white">Pickcode Component Placeholder</h1>
      </div>
    );
  }
  // If not full screen return 500px tall.
  if (!fullscreen) {
    return (
      <iframe
        id={name}
        title={name}
        width="100%"
        height="500px"
        src={src}
      ></iframe>
    );
  }
  // Otherwise, return full height.
  return (
    <iframe
      id={name}
      title={name}
      width="100%"
      style={{ height: "calc(100svh - 100px)" }}
      src={src}
    ></iframe>
  );
}
