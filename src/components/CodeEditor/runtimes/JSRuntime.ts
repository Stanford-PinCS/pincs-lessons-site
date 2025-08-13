import { Runtime } from "./Runtime";

/**
 * Routes messages to and from the main page to the web worker
 */

export class JSRuntime implements Runtime {
  executeWorker: Worker | null = null;

  private resetWorker = () => {
    if (this.executeWorker) {
      this.executeWorker.terminate();
    }
    this.executeWorker = new window.Worker(
      new URL("./JSWorker.js", import.meta.url),
      {
        type: "module",
      }
    );
    const onMessageFromWorker = (e: { data: any }) => {
      const messageData = e.data;
      switch (messageData.type) {
        case "plugin": {
          this.sendMessageToPlugin(messageData.contents);
          break;
        }
        case "log": {
          this.onMessage(messageData);
          break;
        }
      }
    };
    this.executeWorker.onmessage = onMessageFromWorker;
  };

  public constructor(private onMessage: (message: any) => void) {}

  public async startExecution(
    userCode: string,
    pluginImplementationCode: string
  ) {
    this.resetWorker();
    this.onMessage({ type: "start" });
    this.sendMessageToExecution({
      type: "startJS",
      userCode,
      pluginImplementationCode,
    });
  }

  public sendMessageToExecution(message: any) {
    if (this.executeWorker) {
      this.executeWorker.postMessage(message);
    }
  }

  private sendMessageToPlugin(message: any) {
    this.onMessage({ type: "message", message });
  }
}
