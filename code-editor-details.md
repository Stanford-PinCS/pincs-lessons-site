# Code Editor Details

![Code Editor Diagram](./code-editor-diagram.svg)

This diagram above shows how the code editor component works.

It has a Code Editor on the left which essentially outputs a string.

It has a Markdown Renderer on the top right, which shows steps and slides to the user, loading from a markdown string.

The CodeOutput.tsx on the bottom right does the fancy stuff. It has an iframe running a plugin, a run button, and a console.

# Loading and Running Processes

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
- When the code is done, the worker will send a message back to the Runtime (`{type: "finished"}`) which is currently ignored.



# Message Recap
![Messages Diagram](./messages-diagram.svg)

This diagram shows the messages that get sent.

In green, you can see the initiation sequence when the user hits run. (Main page to runtime (1); Runtime to iFrame (2-3) and to Webworker (4).)

In blue, you can see the messaging from the code execution back to the iFrame for plugin state messages (5) and back to the React for the console (6).

In orange, you can see that when the code's done (or interrupted), the Web Worker sends a finished message back to the runtime (7) which is currently ignored.