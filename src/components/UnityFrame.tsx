import { usePathname } from "next/navigation";

export default function UnityFrame({
  projectName,
  fullscreen = true,
}: {
  projectName: string;
  fullscreen?: boolean;
}) {
  // Use path to determine if it's in lesson mode.
  const pathname = usePathname();
  if (projectName == "" || !pathname.split("/").includes("lesson")) {
    // If not in lesson mode, return place holder.
    return (
      <div className="w-full h-[500px] bg-gray-400 flex items-center justify-center">
        <h1 className="text-white">
          Unity Component Placeholder: {projectName}
        </h1>
      </div>
    );
  }
  // If not full screen return 500px tall.
  if (!fullscreen) {
    return (
      <iframe
        id={projectName}
        title={projectName}
        width="100%"
        height="500px"
        src={`./lesson/${projectName}`}
      ></iframe>
    );
  }
  // Otherwise, return full height.
  return (
    <iframe
      id={projectName}
      title={projectName}
      width="100%"
      style={{ height: "calc(100svh - 100px)" }}
      src={`./lesson/${projectName}`}
    ></iframe>
  );
}
