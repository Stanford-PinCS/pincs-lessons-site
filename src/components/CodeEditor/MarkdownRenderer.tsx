import {
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@heroicons/react/24/solid";
import { isString } from "lodash-es";
import Markdown, { MarkdownToJSX, RuleType } from "markdown-to-jsx";
import {
  Children,
  FC,
  PropsWithChildren,
  ReactElement,
  createContext,
  createElement,
  isValidElement,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import SyntaxHighlighter from "react-syntax-highlighter";
import { monacoThemeToHLJS, VSDarkTheme } from "./VSDarkHLJSTheme";

interface LessonInstructionsContext {
  currentLessonStepIndex: number;
  changeStepIndex: (newIndex: number) => void;
}
const LessonInstructionsContext = createContext<LessonInstructionsContext>({
  currentLessonStepIndex: 0,
  changeStepIndex() {
    throw new Error("Lesson context not set");
  },
});

const MaybeInline: FC<PropsWithChildren> = ({ children }) => {
  const containsText =
    Children.map(children, isString)?.some((t) => t) ?? false;
  if (containsText) {
    return <span>{children}</span>;
  }
  return <>{children}</>;
};

const Slide: FC<PropsWithChildren> = ({ children }) => {
  return (
    <>
      {Children.map(children, (child) => {
        if (isString(child)) {
          return <span>{child}</span>;
        }
        return child ?? null;
      })}
    </>
  );
};

const Step: FC<PropsWithChildren> = ({ children }) => (
  <div className="flex-row flex-grow flex-shrink flex-wrap p-2 rounded-lg border-2 border-slate-300">
    <MaybeInline>{children}</MaybeInline>
  </div>
);

const LinkButton: FC<{ href?: string; text?: string }> = ({ href, text }) => (
  <a
    href={href}
    className="w-fit mx-2 rounded-lg"
    // todo: button styling
  >
    {text}
  </a>
);

const Collapsible: FC<PropsWithChildren<{ title?: string }>> = ({
  title,
  children,
}) => {
  const [collapsed, setCollapsed] = useState(true);

  return (
    <div className="flex-col flex-grow flex-shrink">
      <div
        onClick={() => setCollapsed(!collapsed)}
        className={`w-fit cursor-pointer flex items-center gap-1 px-2 py-1 border-2 border-indigo-500 rounded-lg hover:bg-slate-100`}
      >
        <div className="flex-row items-center">
          <span className="font-bold text-sm text-indigo-500">{title}</span>
          <span>
            {collapsed ? (
              <ChevronRightIcon className="ml-1 h-4 text-indigo-500" />
            ) : (
              <ChevronDownIcon className="ml-1 h-4 text-indigo-500" />
            )}
          </span>
        </div>
      </div>
      {!collapsed && <Step>{children}</Step>}
    </div>
  );
};

const InstructionsMarkdownRenderer: FC<PropsWithChildren> = ({ children }) => {
  const childSlides = useMemo(() => {
    let unwrappedElements: any[] = [];
    const slides: ReactElement[] = [];
    Children.forEach(children, (child) => {
      if (isValidElement(child) && child.type === Slide) {
        if (unwrappedElements.length > 0) {
          slides.push(<Slide>{unwrappedElements}</Slide>);
          unwrappedElements = [];
        }
        slides.push(child);
      } else {
        unwrappedElements.push(child);
      }
    });
    if (unwrappedElements.length > 0) {
      slides.push(<Slide>{unwrappedElements}</Slide>);
    }
    return slides;
  }, [children]);

  const { currentLessonStepIndex, changeStepIndex } = useContext(
    LessonInstructionsContext
  );
  const currentIndex = Math.max(
    0,
    Math.min(currentLessonStepIndex, childSlides.length - 1)
  );

  const instructionsContainerRef = useRef<HTMLDivElement>(null);

  const [hasScrolled, setHasScrolled] = useState(false);

  useEffect(() => {
    instructionsContainerRef.current?.scrollTo({
      top: 0,
    });
  }, [currentLessonStepIndex]);

  const changeStepIndexBounded = useCallback(
    (newIndex: number) => {
      changeStepIndex(Math.min(Math.max(newIndex, 0), childSlides.length - 1));
    },
    [changeStepIndex, childSlides.length]
  );

  return (
    <div
      className="flex-col flex-1 h-full rounded-lg bg-white shadow-md overflow-hidden"
      id="instructions-area"
    >
      <div
        ref={instructionsContainerRef}
        className="h-full w-full p-2 overflow-y-scroll"
        onScroll={() => setHasScrolled(true)}
      >
        <div className="flex-col gap-1">{childSlides[currentIndex]}</div>
      </div>
      {childSlides.length > 1 && (
        <div className="mt-auto w-full flex-row justify-between items-center bg-slate-50">
          <div
            onClick={() => changeStepIndexBounded(currentIndex - 1)}
            className={`flex items-center justify-center shadow-none bg-indigo-500 rounded-full h-6 w-6 px-0 py-0 mx-1 ${
              currentIndex === 0 ? "opacity-50" : ""
            }`}
          >
            <ChevronLeftIcon className="h-4 w-4 text-white" />
          </div>
          <div className="grow h-4 rounded-full border-2 border-indigo-500/25 overflow-hidden bg-indigo-100/50">
            <div
              className="h-full bg-indigo-500 transition[width] duration-500"
              style={{
                width: `${Math.max(
                  (currentIndex / (childSlides.length - 1)) * 100,
                  3
                )}%`,
              }}
            ></div>
          </div>
          <div
            onClick={() => changeStepIndexBounded(currentIndex + 1)}
            className={`flex items-center justify-center gap-1 rounded-full h-6 shadow-none bg-indigo-500 mx-1 py-1 pl-2 my-1 ${
              currentIndex === childSlides.length - 1 ? "opacity-50" : ""
            }`}
          >
            <span className="text-white">Next</span>
            <ChevronRightIcon
              id="next-instruction-button"
              className="bg-indigo-500 text-white h-4 w-4 rounded-full"
            />
          </div>
        </div>
      )}
    </div>
  );
};

const TextCodeBlock: FC<
  PropsWithChildren<{
    className?: string;
    language?: string;
    fontSize: number;
  }>
> = ({ className = "", language, children, fontSize }) => {
  const contents = useMemo(() => {
    if (isString(children)) {
      return children;
    }
    return "";
  }, [children]);

  // When rendered directly, the language prop can be passed in directly
  // Otherwise, markdown-to-jsx puts the language in a special class name
  // prefixed with lang-, like lang-python or lang-java
  const lang = useMemo(() => {
    if (language) return language;
    return className
      .split(" ")
      .find((cls) => cls.startsWith("lang-"))
      ?.replace("lang-", "")
      .toLowerCase();
  }, [language, className]);

  return (
    <SyntaxHighlighter
      language={lang}
      customStyle={{
        display: "flex",
        borderRadius: "0.5em",
        fontSize,
        lineHeight: 1.25,
      }}
      style={{
        ...(monacoThemeToHLJS(VSDarkTheme) as any),
      }}
      useInlineStyles={true}
    >
      {contents}
    </SyntaxHighlighter>
  );
};

const InlineCode: FC<PropsWithChildren<{ fontSize: number }>> = ({
  children,
  fontSize,
}) => {
  return (
    <span
      className="font-mono bg-slate-100 rounded-md px-1 py-[0.5] border border-slate-200"
      style={{ fontSize }}
    >
      {children}
    </span>
  );
};

const ListItem: FC<
  PropsWithChildren<{
    index: number;
    type: "ordered" | "unordered";
    fontSize: number;
  }>
> = ({ children, type, index, fontSize }) => {
  if (type === "unordered") {
    return <span style={{ fontSize }}>• {children}</span>;
  }
  return (
    <span style={{ fontSize }}>
      {index + 1}. {children}
    </span>
  );
};
const UnorderedList: FC<PropsWithChildren<{ fontSize: number }>> = ({
  children,
  fontSize,
}) => {
  return (
    <div className="w-full flex flex-col gap-1">
      {Children.map(children, (child, index) => (
        <ListItem index={index} type="unordered" fontSize={fontSize}>
          {child}
        </ListItem>
      ))}
    </div>
  );
};
const OrderedList: FC<PropsWithChildren<{ fontSize: number }>> = ({
  children,
  fontSize,
}) => {
  return (
    <div className="w-full flex flex-col gap-1">
      {Children.map(children, (child, index) => (
        <ListItem index={index} type="ordered" fontSize={fontSize}>
          {child}
        </ListItem>
      ))}
    </div>
  );
};

const forceAbsoluteUrl = (rawUrl: string): string => {
  try {
    // Just construct to see if it throws an exception, which will
    // happen for URLs without a protocol, like google.com
    new URL(rawUrl);
    return rawUrl;
  } catch (e) {
    // Add protocol; otherwise urls will be treated relative to our
    // website, which is probably not what the user wants
    return `https://${rawUrl}`;
  }
};

const markdownToJSXOverrides = (fontSize: number): MarkdownToJSX.Overrides => ({
  Slide,
  Step,
  Button: LinkButton,
  Collapsible,
  // block elements need w-full to take up space properly
  p: ({ ...rest }) => (
    <span className={`w-full align-middle`} style={{ fontSize }} {...rest} />
  ),
  span: <span style={{ fontSize }} />,
  strong: ({ ...rest }) => (
    <span className={"font-bold"} style={{ fontSize }} {...rest} />
  ),
  em: ({ ...rest }) => (
    <span className={"italic"} style={{ fontSize }} {...rest} />
  ),
  br: () => <br style={{ fontSize }} />,
  h1: ({ ...rest }) => (
    <h1
      className={"text-4xl w-full font-bold"}
      style={{ fontSize: fontSize * 2.25 }}
      {...rest}
    />
  ),
  h2: ({ ...rest }) => (
    <h2
      className={"text-3xl w-full font-bold"}
      style={{ fontSize: fontSize * 1.875 }}
      {...rest}
    />
  ),
  h3: ({ ...rest }) => (
    <h3
      className={"text-2xl w-full font-bold"}
      style={{ fontSize: fontSize * 1.5 }}
      {...rest}
    />
  ),
  h4: ({ ...rest }) => (
    <h4
      className={"text-xl w-full font-bold"}
      style={{ fontSize: fontSize * 1.25 }}
      {...rest}
    />
  ),
  h5: ({ ...rest }) => (
    <h5
      className={"text-lg w-full font-bold"}
      style={{ fontSize: fontSize * 1.125 }}
      {...rest}
    />
  ),
  h6: ({ ...rest }) => (
    <h6
      className={"text-base w-full font-bold"}
      style={{ fontSize }}
      {...rest}
    />
  ),
  a: ({ href, ...props }) => {
    return (
      <a
        className={"underline text-blue-500"}
        style={{ fontSize, lineHeight: 1.125 }}
        {...props}
        href={forceAbsoluteUrl(href)}
        target="_blank"
      />
    );
  },
  code: ({ fontSize }) => {
    return <TextCodeBlock fontSize={fontSize} />;
  },
  ul: (props) => <UnorderedList fontSize={fontSize} {...props} />,
  ol: (props) => <OrderedList fontSize={fontSize} {...props} />,
  li: ({ children, ...props }) => (
    <span style={{ fontSize }} {...props}>
      {children}
    </span>
  ),
  img: ({ src, ...rest }) => {
    return <img src={src} {...rest} />;
  },
});

const FONT_SIZE = 12;

export const MDXRenderer = ({
  mdxText,
  additionalOverrides,
  showDetailedParsingErrors = false,
}: {
  mdxText: string;
  additionalOverrides?: MarkdownToJSX.Overrides;
  showDetailedParsingErrors?: boolean;
}) => {
  const overrides = useMemo(
    () => ({
      ...markdownToJSXOverrides(FONT_SIZE),
      ...additionalOverrides,
    }),
    [additionalOverrides, FONT_SIZE]
  );

  // TODO: comment explaining why
  const mdxToDisplay = useMemo(() => {
    return mdxText.replaceAll(/Step>\n\n+/g, "Step>\n");
  }, [mdxText]);

  return (
    <Markdown
      children={mdxToDisplay}
      options={{
        wrapper: InstructionsMarkdownRenderer,
        forceWrapper: true,
        overrides,
        createElement(tag: any, props: any, ...children: any[]) {
          return createElement(tag, props, ...children);
        },

        // This runs before createElement, we override a couple because
        // it's easier than managing nested components that otherwise
        // get generated
        renderRule(next: any, node: any, renderChildren: any, state: any) {
          if (node.type === RuleType.codeBlock) {
            return (
              <TextCodeBlock language={node.lang} key={state.key} fontSize={12}>
                {node.text}
              </TextCodeBlock>
            );
          }
          if (node.type === RuleType.codeInline) {
            return (
              <InlineCode key={state.key} fontSize={12}>
                {node.text}
              </InlineCode>
            );
          }
          return next();
        },
      }}
    />
  );
};

const InstructionsRenderer = ({
  instructionsText,
  changeStep,
  currentLessonStepId,
}: {
  instructionsText: string;
  currentLessonStepId?: string;
  changeStep: (newStepId: string) => void;
}) => {
  const currentLessonStepIndex = useMemo(() => {
    const index = parseInt(currentLessonStepId ?? "");
    // old-style indices were ids, so these out-of-bounds values could happen
    // if those ids happen to parse as ints. We're gambling that no lessons
    // have more than 50 slides
    if (!index || index < 0 || index > 50) {
      return 0;
    }
    return index;
  }, [currentLessonStepId]);

  const changeStepIndex = useCallback(
    (newIndex: number) => {
      changeStep(`${newIndex}`);
    },
    [changeStep]
  );

  const context: LessonInstructionsContext = useMemo(
    () => ({
      currentLessonStepIndex,
      changeStepIndex,
    }),
    [currentLessonStepIndex, changeStepIndex]
  );

  const overrides = useMemo(() => {
    return markdownToJSXOverrides(FONT_SIZE);
  }, [FONT_SIZE]);

  return (
    <LessonInstructionsContext.Provider value={context}>
      <MDXRenderer mdxText={instructionsText} additionalOverrides={overrides} />
    </LessonInstructionsContext.Provider>
  );
};

export default InstructionsRenderer;
