/**
 * Run user's code in web worker.
 * Sends console and plugin messages back to the Runtime.
 */

// @ts-ignore
const { loadPyodide } = await import(
  /* webpackIgnore: true */
  "https://cdn.jsdelivr.net/pyodide/v0.25.1/full/pyodide.mjs"
);

// Load pyodide when web worker is made.
let pyodide: any = loadPyodide();

// Override's the intervals & timeouts so it all wraps up nicely.
const overrideGlobalFns = (onTermination: () => void) => {
  const originalSetTimeout = globalThis.setTimeout;
  const originalClearTimeout = globalThis.clearTimeout;
  const originalSetInterval = globalThis.setInterval;
  const originalClearInterval = globalThis.clearInterval;
  const originalConsole = globalThis.console;

  const handleTermination = () => {
    globalThis.setTimeout = originalSetTimeout;
    globalThis.clearTimeout = originalClearTimeout;
    globalThis.setInterval = originalSetInterval;
    globalThis.clearInterval = originalClearInterval;
    globalThis.console = originalConsole;

    onTermination();
  };

  const timeouts = new Set<any>();
  const intervals = new Set<any>();
  const maybeTerminate = () => {
    if (timeouts.size === 0 && intervals.size === 0) {
      void Promise.resolve().then(() => {
        if (timeouts.size === 0 && intervals.size === 0) {
          handleTermination();
        }
      });
    }
  };

  (globalThis.setTimeout as any) = (
    ...[callback, ...args]: Parameters<typeof setTimeout>
  ) => {
    const id = originalSetTimeout(() => {
      let result: any;
      if (typeof callback === "string") {
        result = eval(callback);
      } else {
        result = callback();
      }
      timeouts.delete(id);
      maybeTerminate();
      return result;
    }, ...args);
    timeouts.add(id);
    return id;
  };
  (globalThis.clearTimeout as any) = (
    ...[id]: Parameters<typeof clearTimeout>
  ) => {
    const result = originalClearTimeout(id);
    timeouts.delete(id);
    maybeTerminate();
    return result;
  };

  (globalThis.setInterval as any) = (
    ...args: Parameters<typeof setInterval>
  ) => {
    const id = originalSetInterval(...args);
    intervals.add(id);
    return id;
  };
  (globalThis.clearInterval as any) = (
    ...[id]: Parameters<typeof clearInterval>
  ) => {
    const result = originalClearInterval(id);
    intervals.delete(id);
    maybeTerminate();
    return result;
  };

  return { maybeTerminate };
};

/**
 * Utility for importing the plugin's implementation file.
 */
function importString(str: string) {
  const blob = new Blob([str], { type: "text/javascript" });
  const url = URL.createObjectURL(blob);
  const pluginImplementationCode = import(/* webpackIgnore: true */ url);
  URL.revokeObjectURL(url);
  return pluginImplementationCode;
}

/**
 * This will turn any proxy or value from the Python form to JavaScript form.
 * If not given a proxy, it will return the original input.
 * @param arbitraryValue This can be any value from Pyodide
 * @returns That value, or a JSON representation of that value if it wasn't a primative type.
 */
function proxyToJSObj(arbitraryValue: any) {
  // If it's not an object, just give it back...
  // it should hopefully be a good primative type already.
  if (!(arbitraryValue instanceof Object)) {
    return arbitraryValue;
  }

  // If we have a Proxy, turn it into JavaScript Objects (dictionaries -> maps)
  if ("toJs" in arbitraryValue) {
    arbitraryValue = arbitraryValue.toJs();
  }

  // If it's not a map, it should hopefully be a good object already.
  if (!(arbitraryValue instanceof Map)) {
    return arbitraryValue;
  }

  // Once we have a map, let's type it and recurse on submaps.
  let map: Map<any, any> = arbitraryValue;

  // Convert the Map (potentially map of maps) to JSON.
  const obj: any = {};
  for (let [key, value] of map) {
    if (value instanceof Object) {
      obj[key] = proxyToJSObj(value);
    } else {
      obj[key] = value;
    }
  }
  return obj;
}

function getMessage(error: Error) {
  let message = `${error.name}: ${error.message}\n`;
  // If it has a type, print the nice part of the message first.
  // @ts-ignore
  let type = error.type;
  if (type && message.includes(type)) {
    let typeSpot = message.indexOf(type);
    message = `${message.substring(typeSpot).trimEnd()}\n${message.substring(
      0,
      typeSpot
    )}\n`;
  }
  return message;
}

/**
 * Handle messages coming from main page.
 * startPy => start the program, comes with the user's code as well
 * as the implementation code for the plugin.
 */
const handleMessage = async (message: any) => {
  const { maybeTerminate: terminate } = overrideGlobalFns(() =>
    postMessage({ type: "finished" })
  );
  switch (message.type) {
    case "startPy": {
      // Make sure pyodide has loaded. Wait if it hasn't.
      // TODO: maybe send a loading indicator here...
      pyodide = await pyodide;

      const { maybeTerminate } = overrideGlobalFns(() =>
        postMessage({ type: "finished" })
      );

      // This imports the implementation.
      // The main window sends over the module code (implementation) as a string here.
      let moduleCode;
      try {
        moduleCode = await importString(message.moduleCode);
      } catch (e) {
        // eslint-disable-next-line no-console
        console.error("error importing module code", e);
        throw e;
      }

      // This awaits the promise of the implementation.
      let exports: Record<string, (...args: any[]) => any>;
      try {
        exports =
          (await moduleCode.default((contents: any) => {
            postMessage({
              type: "plugin",
              contents,
            });
          })) || {};
      } catch (e) {
        // eslint-disable-next-line no-console
        console.error("error executing plugin code", e);
        throw e;
      }

      // Configure the Pyodide to include implementation, stdin, and stdout.
      try {
        // Register each function from the implementation as a function in Python.
        for (let [functionName, functionImplementation] of Object.entries(
          exports
        )) {
          pyodide.globals.set(functionName, (...args: any[]) => {
            // Convert arguments from Python-JS Proxies to JS Objects
            // (e.g. Nested Dictionaries to Nested JS Objects).
            args = args.map(proxyToJSObj);
            functionImplementation(...args);
          });
        }
        // Override stdout & stderr.
        pyodide.setStdout({
          batched: (msg: string) => {
            console.log(msg);
            postMessage({
              type: "log",
              logType: "log",
              message: msg,
            });
          },
        });
      } catch (e) {
        if (e instanceof Error) {
          postMessage({
            type: "log",
            logType: "error",
            message: getMessage(e),
          });
          maybeTerminate();
        }
        throw e;
      }

      // Run the user's code in Pyodide
      let userCode = message.userCode;
      try {
        pyodide.runPython(userCode);
        maybeTerminate();
      } catch (e) {
        if (e instanceof Error) {
          postMessage({
            type: "log",
            logType: "error",
            message: getMessage(e),
          });
        }
        terminate();
        throw e;
      }
      break;
    }
  }
};

// Route our onmessage to handle message, ignoring typeless messages.
self.onmessage = (event) => {
  if (!event.data.type) return;
  handleMessage(event.data);
};
