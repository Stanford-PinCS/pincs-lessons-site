import { useState } from "react";
import { Slide } from "./page";
import { Render } from "@measured/puck";
import { config } from "./puck.config";

export default function SlideReorderView({
  slides,
  setSlides,
  setCurrentSlideIndex,
  setIsEditing,
}: {
  slides: Slide[];
  setSlides: Function;
  setCurrentSlideIndex: Function;
  setIsEditing: Function;
}) {
  const [orderedSlides, setOrderedSlides] = useState(slides);
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const handleDragStart = (
    e: React.DragEvent<HTMLDivElement>,
    index: number
  ) => {
    setDraggedIndex(index);
    e.dataTransfer.effectAllowed = "move";
  };

  const handleDragOver = (
    e: React.DragEvent<HTMLDivElement>,
    index: number
  ) => {
    e.preventDefault();
    if (draggedIndex === null || draggedIndex === index) return;

    const newSlides = [...orderedSlides];
    const [draggedSlide] = newSlides.splice(draggedIndex, 1);
    newSlides.splice(index, 0, draggedSlide);

    setOrderedSlides(newSlides);
    setDraggedIndex(index);
  };

  const handleDragEnd = () => {
    setDraggedIndex(null);
  };

  const handleDone = () => {
    setSlides(orderedSlides);
    setCurrentSlideIndex(selectedIndex || 0);
    setIsEditing(false);
  };

  const handleDuplicate = (index: number) => {
    const newSlide = { ...orderedSlides[index], id: Date.now() };
    const newSlides = [...orderedSlides];
    newSlides.splice(index + 1, 0, newSlide);
    setOrderedSlides(newSlides);
  };

  const handleDelete = (index: number) => {
    if (orderedSlides.length > 1) {
      const newSlides = orderedSlides.filter((_, i) => i !== index);
      setOrderedSlides(newSlides);
    }
  };

  const slideClick = (index: number) => {
    if (selectedIndex === index) {
      handleDone(); // Go view that slide.
    } else {
      setSelectedIndex(selectedIndex === index ? null : index); // Select the new slide.
    }
  };

  return (
    <div className="p-4 bg-gray-100 flex-grow overflow-y-auto">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-gray-800">Reorder Slides</h2>
          <button
            onClick={handleDone}
            className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Done
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {orderedSlides.map((slide, index) => (
            <div
              key={slide.id}
              draggable
              onDragStart={(e) => handleDragStart(e, index)}
              onDragOver={(e) => handleDragOver(e, index)}
              onDragEnd={handleDragEnd}
              onClick={() => slideClick(index)}
              className={`p-4 bg-white rounded-lg shadow-md flex flex-col gap-4 transition-all duration-200 cursor-pointer relative ${
                draggedIndex === index
                  ? "opacity-50 scale-95 shadow-2xl"
                  : "hover:shadow-lg"
              } ${
                selectedIndex === index
                  ? "border-blue-500 ring-2 ring-blue-500"
                  : ""
              }`}
            >
              <div className="font-bold text-lg text-gray-600">
                Slide {index + 1}
              </div>
              {selectedIndex === index && (
                <div className="absolute top-4 right-4 flex gap-2">
                  <button
                    onClick={() => handleDuplicate(index)}
                    className="px-2 py-1 bg-blue-500 text-white rounded-md text-md"
                  >
                    Duplicate
                  </button>
                  <button
                    onClick={() => handleDelete(index)}
                    className="px-2 py-1 bg-red-500 text-white rounded-md text-md"
                  >
                    Delete
                  </button>
                </div>
              )}
              <div className="aspect-square w-full border rounded-md overflow-hidden bg-gray-50">
                <div className="pointer-events-none transform scale-[0.3] origin-top-left w-[400%] h-[400%]">
                  <Render config={config} data={slide.data} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
