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

/**
 * This Text component will take in string(s) children representing markdown and display it properly.
 * For example, it uses *, **, `, $, and == to display italicized, bolded, code, LaTeX, and KeyTerm text.
 * Usage: <Text>==Wow==! **This is bold**, `this is code;` and $\pi \approx 3.14$.</Text>
 */
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
        // Replace $____$ with LaTeX.
        const latexed = text.replace(/\$(.+?)\$/g, (latex, insides) => {
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
        // Replace $____$ with LaTeX.
        const keytermed = latexed.replace(/==(.+?)==/g, (_, keyterm) => {
          return ReactDOMServer.renderToStaticMarkup(
            <KeyTerm>{keyterm}</KeyTerm>
          );
        });
        return keytermed;
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
