import { action, observable } from "mobx";
import { FromRuntimeMessage, ToRuntimeMessage } from "./messages";

type Vector = {
  magnitude: number;
  angle: number;
};

type Components = {
  xComponent: number;
  yComponent: number;
};

export class State {
  @observable
  vectors: Vector[] = [];

  @observable
  components: Components[] = [];

  private sendMessage = (_message: ToRuntimeMessage) => {};

  public init = (sendMessage: (message: ToRuntimeMessage) => void) => {
    this.sendMessage = sendMessage;
  };

  @action
  public onMessage = (m: FromRuntimeMessage) => {
    if (m.drawVector) {
      this.vectors.push(m.drawVector);
    } else if (m.drawComponents) {
      this.components.push(m.drawComponents);
    }
  };

  public send = (m: ToRuntimeMessage) => {
    this.sendMessage(m);
  };
}

export default State;
