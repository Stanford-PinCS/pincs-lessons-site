import { DrawForceMessage } from "../../messages";
import { ForceArrow } from "../../state";

type ForceComponents = {
  x: number;
  y: number;
};

const createExports = (sendMessage: (message: DrawForceMessage) => void) => {
  return Promise.resolve({
    drawForce: (force: ForceComponents, color: string) => {
      let forceArrow = { ...force, color };
      sendMessage({ forceToDraw: forceArrow });
    },
  });
};

export default createExports;
