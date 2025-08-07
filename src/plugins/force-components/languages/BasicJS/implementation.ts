import { FromRuntimeMessage } from "../../messages";

const createExports = (sendMessage: (message: FromRuntimeMessage) => void) => {
  return Promise.resolve({
    drawVector: (magnitude: number, angle: number) => {
      sendMessage({ drawVector: { magnitude, angle } });
    },
    drawComponents: (xComponent: number, yComponent: number) => {
      sendMessage({ drawComponents: { xComponent, yComponent } });
    },
  });
};

export default createExports;
