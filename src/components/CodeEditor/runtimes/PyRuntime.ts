/**
 * The PyRuntime manages a webworker to run the student and plugin code.
 * It relays messages between the main page and the webworker.
 */

import { Runtime } from "./Runtime";

export class PyRuntime implements Runtime {
  executeWorker: Worker | null = null;
  private sendMessage: (message: any) => void;

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
          this.sendMessage(messageData);
          break;
        }
      }
    };
    this.executeWorker.onmessage = onMessageFromWorker;
  };

  public constructor(onMessage: (message: any) => void) {
    this.sendMessage = onMessage;
    this.resetWorker();
  }

  public async startExecution(userCode: string, pluginCode: string) {
    this.sendMessage({ type: "start" });
    this.sendMessageToExecution({
      type: "startPy",
      userCode,
      moduleCode: pluginCode,
    });
  }

  public sendMessageToExecution(message: any) {
    if (this.executeWorker) {
      this.executeWorker.postMessage(message);
    }
  }

  private sendMessageToPlugin(message: any) {
    this.sendMessage({ type: "message", message });
  }
}
