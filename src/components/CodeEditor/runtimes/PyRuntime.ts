/**
 * The PyRuntime manages a webworker to run the student and plugin code.
 * It relays messages between the main page and the webworker.
 */

import { Runtime } from "./Runtime";

export class PyRuntime implements Runtime {
  executeWorker: Worker | null = null;
  private sendMessageToMainPage: (message: any) => void;

  /**
   * Terminate the previous webworker and create a new webworker.
   */
  private resetWorker = () => {
    if (this.executeWorker) {
      this.executeWorker.terminate();
    }
    this.executeWorker = new Worker(new URL("./PyWorker.ts", import.meta.url), {
      type: "module",
    });
    // When it receives a message from the web worker, it forwards it to the react component.
    const onMessageFromWorker = (e: { data: any }) => {
      const messageData = e.data;
      switch (messageData.type) {
        case "plugin": {
          this.sendMessageToPlugin(messageData.contents);
          break;
        }
        case "log": {
          this.sendMessageToMainPage(messageData);
          break;
        }
      }
    };
    this.executeWorker.onmessage = onMessageFromWorker;
  };

  /**
   * This will create a new webworker.
   * @param onMessage The message listener from the main page.
   */
  public constructor(onMessage: (message: any) => void) {
    this.sendMessageToMainPage = onMessage;
    this.resetWorker();
  }

  /**
   * This runs the student's code.
   * @param userCode The code the student writes.
   * @param pluginCode The code to implement the plugin.
   */
  public async startExecution(userCode: string, pluginCode: string) {
    // Resets the plugin's state in plugin repo's /src/common/plugin.tsx (may want to consider making this optional).
    this.sendMessageToMainPage({ type: "start" });
    // This starts the webworker.
    this.sendMessageToExecution({
      type: "startPy",
      userCode,
      moduleCode: pluginCode,
    });
  }

  /**
   * This sends a message to the webworker.
   * @param message The message to send.
   */
  public sendMessageToExecution(message: any) {
    if (this.executeWorker) {
      this.executeWorker.postMessage(message);
    }
  }

  /**
   * This sends a message to the plugin.
   * @param message The message to send.
   */
  private sendMessageToPlugin(message: any) {
    this.sendMessageToMainPage({ type: "message", message });
  }
}
