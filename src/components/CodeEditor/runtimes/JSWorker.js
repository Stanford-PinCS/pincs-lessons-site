console.log("hello from worker!!!");

const messageSubscribers = {};
const subscribeToMessages = (onMessage) => {
  const key = Symbol();
  messageSubscribers[key] = onMessage;
  return () => {
    delete messageSubscribers[key];
  };
};

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

  return JSON.parse(JSON.stringify(value, replacer));
}

const overriddenConsole = {
  ...console,
  clear: () => {
    postMessage({ type: "clearConsole" });
  },
  log: (...data) => {
    originalConsole.log(...data);
    postMessage({
      type: "console",
      level: "log",
      data: sanitizeMessage(data),
    });
  },
  debug: (...data) => {
    originalConsole.debug(...data);
    postMessage({
      type: "console",
      level: "debug",
      data: sanitizeMessage(data),
    });
  },
  info: (...data) => {
    originalConsole.info(...data);
    postMessage({
      type: "console",
      level: "info",
      data: sanitizeMessage(data),
    });
  },
  warn: (...data) => {
    originalConsole.warn(...data);
    postMessage({
      type: "console",
      level: "warn",
      data: sanitizeMessage(data),
    });
  },
  error: (...data) => {
    originalConsole.error(...data);
    postMessage({
      type: "console",
      level: "error",
      data: sanitizeMessage(data),
    });
  },
};

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

  globalThis.setInterva = (...args) => {
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

function importString(str) {
  const blob = new Blob([str], { type: "text/javascript" });
  const url = URL.createObjectURL(blob);
  const module = import(/* @vite-ignore */ url);
  URL.revokeObjectURL(url);
  return module;
}

const handleMessage = async (message) => {
  switch (message.type) {
    case "startJS": {
      const { maybeTerminate } = overrideGlobalFns(() =>
        postMessage({ type: "finished" })
      );

      let moduleCode;
      try {
        moduleCode = await importString(message.moduleCode);
      } catch (e) {
        // eslint-disable-next-line no-console
        console.error("error importing module code", e);
        throw e;
      }
      let exports;
      try {
        exports =
          (await moduleCode.default((contents) => {
            postMessage({
              type: "module",
              contents,
            });
          }, subscribeToMessages)) || {};
      } catch (e) {
        // eslint-disable-next-line no-console
        console.error("error executing module code", e);
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
            type: "console",
            stream: "stderr",
            messageText: `${e.name}: ${e.message}\n`,
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
            type: "console",
            stream: "stderr",
            messageText: `${e.name}: ${e.message}\n`,
          });
        }
        maybeTerminate();
        throw e;
      }

      break;
    }
    case "module": {
      Object.getOwnPropertySymbols(messageSubscribers).forEach((key) => {
        messageSubscribers[key](message.contents);
      });
    }
  }
};

self.onmessage = (event) => {
  if (!event.data.type) return;
  void handleMessage(event.data);
};
