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
      <button
        className="cursor-pointer text-left"
        style={{
          border: "1px solid #e0e0e0",
          padding: "10px",
          width: "100%",
          textAlign: "left",
        }}
        onClick={toggle}
      >
        {children} {toggleSymbol}
        {isOpen && (
          <div>
            <div style={{ paddingLeft: "1rem", marginBottom: "1rem" }}>
              {ExampleContent}
            </div>
          </div>
        )}
      </button>
    </div>
  );
};

export default Collapsible;
