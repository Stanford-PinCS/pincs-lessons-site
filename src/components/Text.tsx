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

export default function Text({ children }: { children: string | string[] }) {
  const [html, setHtml] = useState<string>("");
  const text = typeof children === "string" ? children : children.join("");

  useEffect(() => {
    const renderer = {
      codespan({ text }: { text: string }) {
        return ReactDOMServer.renderToStaticMarkup(<Code>{text}</Code>);
      },
      code({ text }: { text: string }) {
        return ReactDOMServer.renderToStaticMarkup(
          <pre>
            <Code>{text}</Code>
          </pre>
        );
      },
      text({ text }: { text: string }) {
        const replaced = text.replace(/\$(.+?)\$/g, (latex, insides) => {
          try {
            katex.renderToString(insides, { throwOnError: true }); // Tries to parse it, throwing error if invalid.

            // The following will also parse it, but won't give us the error:
            return ReactDOMServer.renderToStaticMarkup(
              <ReactKatex>{latex}</ReactKatex>
            );
          } catch (e) {
            return "Error with your LaTeX";
          }
        });
        return replaced;
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
