import { Scenes, ScenesMessage } from "../../messages";

const createExports = (sendMessage: (message: ScenesMessage) => void) => {
  return Promise.resolve({
    loadDialogue: (scenes: Scenes) => {
      sendMessage({ scenes });
    },
  });
};

export default createExports;
