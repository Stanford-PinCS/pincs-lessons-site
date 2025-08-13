// This file makes a web worker and the startexecution method
// sends the user code and the plugin code to the web worker
export class PyRuntime {
    executeWorker: Worker | null = null;

    private resetWorker = () => {
        if (this.executeWorker) {
            this.executeWorker.terminate();
        }
        this.executeWorker = new Worker(
            new URL("./PyWorker.ts", import.meta.url),
            {
                type: "module",
            }
        );
        // When it receives a message from the web worker, it forwards it to the react component.
        const onMessage = (e: { data: any }) => {
            const messageData = e.data;
            switch (messageData.type) {
                case "module": {
                    this.sendMessageToPlugin(messageData.contents);
                    break;
                }
                case "console": {
                    console.log(messageData.messageText);
                    break;
                }
                case "clearConsole": {
                    // TODO: send
                    break;
                }
            }
        };
        this.executeWorker.onmessage = onMessage;
    };

    public constructor(private onMessage: (message: any) => void) {
        this.resetWorker();
    }

    public async startExecution(userCode: string, pluginCode: string) {
        this.onMessage({ type: "start" });
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
        this.onMessage({ type: "message", message });
    }
}
