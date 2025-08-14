/**
 * Message for the Student's console.
 */
export interface ConsoleMessage {
  logType: "error" | "log";
  message: string;
}

/**
 * Interface for the language-specific Runtimes.
 */
export interface Runtime {
  startExecution(
    userCode: string,
    pluginImplementationCode: string
  ): Promise<void>;
  sendMessageToExecution(message: any): void;
}
