import React from "react";
import Text from "@/components/Text";

export default function ResponsiveImage({
  src,
  alt,
  aspectRatio,
  widthMode,
  captionMode,
}: {
  src: string;
  alt: string;
  aspectRatio: string;
  widthMode: "half" | "full";
  captionMode: boolean;
}) {
  let aspectRatioClass = "";
  switch (aspectRatio) {
    case "16/9":
      aspectRatioClass = "aspect-video";
      break;
    case "4/3":
      aspectRatioClass = "aspect-[4/3]";
      break;
    case "1/1":
      aspectRatioClass = "aspect-square";
      break;
    default:
      aspectRatioClass = "aspect-auto";
  }

  // Add mx-auto to center the image horizontally when in half-width mode
  const widthClass = widthMode === "half" ? "w-1/2 mx-auto" : "w-full";

  return (
    <div className={widthClass}>
      <img
        src={src}
        alt={alt}
        className={`${aspectRatioClass} w-full object-cover`}
      />
      {captionMode && <div className="text-center text-sm">{alt}</div>}
    </div>
  );
}
