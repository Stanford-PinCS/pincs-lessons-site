import { JSX } from "react";

const LessonWrapper = ({ children }: { children: JSX.Element }) => {
  return (
    <div className="h-full w-full bg-white text-slate-800 p-8 flex flex-col items-center gap-8">
      {children}
    </div>
  );
};

export default LessonWrapper;
