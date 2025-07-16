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
      <button onClick={toggle}>
        {children} {toggleSymbol}
      </button>
      {isOpen && (
        <div>
          <p>{ExampleContent}</p>
        </div>
      )}
    </div>
  );
};

export default Collapsible;
