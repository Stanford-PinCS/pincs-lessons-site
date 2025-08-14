import Link from "next/link";
import ErrorMessage from "./ErrorMessage";
import Text from "./Text";

export default function SafeLink({
  text,
  href,
  slide,
}: {
  text: string;
  href: string;
  slide?: number;
}) {
  // Make sure there's text.
  if (text.trim() == "") {
    return <ErrorMessage message="You must have text for a link element." />;
  }
  // Just make a link to a slide.
  if (slide) {
    return (
      <Link className="text-blue-500" href={`?slide=${slide}`} replace={true}>
        <Text>{text}</Text>
      </Link>
    );
  }

  // Make sure we get a good URL.
  let url;
  try {
    if (href.trim() == "") {
      throw new Error("Invalid URL");
    }
    url = new URL(href);
  } catch (e) {
    return <ErrorMessage message={"Invalid URL"} />;
  }

  const whitelist = ["pincs.stanford.edu", "svgplayground.com", "google.com"];
  if (
    whitelist.some((whitelistItem: string) =>
      url?.hostname.endsWith(whitelistItem)
    )
  ) {
    // Return a link to a new tab.
    return (
      <Link
        href={url}
        className="text-blue-500"
        target="_blank"
        rel="noopener noreferrer"
      >
        <Text>{text}</Text>
      </Link>
    );
  }
  return <ErrorMessage message={"That URL is not allowed."} />;
}
