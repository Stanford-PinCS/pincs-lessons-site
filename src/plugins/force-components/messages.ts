export type FromRuntimeMessage = {
  drawVector?: {
    magnitude: number;
    angle: number;
  };
  drawComponents?: {
    xComponent: number;
    yComponent: number;
  };
};

export type ToRuntimeMessage = {};
