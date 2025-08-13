export interface ConsoleMessage {
  logType: "error" | "log";
  message: string;
}

export interface Runtime {
  startExecution(
    userCode: string,
    pluginImplementationCode: string
  ): Promise<void>;
  sendMessageToExecution(message: any): void;
}
