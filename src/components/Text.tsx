"use client";
import { useEffect, useState } from "react";
import { marked } from "marked";
import DOMPurify from "dompurify";
import ReactDOMServer from "react-dom/server";
import Code from "./Code";
import ReactKatex from "@pkasila/react-katex";
import "katex/dist/katex.min.css";
import katex from "katex";
import React from "react";
import KeyTerm from "./KeyTerm";
import Emphasize from "./Emphasize";

/**
 * This Text component will take in string(s) children representing markdown and display it properly.
 * For example, it uses *, **, `, $, and == to display italicized, bolded, code, LaTeX, and KeyTerm text.
 * Usage: <Text>==Wow==! **This is bold**, `this is code;` and $\pi \approx 3.14$.</Text>
 */
export default function Text({
  children,
}: {
  children: string | string[] | any;
}) {
  const [html, setHtml] = useState<string>("");
  const text = typeof children === "string" ? children : children.join("");

  useEffect(() => {
    const renderer = {
      codespan({ text }: { text: string }) {
        return ReactDOMServer.renderToStaticMarkup(<Code>{text}</Code>);
      },
      code({ text }: { text: string }) {
        return ReactDOMServer.renderToStaticMarkup(<Code>{text}</Code>);
      },
      strong({ text }: { text: string }) {
        return ReactDOMServer.renderToStaticMarkup(
          <Emphasize>{text}</Emphasize>
        );
      },
      text({ text }: { text: string }) {
        const transformed = text.replace(/(\$[^$]+\$|==[^=]+==)/g, (match) => {
          if (match.startsWith("$")) {
            // Replace $____$ with LaTeX.
            const content = match.slice(1, -1);
            try {
              katex.renderToString(content, { throwOnError: true });
              return ReactDOMServer.renderToStaticMarkup(
                <ReactKatex>{match}</ReactKatex>
              );
            } catch {
              return "Error with your LaTeX";
            }
          } else if (match.startsWith("==")) {
            // Replace ==____== with a KeyTerm.
            const content = match.slice(2, -2);
            return ReactDOMServer.renderToStaticMarkup(
              <KeyTerm>{content}</KeyTerm>
            );
          }
          return match;
        });

        return transformed;
      },
    };

    marked.use({ renderer });

    const render = async () => {
      const rawHtml = await marked.parse(text);
      const cleanHtml = DOMPurify.sanitize(rawHtml);
      setHtml(cleanHtml);
    };

    render();
  }, [children]);

  return <div className="text-lg" dangerouslySetInnerHTML={{ __html: html }} />;
}
