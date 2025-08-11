import { memo } from "react";
import Emphasize from "./Emphasize";
import ErrorMessage from "./ErrorMessage";
import DOMPurify from "dompurify";

const SVG = memo(function ({ svg }: { svg: string }) {
  // Make sure it's a friendly SVG.
  const sanitizedHtml = DOMPurify.sanitize(svg, {
    USE_PROFILES: { svg: true },
    FORBID_TAGS: ["foreignObject", "script", "iframe"],
    FORBID_ATTR: ["onload", "onerror", "onclick", "xlink:href", "href"],
  });

  return <div dangerouslySetInnerHTML={{ __html: sanitizedHtml }} />;
});

export default function Diagram({
  title,
  svg,
}: {
  title: string;
  svg: string;
}) {
  if (title.trim() == "") {
    return (
      <ErrorMessage
        message={"You must have a title on your SVG."}
        pulsing={true}
      ></ErrorMessage>
    );
  }
  if (svg.trim() == "") {
    return (
      <ErrorMessage
        message={"You must have a valid SVG."}
        pulsing={true}
      ></ErrorMessage>
    );
  }

  return (
    <div>
      <div>
        <Emphasize>{title}</Emphasize>
      </div>
      <SVG svg={svg} />
    </div>
  );
}
