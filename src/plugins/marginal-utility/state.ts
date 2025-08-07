import { action, observable } from "mobx";
import { Message } from "./messages";

export class State {
  @observable
  choices: string[] = [];
  @observable
  error: string | null = null;

  public init = () => {};

  @action
  public onMessage = (message: Message) => {
    switch (message) {
      case "apple":
        this.choices.push("apple");
        return true;
      case "banana":
        this.choices.push("banana");
        return true;
      default:
        this.error = `Your input (${message}) is not a valid choice`;
        return false;
    }
  };
}

export default State;
