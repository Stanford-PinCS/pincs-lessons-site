import ErrorMessage from "./ErrorMessage";

export default function Embed({ src, type }: { src: string; type: string }) {
  if (src == "") {
    return <ErrorMessage message="ERROR: Invalid URL" pulsing={true} />;
  }
  if (type == "youtube") {
    let url = new URL(src);
    url.search = "";
    src = url.toString();
    return (
      <iframe
        width="100%"
        height="500"
        src={src}
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
      ></iframe>
    );
  } else if (type == "openprocessing") {
    if (!src.includes("/embed")) {
      src += (src.endsWith("/") ? "" : "/") + "embed";
    }
    return (
      <iframe
        width="100%"
        height="500"
        src={src}
        title="Processing embed"
      ></iframe>
    );
  }
  return <iframe width="100%" height="500" src={src} title="Embed"></iframe>;
}
