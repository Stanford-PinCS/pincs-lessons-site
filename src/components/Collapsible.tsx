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
      <button
        onClick={toggle}
        className="w-full text-left px-4 py-3 focus:outline-none active:scale-[0.98] transition-transform duration-150 hover:animate-[smoothBounce_0.6s_ease-out]"
        style={{
          animationFillMode: "forwards",
        }}
      >
        <style jsx>{`
          @keyframes smoothBounce {
            0% {
              transform: translateY(0);
            }
            50% {
              transform: translateY(-6px);
            }
            100% {
              transform: translateY(0);
            }
          }
        `}</style>
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
