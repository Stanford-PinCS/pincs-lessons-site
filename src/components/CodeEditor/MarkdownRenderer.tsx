// import {
//   ArrowDownCircleIcon,
//   ChevronDownIcon,
//   ChevronLeftIcon,
//   ChevronRightIcon,
// } from "@heroicons/react/24/solid";
// import { PCFileType } from "@pickcode/shared";
// import { isString } from "lodash-es";
// import Markdown, { MarkdownToJSX, RuleType } from "markdown-to-jsx";
// import { observer } from "mobx-react-lite";
// import {
//   Children,
//   FC,
//   Fragment,
//   PropsWithChildren,
//   ReactElement,
//   createContext,
//   createElement,
//   isValidElement,
//   useCallback,
//   useContext,
//   useEffect,
//   useMemo,
//   useRef,
//   useState,
// } from "react";
// import SyntaxHighlighter from "react-syntax-highlighter";

// import { PreferencesContext } from "~/PreferencesContext";
// import {
//   AccessControlsContext,
//   AccessType,
// } from "~/accessControls/AccessControls";
// import { PCFile } from "~/models/Project/PCFile";
// import {
//   H1,
//   H2,
//   H3,
//   H4,
//   H5,
//   H6,
//   MonospaceText,
//   Pressable,
//   ScrollView,
//   Text,
//   View,
// } from "~/react-native";
// import Catch from "~/utils/Catch";
// import { ColorTheme, Intent, Size } from "~/utils/ThemeEnums";
// import { tailwindClassNames } from "~/utils/genericUtils";
// import { vlModelFromText } from "~/visualLanguage/statementParser";
// import Button from "../Basics/Button";
// import { Checkbox } from "../Checkbox/Checkbox";
// import Block from "../Code/Block";
// import { keypadButtons } from "../Code/Keypad";
// import { GrabHandle, StatementPlusButton } from "../Code/Statement";
// import { ThemeContext } from "../ProjectEditor/EditorThemeContext";
// import { ProjectContext } from "../ProjectEditor/ProjectContext";
// import {
//   MonacoThemeNameToTheme,
//   monacoThemeToHLJS,
// } from "../ProjectEditor/SyntaxHighlightingThemes";

// interface LessonInstructionsContext {
//   currentLessonStepIndex: number;
//   changeStepIndex: (newIndex: number) => void;
// }
// const LessonInstructionsContext = createContext<LessonInstructionsContext>({
//   currentLessonStepIndex: 0,
//   changeStepIndex() {
//     throw new Error("Lesson context not set");
//   },
// });

// const MaybeInline: FC<PropsWithChildren> = ({ children }) => {
//   const containsText =
//     Children.map(children, isString)?.some((t) => t) ?? false;
//   if (containsText) {
//     return <Text>{children}</Text>;
//   }
//   return <>{children}</>;
// };

// const Slide: FC<PropsWithChildren> = ({ children }) => {
//   return (
//     <>
//       {Children.map(children, (child) => {
//         if (isString(child)) {
//           return <Text>{child}</Text>;
//         }
//         return child ?? null;
//       })}
//     </>
//   );
// };

// const Step: FC<PropsWithChildren> = ({ children }) => (
//   <View className="flex-row flex-grow flex-shrink flex-wrap p-2 rounded-lg border-2 border-slate-300">
//     <MaybeInline>{children}</MaybeInline>
//   </View>
// );

// const LinkButton: FC<{ href?: string; text?: string }> = ({ href, text }) => (
//   <Button
//     intent={Intent.Primary}
//     text={text}
//     href={href}
//     size={Size.Big}
//     className="w-fit mx-2 rounded-lg"
//   />
// );

// const CompleteLessonBox: FC<{ text?: string }> = ({ text }) => {
//   const project = useContext(ProjectContext);

//   return (
//     <View className="flex-row items-center p-2">
//       <Checkbox
//         checked={project.hasCompletedLesson}
//         onChange={(v) => {
//           project.setHasCompletedLesson(v);
//         }}
//       />
//       <Text> {text}</Text>
//     </View>
//   );
// };

// const Icon: FC<{ type?: string }> = ({ type }) => {
//   if (!type) return null;
//   if (type in keypadButtons) {
//     const Component = keypadButtons[type as keyof typeof keypadButtons];
//     return (
//       <Component className="inline-flex items-center rounded-md border-[1px] border-slate-200" />
//     );
//   }
//   if (type === "grab") {
//     return (
//       <GrabHandle
//         className="inline-flex items-center bg-slate-700"
//         readonly={true}
//       />
//     );
//   }
//   if (type === "statementPlus") {
//     return (
//       <StatementPlusButton
//         className="inline-flex items-center"
//         disabled={true}
//         label="add statement"
//       />
//     );
//   }
//   return null;
// };

// const VLStatement: FC<{ type?: string }> = ({ type }) => (
//   <Text className="text-base font-mono p-1.5 bg-slate-700 rounded-lg text-purple-400 border border-slate-500 focus:ring-2 focus:ring-indigo-500">
//     {type}
//   </Text>
// );

// const Collapsible: FC<PropsWithChildren<{ title?: string }>> = ({
//   title,
//   children,
// }) => {
//   const [collapsed, setCollapsed] = useState(true);

//   return (
//     <View className="flex-col flex-grow flex-shrink">
//       <Button
//         onClick={() => setCollapsed(!collapsed)}
//         className={`w-fit cursor-pointer flex items-center gap-1 px-2 py-1 border-2 border-indigo-500 rounded-lg hover:bg-slate-100`}
//         intent={Intent.Custom}
//       >
//         <View className="flex-row items-center">
//           <Text className="font-bold text-sm text-indigo-500">{title}</Text>
//           <Text>
//             {collapsed ? (
//               <ChevronRightIcon className="ml-1 h-4 text-indigo-500" />
//             ) : (
//               <ChevronDownIcon className="ml-1 h-4 text-indigo-500" />
//             )}
//           </Text>
//         </View>
//       </Button>
//       {!collapsed && <Step>{children}</Step>}
//     </View>
//   );
// };

// const InstructionsMarkdownRenderer: FC<PropsWithChildren> = ({ children }) => {
//   const childSlides = useMemo(() => {
//     let unwrappedElements: any[] = [];
//     const slides: ReactElement[] = [];
//     Children.forEach(children, (child) => {
//       if (isValidElement(child) && child.type === Slide) {
//         if (unwrappedElements.length > 0) {
//           slides.push(<Slide>{unwrappedElements}</Slide>);
//           unwrappedElements = [];
//         }
//         slides.push(child);
//       } else {
//         unwrappedElements.push(child);
//       }
//     });
//     if (unwrappedElements.length > 0) {
//       slides.push(<Slide>{unwrappedElements}</Slide>);
//     }
//     return slides;
//   }, [children]);

//   const { currentLessonStepIndex, changeStepIndex } = useContext(
//     LessonInstructionsContext
//   );
//   const currentIndex = Math.max(
//     0,
//     Math.min(currentLessonStepIndex, childSlides.length - 1)
//   );

//   const instructionsContainerRef = useRef<ScrollView>(null);
//   const [instructionContainerHeight, setInstructionContainerHeight] =
//     useState(0);
//   const [instructionContentHeight, setInstructionContentHeight] = useState(0);

//   const hasScrollbar = useMemo(() => {
//     return instructionContentHeight > instructionContainerHeight;
//   }, [instructionContainerHeight, instructionContentHeight]);

//   const [hasScrolled, setHasScrolled] = useState(false);

//   useEffect(() => {
//     instructionsContainerRef.current?.scrollTo({
//       y: 0,
//       animated: false,
//     });
//   }, [currentLessonStepIndex]);

//   const changeStepIndexBounded = useCallback(
//     (newIndex: number) => {
//       changeStepIndex(Math.min(Math.max(newIndex, 0), childSlides.length - 1));
//     },
//     [changeStepIndex, childSlides.length]
//   );

//   return (
//     <View
//       className="flex-col flex-1 h-full rounded-lg bg-white shadow-md overflow-hidden"
//       id="instructions-area"
//     >
//       <ScrollView
//         ref={instructionsContainerRef}
//         className="h-full w-full p-2"
//         onScroll={() => setHasScrolled(true)}
//         scrollEventThrottle={16} // don't fire events too frequently
//         onLayout={({
//           nativeEvent: {
//             layout: { height },
//           },
//         }) => {
//           setInstructionContainerHeight(height);
//         }}
//       >
//         <View
//           className="flex-col gap-1"
//           onLayout={({
//             nativeEvent: {
//               layout: { height },
//             },
//           }) => {
//             setInstructionContentHeight(height);
//           }}
//         >
//           <AccessControlsContext.Provider
//             value={{ accessType: AccessType.Viewer }}
//           >
//             {childSlides[currentIndex]}
//           </AccessControlsContext.Provider>
//         </View>
//         {hasScrollbar && !hasScrolled && (
//           <Pressable
//             className={`absolute right-[calc(50%-12px)]`}
//             style={{
//               top: instructionContainerHeight - 32,
//             }}
//             onPress={() => {
//               instructionsContainerRef.current?.scrollTo(
//                 instructionContentHeight
//               );
//             }}
//           >
//             <ArrowDownCircleIcon className="h-6 w-6 text-slate-400" />
//           </Pressable>
//         )}
//       </ScrollView>
//       {childSlides.length > 1 && (
//         <View className="mt-auto w-full flex-row justify-between items-center bg-slate-50">
//           <Button
//             onClick={() => changeStepIndexBounded(currentIndex - 1)}
//             intent={Intent.Custom}
//             className={`flex items-center justify-center shadow-none bg-indigo-500 rounded-full h-6 w-6 px-0 py-0 mx-1 ${
//               currentIndex === 0 ? "opacity-50" : ""
//             }`}
//           >
//             <ChevronLeftIcon className="h-4 w-4 text-white" />
//           </Button>
//           <View className="grow h-4 rounded-full border-2 border-indigo-500/25 overflow-hidden bg-indigo-100/50">
//             <View
//               className="h-full bg-indigo-500 transition[width] duration-500"
//               style={{
//                 width: `${Math.max(
//                   (currentIndex / (childSlides.length - 1)) * 100,
//                   3
//                 )}%`,
//               }}
//             ></View>
//           </View>
//           <Button
//             onClick={() => changeStepIndexBounded(currentIndex + 1)}
//             intent={Intent.Custom}
//             className={`flex items-center justify-center gap-1 rounded-full h-6 shadow-none bg-transparent  bg-indigo-500 mx-1 py-1 pl-2 my-1 ${
//               currentIndex === childSlides.length - 1 ? "opacity-50" : ""
//             }`}
//           >
//             <>
//               <Text className="text-white">Next</Text>
//               <ChevronRightIcon
//                 id="next-instruction-button"
//                 className="bg-indigo-500 text-white h-4 w-4 rounded-full"
//               />
//             </>
//           </Button>
//         </View>
//       )}
//     </View>
//   );
// };

// const VLCodeBlock: FC<{ children: string }> = observer(({ children }) => {
//   const theme = useContext(ThemeContext);
//   const block = useMemo(() => {
//     try {
//       const b = vlModelFromText(children);
//       b.setIsViewOnlySnippet(true);
//       return b;
//     } catch (e) {
//       return undefined;
//     }
//   }, [children]);

//   if (!block) {
//     // fallback if vl can't parse
//     return (
//       <SyntaxHighlighter
//         customStyle={{
//           display: "",
//           flex: 1,
//         }}
//         style={{
//           ...(monacoThemeToHLJS(
//             MonacoThemeNameToTheme[theme.editorTheme]
//           ) as any),
//         }}
//         useInlineStyles={true}
//       >
//         {children}
//       </SyntaxHighlighter>
//     );
//   }

//   return (
//     <Block
//       block={block}
//       level={0}
//       showLineNumbers={false}
//       className={`${
//         theme.colorTheme === ColorTheme.Dark ? "bg-slate-800" : "bg-white"
//       } rounded-lg p-1 font-mono overflow-x-auto min-w-0 w-auto`}
//     />
//   );
// });

// const TextCodeBlock: FC<
//   PropsWithChildren<{
//     className?: string;
//     language?: string;
//     fontSize: number;
//   }>
// > = observer(({ className = "", language, children, fontSize }) => {
//   const theme = useContext(ThemeContext);

//   const contents = useMemo(() => {
//     if (isString(children)) {
//       return children;
//     }
//     return "";
//   }, [children]);

//   // When rendered directly, the language prop can be passed in directly
//   // Otherwise, markdown-to-jsx puts the language in a special class name
//   // prefixed with lang-, like lang-python or lang-java
//   const lang = useMemo(() => {
//     if (language) return language;
//     return className
//       .split(" ")
//       .find((cls) => cls.startsWith("lang-"))
//       ?.replace("lang-", "")
//       .toLowerCase();
//   }, [language, className]);

//   if (lang === "pickcode-vl" && isString(children)) {
//     return <VLCodeBlock>{children as string}</VLCodeBlock>;
//   }

//   return (
//     <SyntaxHighlighter
//       language={lang}
//       customStyle={{
//         display: "flex",
//         borderRadius: "0.5em",
//         fontSize,
//         lineHeight: 1.25,
//       }}
//       style={{
//         ...(monacoThemeToHLJS(
//           MonacoThemeNameToTheme[theme.editorTheme]
//         ) as any),
//       }}
//       useInlineStyles={true}
//     >
//       {contents}
//     </SyntaxHighlighter>
//   );
// });

// const InlineCode: FC<PropsWithChildren<{ fontSize: number }>> = observer(
//   ({ children, fontSize }) => {
//     return (
//       <MonospaceText
//         className="bg-slate-100 rounded-md px-1 py-[0.5] border border-slate-200"
//         style={{ fontSize, lineHeight: fontSize * 1.125 }}
//       >
//         {children}
//       </MonospaceText>
//     );
//   }
// );

// const ListItem: FC<
//   PropsWithChildren<{
//     index: number;
//     type: "ordered" | "unordered";
//     fontSize: number;
//   }>
// > = ({ children, type, index, fontSize }) => {
//   if (type === "unordered") {
//     return (
//       <Text style={{ fontSize, lineHeight: fontSize * 1.125 }}>
//         • {children}
//       </Text>
//     );
//   }
//   return (
//     <Text style={{ fontSize, lineHeight: fontSize * 1.125 }}>
//       {index + 1}. {children}
//     </Text>
//   );
// };
// const UnorderedList: FC<PropsWithChildren<{ fontSize: number }>> = ({
//   children,
//   fontSize,
// }) => {
//   return (
//     <View className="w-full">
//       {Children.map(children, (child, index) => (
//         <ListItem index={index} type="unordered" fontSize={fontSize}>
//           {child}
//         </ListItem>
//       ))}
//     </View>
//   );
// };
// const OrderedList: FC<PropsWithChildren<{ fontSize: number }>> = ({
//   children,
//   fontSize,
// }) => {
//   return (
//     <View className="w-full">
//       {Children.map(children, (child, index) => (
//         <ListItem index={index} type="ordered" fontSize={fontSize}>
//           {child}
//         </ListItem>
//       ))}
//     </View>
//   );
// };

// const forceAbsoluteUrl = (rawUrl: string): string => {
//   try {
//     // Just construct to see if it throws an exception, which will
//     // happen for URLs without a protocol, like google.com
//     new URL(rawUrl);
//     return rawUrl;
//   } catch (e) {
//     // Add protocol; otherwise urls will be treated relative to our
//     // website, which is probably not what the user wants
//     return `https://${rawUrl}`;
//   }
// };

// const markdownToJSXOverrides = (fontSize: number): MarkdownToJSX.Overrides => ({
//   Slide,
//   Step,
//   Button: LinkButton,
//   CompleteLessonBox,
//   Icon,
//   VLStatement,
//   Collapsible,
//   // block elements need w-full to take up space properly
//   p: ({ className, ...rest }) => (
//     <Text
//       className={tailwindClassNames(className, `w-full align-middle`)}
//       style={{ fontSize, lineHeight: fontSize * 1.125 }}
//       {...rest}
//     />
//   ),
//   span: <Text style={{ fontSize, lineHeight: fontSize }} />,
//   strong: ({ className, ...rest }) => (
//     <Text
//       className={tailwindClassNames(className, "font-bold")}
//       style={{ fontSize, lineHeight: fontSize * 1.125 }}
//       {...rest}
//     />
//   ),
//   em: ({ className, ...rest }) => (
//     <Text
//       className={tailwindClassNames(className, "italic")}
//       style={{ fontSize, lineHeight: fontSize * 1.125 }}
//       {...rest}
//     />
//   ),
//   br: () => <br style={{ fontSize, lineHeight: fontSize * 1.125 }} />,
//   h1: ({ className, ...rest }) => (
//     <H1
//       className={tailwindClassNames(className, "text-4xl w-full font-bold")}
//       style={{ fontSize: fontSize * 2.25, lineHeight: fontSize * 2.25 }}
//       {...rest}
//     />
//   ),
//   h2: ({ className, ...rest }) => (
//     <H2
//       className={tailwindClassNames(className, "text-3xl w-full font-bold")}
//       style={{ fontSize: fontSize * 1.875, lineHeight: fontSize * 1.875 }}
//       {...rest}
//     />
//   ),
//   h3: ({ className, ...rest }) => (
//     <H3
//       className={tailwindClassNames(className, "text-2xl w-full font-bold")}
//       style={{ fontSize: fontSize * 1.5, lineHeight: fontSize * 1.5 }}
//       {...rest}
//     />
//   ),
//   h4: ({ className, ...rest }) => (
//     <H4
//       className={tailwindClassNames(className, "text-xl w-full font-bold")}
//       style={{ fontSize: fontSize * 1.25, lineHeight: fontSize * 1.25 }}
//       {...rest}
//     />
//   ),
//   h5: ({ className, ...rest }) => (
//     <H5
//       className={tailwindClassNames(className, "text-lg w-full font-bold")}
//       style={{ fontSize: fontSize * 1.125, lineHeight: fontSize * 1.125 }}
//       {...rest}
//     />
//   ),
//   h6: ({ className, ...rest }) => (
//     <H6
//       className={tailwindClassNames(className, "text-base w-full font-bold")}
//       style={{ fontSize, lineHeight: fontSize }}
//       {...rest}
//     />
//   ),
//   a: ({ className, href, ...props }) => {
//     return (
//       <a
//         className={tailwindClassNames("underline text-blue-500", className)}
//         style={{ fontSize, lineHeight: 1.125 }}
//         {...props}
//         href={forceAbsoluteUrl(href)}
//         target="_blank"
//       />
//     );
//   },
//   code: ({ fontSize }) => {
//     return <TextCodeBlock fontSize={fontSize} />;
//   },
//   ul: (props) => <UnorderedList fontSize={fontSize} {...props} />,
//   ol: (props) => <OrderedList fontSize={fontSize} {...props} />,
//   li: ({ children, ...props }) => (
//     <Text style={{ fontSize, lineHeight: fontSize * 1.125 }} {...props}>
//       {children}
//     </Text>
//   ),
// });

// const validHtmlTags = new Set([
//   "a",
//   "abbr",
//   "address",
//   "area",
//   "article",
//   "aside",
//   "audio",
//   "b",
//   "base",
//   "bdi",
//   "bdo",
//   "blockquote",
//   "body",
//   "br",
//   "button",
//   "canvas",
//   "caption",
//   "cite",
//   "code",
//   "col",
//   "colgroup",
//   "data",
//   "datalist",
//   "dd",
//   "del",
//   "details",
//   "dfn",
//   "dialog",
//   "div",
//   "dl",
//   "dt",
//   "em",
//   "embed",
//   "fieldset",
//   "figcaption",
//   "figure",
//   "footer",
//   "form",
//   "h1",
//   "h2",
//   "h3",
//   "h4",
//   "h5",
//   "h6",
//   "head",
//   "header",
//   "hr",
//   "html",
//   "i",
//   "iframe",
//   "img",
//   "input",
//   "ins",
//   "kbd",
//   "label",
//   "legend",
//   "li",
//   "link",
//   "main",
//   "map",
//   "mark",
//   "meta",
//   "meter",
//   "nav",
//   "noscript",
//   "object",
//   "ol",
//   "optgroup",
//   "option",
//   "output",
//   "p",
//   "param",
//   "picture",
//   "pre",
//   "progress",
//   "q",
//   "rp",
//   "rt",
//   "ruby",
//   "s",
//   "samp",
//   "section",
//   "select",
//   "small",
//   "source",
//   "span",
//   "strong",
//   "style",
//   "sub",
//   "summary",
//   "sup",
//   "svg",
//   "table",
//   "tbody",
//   "td",
//   "template",
//   "textarea",
//   "tfoot",
//   "th",
//   "thead",
//   "time",
//   "title",
//   "tr",
//   "track",
//   "u",
//   "ul",
//   "var",
//   "video",
//   "wbr",
// ]);
// // it'd be real bad to ever allow this
// validHtmlTags.delete("script");

// // never need a closing tag: <br> is always treated line <br />
// const VOID_ELEMENTS = new Set([
//   "area",
//   "base",
//   "br",
//   "col",
//   "embed",
//   "hr",
//   "img",
//   "input",
//   "link",
//   "meta",
//   "param",
//   "source",
//   "track",
//   "wbr",
// ]);

// function scanRawMdxForUnclosedTags(
//   mdx: string
// ): { message: string; index: number } | undefined {
//   const stack: Array<[string, number]> = [];
//   let i = 0;
//   while (i < mdx.length) {
//     const char = mdx[i];

//     if (char == "\\") {
//       i += 2;
//       continue;
//     } else if (
//       char === "`" &&
//       i + 2 < mdx.length &&
//       mdx[i + 1] === "`" &&
//       mdx[i + 2] === "`"
//     ) {
//       // ``` code block: skip until the next ```
//       i += 3;
//       let j = i;
//       while (j < mdx.length) {
//         if (mdx[j] == "\\") {
//           j += 2;
//           continue;
//         }
//         if (
//           mdx[j] === "`" &&
//           j + 2 < mdx.length &&
//           mdx[j + 1] === "`" &&
//           mdx[j + 2] === "`"
//         ) {
//           i = j + 3;
//           break;
//         }
//         j++;
//       }
//     } else if (char === "`") {
//       // inline code: skip until closing ` on the same line
//       i++;
//       let j = i;
//       while (j < mdx.length) {
//         if (mdx[j] == "\\") {
//           j += 2;
//           continue;
//         }
//         if (mdx[j] == "\n") {
//           break;
//         }
//         if (mdx[j] === "`") {
//           i = j + 1;
//           break;
//         }
//         j++;
//       }
//     } else if (char !== "<") {
//       i++;
//     } else {
//       if (mdx.slice(i, i + 4) === "<!--") {
//         const commentClose = mdx.indexOf("-->", i + 4);
//         if (commentClose === -1) {
//           break;
//         } else {
//           i = commentClose + 3;
//           continue;
//         }
//       }

//       // Might start a tag
//       const nextChar = mdx[i + 1];

//       // if nextChar is NOT a slash or a letter/underscore,
//       // then we'll assume it's *not* an HTML tag
//       // So "x < y" isn't treated as a tag.
//       if (!nextChar || !/[/A-Za-z0-9_\-]/.test(nextChar)) {
//         i++;
//         continue;
//       }

//       // Read up to the next >
//       const tagStart = i;
//       const tagEnd = mdx.indexOf(">", tagStart + 1);
//       if (tagEnd === -1) {
//         break;
//       }

//       const tagText = mdx.slice(tagStart + 1, tagEnd).trim();

//       i = tagEnd + 1;

//       let isClosing = false;
//       let isSelfClosing = false;
//       let tagName = "";

//       if (tagText.startsWith("/")) {
//         isClosing = true;
//         tagName = tagText.slice(1).split(/\s+/)[0];
//       } else {
//         const parts = tagText.split(/\s+/);
//         tagName = parts[0];
//         if (tagName.endsWith("/")) {
//           // eg "br/"
//           tagName = tagName.slice(0, -1);
//           isSelfClosing = true;
//         } else if (tagText.endsWith("/")) {
//           // eg "br /"
//           isSelfClosing = true;
//         }
//       }

//       // Clean up the tagName (strip extra punctuation)
//       tagName = tagName.replace(/[^\w.\-]+/g, "");

//       if (!tagName) {
//         // eg "< / >" weird edge case
//         continue;
//       }

//       if (!isClosing) {
//         if (isSelfClosing || VOID_ELEMENTS.has(tagName)) {
//           continue;
//         } else {
//           stack.push([tagName, tagStart]);
//         }
//       } else if (stack.length > 0) {
//         const [top] = stack[stack.length - 1];
//         if (top.toLowerCase() === tagName.toLowerCase()) {
//           stack.pop();
//         } else {
//           const lineNum =
//             (mdx.slice(0, tagStart + 1).match(/\n/g) || []).length + 1;
//           return {
//             message: `<${tagName}> tag closed before <${top}> tag on line ${lineNum}.`,
//             index: tagStart,
//           };
//         }
//       }
//     }
//   }

//   for (const [unclosed, unclosedPos] of stack) {
//     const lineNum =
//       (mdx.slice(0, unclosedPos + 1).match(/\n/g) || []).length + 1;
//     return {
//       message: `Unclosed <${unclosed}> tag on line ${lineNum}.`,
//       index: unclosedPos,
//     };
//   }
// }

// export const MDXRenderer = observer(
//   ({
//     mdxText,
//     additionalOverrides,
//     showDetailedParsingErrors = false,
//   }: {
//     mdxText: string;
//     additionalOverrides?: MarkdownToJSX.Overrides;
//     showDetailedParsingErrors?: boolean;
//   }) => {
//     const { fontSize } = useContext(PreferencesContext);

//     const overrides = useMemo(
//       () => ({
//         ...markdownToJSXOverrides(fontSize),
//         ...additionalOverrides,
//       }),
//       [additionalOverrides, fontSize]
//     );

//     const { isValid, errorMessage, mdxToDisplay } = useMemo(() => {
//       const issue = scanRawMdxForUnclosedTags(mdxText);
//       if (showDetailedParsingErrors && issue) {
//         return {
//           isValid: false,
//           errorMessage: issue.message,
//           mdxToDisplay: mdxText.slice(0, issue.index),
//         };
//       } else {
//         return {
//           isValid: true,
//           // TODO: we're just doing this because the markdown parsing is confusing
//           // but would be better to just..... handle this in a way that makes more sense
//           // The extra newlines at the start of a step seem to cause its children to
//           // get wrapped differently causing layout issues
//           mdxToDisplay: mdxText.replaceAll(/Step>\n\n+/g, "Step>\n"),
//         };
//       }
//     }, [mdxText, showDetailedParsingErrors]);

//     return (
//       <>
//         {!isValid && <Text className="text-red-500 p-2">{errorMessage}</Text>}
//         <Markdown
//           children={mdxToDisplay}
//           options={{
//             wrapper: InstructionsMarkdownRenderer,
//             forceWrapper: true,
//             overrides,
//             createElement(tag, props, ...children) {
//               // treat invalid tags like react fragments basically, just
//               // displaying contents directly. happens while users are
//               // typing
//               if (isString(tag) && !validHtmlTags.has(tag)) {
//                 return (
//                   <Fragment key={props.key}>
//                     {Children.map(children, (child, index) =>
//                       isValidElement(child) ? (
//                         <Fragment key={index}>{child}</Fragment>
//                       ) : (
//                         <Text key={index}>{child}</Text>
//                       )
//                     )}
//                   </Fragment>
//                 );
//               }
//               return createElement(tag, props, ...children);
//             },

//             // This runs before createElement, we override a couple because
//             // it's easier than managing nested components that otherwise
//             // get generated
//             renderRule(next, node, renderChildren, state) {
//               if (node.type === RuleType.codeBlock) {
//                 return (
//                   <TextCodeBlock
//                     language={node.lang}
//                     key={state.key}
//                     fontSize={fontSize}
//                   >
//                     {node.text}
//                   </TextCodeBlock>
//                 );
//               }
//               if (node.type === RuleType.codeInline) {
//                 return (
//                   <InlineCode key={state.key} fontSize={fontSize}>
//                     {node.text}
//                   </InlineCode>
//                 );
//               }
//               return next();
//             },
//           }}
//         />
//       </>
//     );
//   }
// );

const InstructionsRenderer = ({
  instructionsText,
  currentLessonStepId,
}: //   changeStep,
{
  instructionsText: string;
  currentLessonStepId?: string;
  //   changeStep: (newStepId: string) => void;
}) => {
  //   const currentLessonStepIndex = useMemo(() => {
  //     const index = parseInt(currentLessonStepId ?? "");
  //     // old-style indices were ids, so these out-of-bounds values could happen
  //     // if those ids happen to parse as ints. We're gambling that no lessons
  //     // have more than 50 slides
  //     if (!index || index < 0 || index > 50) {
  //       return 0;
  //     }
  //     return index;
  //   }, [currentLessonStepId]);

  //   const changeStepIndex = useCallback(
  //     (newIndex: number) => {
  //       changeStep(`${newIndex}`);
  //     },
  //     [changeStep]
  //   );

  //   const context: LessonInstructionsContext = useMemo(
  //     () => ({
  //       currentLessonStepIndex,
  //       changeStepIndex,
  //     }),
  //     [currentLessonStepIndex, changeStepIndex]
  //   );

  //   const files = lessonCode.listFullyQualifiedContents();
  //   const assets = useMemo(() => {
  //     return Object.fromEntries(
  //       Object.entries(files)
  //         .filter(([_path, file]) => file.type === PCFileType.Asset)
  //         .map(([path, file]) => [path, file.textContents] as [string, string])
  //     );
  //   }, [files]);

  //   const additionalOverrides = useMemo(
  //     () =>
  //       ({
  //         img: ({ className, src, ...rest }) => {
  //           let url = src;
  //           if (assets[src]) {
  //             url = assets[src];
  //           } else {
  //             url = forceAbsoluteUrl(url);
  //           }
  //           return <img className={className} src={url} {...rest} />;
  //         },
  //       } satisfies MarkdownToJSX.Overrides),
  //     [assets]
  //   );

  return (
    <div>Instructions {instructionsText}</div>
    // <MDXRenderer
    //   mdxText={instructionsText}
    //   additionalOverrides={additionalOverrides}
    //   showDetailedParsingErrors={showDetailedParsingErrors}
    // />
  );
};

export default InstructionsRenderer;
