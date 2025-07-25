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
    <div>
      <button className="cursor-pointer text-left" onClick={toggle}>
        {children} {toggleSymbol}
      </button>
      {isOpen && (
        <div>
          <div style={{ paddingLeft: "1rem", marginBottom: "1rem" }}>
            {ExampleContent}
          </div>
        </div>
      )}
    </div>
  );
};

export default Collapsible;
