type Choice = {
  response: string;
  nextScene: string;
};
type Scene = {
  message: string;
  choices: Choice[];
};
type Scenes = Record<string, Scene>;

type ScenesMessage = {
  scenes: Scenes;
};

export type { Choice, Scene, Scenes, ScenesMessage };
