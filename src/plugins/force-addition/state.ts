import { action, computed, observable, makeObservable } from "mobx";
import { DrawForceMessage } from "./messages";

export interface ForceArrow {
  x: number;
  y: number;
  color: string;
}

export class State {
  @observable
  forceArrows: ForceArrow[] = [];

  constructor() {
    makeObservable(this);
  }

  @action
  public onMessage = (message: DrawForceMessage) => {
    this.forceArrows.push(message.forceToDraw);
    return true;
  };
}

export default State;
