import { useState } from "react";

const Collapsible = ({
  children,
  ExampleContent,
}: {
  children: React.ReactNode;
  ExampleContent: React.ReactNode;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => {
    setIsOpen(!isOpen);
  };

  const toggleSymbol = isOpen ? "🔼" : "🔽";

  return (
    <div
      className={`w-full transition-all duration-200 ${
        isOpen ? "bg-gray-100 shadow-md rounded-xl" : ""
      }`}
    >
      <style jsx>{`
        @keyframes bounceOnce {
          0%,
          20%,
          53%,
          80%,
          100% {
            transform: translate3d(0, 0, 0);
          }
          40%,
          43% {
            transform: translate3d(0, -8px, 0);
          }
          70% {
            transform: translate3d(0, -4px, 0);
          }
          90% {
            transform: translate3d(0, -2px, 0);
          }
        }
        .bounce-once:hover {
          animation: bounceOnce 0.6s ease-in-out;
        }
      `}</style>
      <button
        onClick={toggle}
        className="w-full text-left px-4 py-3 focus:outline-none active:scale-[0.98] transition-transform duration-150 bounce-once"
      >
        <div className="flex justify-between items-center">
          <span className="font-medium">{children}</span>
          <span>{toggleSymbol}</span>
        </div>
      </button>

      {isOpen && (
        <div className="pl-6 pr-4 pb-4 border-l-4 border-blue-400">
          {ExampleContent}
        </div>
      )}
    </div>
  );
};

export default Collapsible;
