export const isEmptyOrComment = (line) =>
  line === undefined || line.trim().length === 0 || line.startsWith("#");
