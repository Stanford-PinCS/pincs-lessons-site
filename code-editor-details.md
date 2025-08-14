# Code Editor Details

![Diagram description](./code-editor-diagram.svg)

This diagram above shows how the code editor component works.

It has a Code Editor on the left which essentially outputs a string.

It has a Markdown Renderer on the top right, which shows steps and slides to the user, loading from a markdown string.

The CodeOutput.tsx on the bottom right does the fancy stuff. It has an iframe running a plugin, a run button, and a console.

# Implementation

When the page loads:
- CodeOutput creates a Runtime (depending on the language)
- Runtime (maybe) creates a Webworker

When the user hits Run:
- CodeOutput sends (1) the student's usercode & (2) the implementation code to the Runtime (.startExecution).
- The Runtime  forwards it to the worker. For example,
```js
this.sendMessageToExecution({
  type: "startJS",
  userCode,
  pluginImplementationCode,
});
```
- The code output also sends a message back to the main page to "start" (reset) the iframed plugin component.
- The worker then loads the plugin's implementation (such that the implementation's sendMessage is the postMessage from the worker to the runtime, with the added type: "plugin").
```js
postMessage({
  type: "plugin",
  contents,
});
```
- The worker then runs the student's code, sends a message to the state as necessary. Also, whatever logs occur are sent to the Runtime as the following, which appear in the console.
```ts
{
    type: "log",
    logType: "log" | "error",
    message: string
}
```