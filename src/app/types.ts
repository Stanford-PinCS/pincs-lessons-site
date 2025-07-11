export enum Subject {
  Biology = "Biology",
  Chemistry = "Chemistry",
  Physics = "Physics",
  English = "English",
  Music = "Music",
  Mathematics = "Mathematics",
  ComputerScience = "Computer Science",
  History = "History",
  EnvironmentalScience = "Environmental Science",
  Economics = "Economics",
}

export type Tag =
  | { type: "subject"; value: Subject }
  | { type: "grade"; value: number | undefined }
  | { type: "hidden"; value: boolean };

export function tagsMatch(tagA: Tag, tagB: Tag) {
  return tagA.type === tagB.type && tagA.value === tagB.value;
}

export type Lesson = {
  title: string;
  link: string;
  tags: Tag[];
};
