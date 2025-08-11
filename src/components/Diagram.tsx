import React, { useState, useEffect, useRef, useMemo } from "react";
import DOMPurify from "dompurify";
import ColorBox from "./ColorBox";
import Text from "./Text";
import path from "path";
import { usePathname } from "next/navigation";
import ErrorMessage from "./ErrorMessage";

export interface DiagramProps {
  title: string;
  svg: string;
  actions?: {
    svgElementId: string;
    description: string;
  }[];
}

export function Diagram({ title, svg, actions = [] }: DiagramProps) {
  const [selectedDescription, setSelectedDescription] = useState<string | null>(
    null
  );
  const svgContainerRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  // Get a clean SVG.
  const sanitizedSvg = useMemo(() => {
    if (typeof window !== "undefined") {
      return DOMPurify.sanitize(svg, {
        USE_PROFILES: { svg: true, svgFilters: true },
      });
    }
    return svg;
  }, [svg]);

  // Scale the SVG & add action listeners.
  useEffect(() => {
    if (!svgContainerRef.current) return;

    const svgElement = svgContainerRef.current.querySelector("svg");
    if (!svgElement) return;

    const width = svgElement.getAttribute("width");
    const height = svgElement.getAttribute("height");

    if (!svgElement.getAttribute("viewBox") && width && height) {
      svgElement.setAttribute("viewBox", `0 0 ${width} ${height}`);
    }

    svgElement.setAttribute("preserveAspectRatio", "xMidYMid meet");
    svgElement.setAttribute("width", "100%");
    svgElement.setAttribute("height", "100%");
    svgElement.style.width = "100%";
    svgElement.style.height = "auto";

    const actionMap = new Map(
      actions.map((a) => [a.svgElementId, a.description])
    );

    const handleSvgClick = (e: Event) => {
      const target = e.target as HTMLElement;
      const clickableElement = target.closest("[id]") as HTMLElement | null;

      if (clickableElement) {
        const elementId = clickableElement.id;
        if (actionMap.has(elementId)) {
          const newDescription = actionMap.get(elementId)!;
          if (selectedDescription === newDescription) {
            setSelectedDescription(null);
          } else {
            setSelectedDescription(newDescription);
          }
        }
      }
    };

    svgElement.addEventListener("click", handleSvgClick);

    const styleElement = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "style"
    );
    const cssRules = actions
      .map(
        (action) => `#${action.svgElementId}:hover {
        cursor: pointer;
        filter: saturate(1.5);
      }`
      )
      .join("\n");

    styleElement.textContent = cssRules;
    svgElement.appendChild(styleElement);

    return () => {
      svgElement.removeEventListener("click", handleSvgClick);
      if (svgElement.contains(styleElement)) {
        svgElement.removeChild(styleElement);
      }
    };
  }, [sanitizedSvg, actions, selectedDescription]);

  // Check for valid inputs.
  if (title.trim() == "") {
    return <ErrorMessage message={"Please provide an SVG title."} />;
  }
  if (svg.trim() == "") {
    return <ErrorMessage message={"Please provide a valid SVG."} />;
  }

  // Get information toggles.
  const hasActions = actions && actions.length > 0;
  const lessonMakerMode =
    pathname.split("/").includes("lesson-maker") &&
    !pathname.includes("preview");

  // If all's good, show the diagram.
  return (
    <div className="diagram-container my-4">
      <h2 className="text-2xl font-bold text-center mb-6">{title}</h2>
      <div
        className={`flex ${hasActions ? "justify-between" : "justify-center"}`}
      >
        <div className={`w-2/3`}>
          <div
            className={`svg-container w-full h-full ${
              lessonMakerMode ? "scale-50" : ""
            }`}
            ref={svgContainerRef}
            dangerouslySetInnerHTML={{ __html: sanitizedSvg }}
          />
        </div>
        {hasActions && (
          <div className="description-container w-1/3 pl-4 flex flex-col justify-center items-center">
            <ColorBox color="gray">
              {selectedDescription ? (
                <Text>{selectedDescription}</Text>
              ) : (
                <p className="text-gray-500">
                  Click on an element in the diagram to see more.
                </p>
              )}
            </ColorBox>
          </div>
        )}
      </div>
    </div>
  );
}

export default Diagram;
