import { parseArgs } from "./deps.js";

export const commonOptions = {
  boolean: ["help", "std", "debug", "numerical", "text", "ignore-empty"],
  alias: {
    h: "help",
    v: "values",
    t: "text",
    f: "format",
    n: "numerical",
  },
  default: {
    format: "ndjson",
    blanks: false,
  },
};

//FIXME refactor getArgs
export const getOptions = (args) => ({ ...commonOptions, ...args });

export const getArgs = (args = Deno.args, options = commonOptions) =>
  parseArgs(args, options);
