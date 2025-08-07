import { action, observable } from "mobx";
import { Scenes, ScenesMessage } from "./messages";

export class State {
  @observable
  scenes: Scenes = {
    start: {
      message: "Run the code to see your scenes load!",
      choices: [
        {
          response: "Where's the code?",
          nextScene: "codeLocation",
        },
        {
          response: "How do I run it?",
          nextScene: "runButtonLocation",
        },
      ],
    },
    codeLocation: {
      message: "Your code is what's on the left!",
      choices: [
        {
          response: "Thanks!",
          nextScene: "start",
        },
      ],
    },
    runButtonLocation: {
      message: "The run button is the green button at the bottom right!",
      choices: [
        {
          response: "Thanks!",
          nextScene: "start",
        },
      ],
    },
  };

  public init = () => {};

  @action
  public onMessage = (message: ScenesMessage) => {
    this.scenes = message.scenes;
  };
}

export default State;
