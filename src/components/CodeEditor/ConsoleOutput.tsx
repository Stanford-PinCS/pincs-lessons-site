export const ConsoleOutput = ({ outputLines }: { outputLines: string[] }) => {
  return (
    <div className="h-full flex-col grow shrink p-1">
      {outputLines.map((line: string, i: number) => {
        return (
          <div
            className={`w-full px-2 mr-1 bg-slate-900 place-self-end`}
            key={`${i}`}
          >
            <pre className={`font-mono w-fit output-line text-slate-100`}>
              {line}
            </pre>
          </div>
        );
      })}
    </div>
  );
};
