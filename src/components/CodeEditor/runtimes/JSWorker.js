/**
 * Run user's code in web worker
 * Handles overriding of console methods and sending messages from user code
 * back to the main page to be routed to the plugin
 */

const AsyncFunction = async function () {}.constructor;

/**
 * Safely serialize any object into JSON-like form,
 * replacing DOM nodes, functions, etc. with placeholders.
 */
function sanitizeMessage(value) {
  const seen = new WeakSet();

  function replacer(key, val) {
    if (typeof val === "object" && val !== null) {
      if (seen.has(val)) {
        return "[Circular]";
      }
      seen.add(val);

      if (val.nodeType && val.nodeName) {
        return val.outerHTML;
      }
    }

    if (typeof val === "function") {
      return `[Function: ${val.name || "anonymous"}]`;
    }

    return val;
  }

  // this returns a list
  return JSON.parse(JSON.stringify(value, replacer))[0];
}

/**
 * Override all console methods to send their messages back to main page
 * so that we can show them to the user in our console
 * See ConsoleOutput.tsx
 */
const overriddenConsole = {
  ...console,
  log: (...data) => {
    originalConsole.log(...data);
    postMessage({
      type: "log",
      logType: "log",
      message: sanitizeMessage(data),
    });
  },
  debug: (...data) => {
    originalConsole.debug(...data);
    postMessage({
      type: "log",
      logType: "debug",
      message: sanitizeMessage(data),
    });
  },
  info: (...data) => {
    originalConsole.info(...data);
    postMessage({
      type: "log",
      logType: "info",
      message: sanitizeMessage(data),
    });
  },
  warn: (...data) => {
    originalConsole.warn(...data);
    postMessage({
      type: "log",
      logType: "warn",
      message: sanitizeMessage(data),
    });
  },
  error: (...data) => {
    originalConsole.error(...data);
    postMessage({
      type: "log",
      logType: "error",
      message: sanitizeMessage(data),
    });
  },
};

/**
 * Override timing-based functions so that when user code
 * is terminated, old timers don't fire. TODO: this doesn't work
 */
const originalConsole = console;
const overrideGlobalFns = (onTermination) => {
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

  globalThis.console = overriddenConsole;

  const timeouts = new Set();
  const intervals = new Set();
  const maybeTerminate = () => {
    if (timeouts.size === 0 && intervals.size === 0) {
      void Promise.resolve().then(() => {
        if (timeouts.size === 0 && intervals.size === 0) {
          handleTermination();
        }
      });
    }
  };

  globalThis.setTimeout = (...[callback, ...args]) => {
    const id = originalSetTimeout(() => {
      let result;
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
  globalThis.clearTimeout = (...[id]) => {
    const result = originalClearTimeout(id);
    timeouts.delete(id);
    maybeTerminate();
    return result;
  };

  globalThis.setInterval = (...args) => {
    const id = originalSetInterval(...args);
    intervals.add(id);
    return id;
  };
  globalThis.clearInterval = (...[id]) => {
    const result = originalClearInterval(id);
    intervals.delete(id);
    maybeTerminate();
    return result;
  };

  return { maybeTerminate };
};

/**
 * Utility for importing the plugin's implementation file
 */
function importString(str) {
  const blob = new Blob([str], { type: "text/javascript" });
  const url = URL.createObjectURL(blob);
  const pluginImplementationCode = import(/* @vite-ignore */ url);
  URL.revokeObjectURL(url);
  return pluginImplementationCode;
}

/**
 * Handle messages coming from main page
 * startJS => start the program, comes with the user's code as well
 * as the implementation code for the plugin
 */
const handleMessage = async (message) => {
  switch (message.type) {
    case "startJS": {
      const { maybeTerminate } = overrideGlobalFns(() =>
        postMessage({ type: "finished" })
      );

      let pluginImplementation;
      try {
        pluginImplementation = await importString(
          message.pluginImplementationCode
        );
      } catch (e) {
        console.error("error importing plugin implementation code", e);
        throw e;
      }
      let exports;
      try {
        exports =
          (await pluginImplementation.default((contents) => {
            postMessage({
              type: "plugin",
              contents,
            });
          })) || {};
      } catch (e) {
        console.error("error executing plugin implementation code code", e);
        throw e;
      }

      const params = Object.entries(exports);
      let userCode;
      try {
        userCode = AsyncFunction(
          ...params.map(([name, _val]) => name),
          message.userCode
        );
      } catch (e) {
        if (e instanceof Error) {
          postMessage({
            type: "log",
            logType: "error",
            message: `${e.name}: ${e.message}\n`,
          });
          maybeTerminate();
        }
        throw e;
      }

      try {
        await userCode(...params.map(([_name, val]) => val));
        maybeTerminate();
      } catch (e) {
        if (e instanceof Error) {
          postMessage({
            type: "log",
            logType: "error",
            message: `${e.name}: ${e.message}\n`,
          });
        }
        maybeTerminate();
        throw e;
      }

      break;
    }
  }
};

self.onmessage = (event) => {
  if (!event.data.type) return;
  void handleMessage(event.data);
};
