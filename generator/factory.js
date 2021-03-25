import { textgenerator } from "./text-gen.js";
import { jsongenerator } from "./json-gen.js";

const { stdin } = Deno;

export const generatorFactory = ({ args, reader = stdin } = {}) =>
  args && args.text ? textgenerator(reader, args) : jsongenerator(reader, args);
