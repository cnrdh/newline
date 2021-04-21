import { parseArgs } from "./deps.js";

export const commonOptions = {
  boolean: ["help", "std", "debug", "numeric", "text", "ignore-empty"],
  alias: {
    h: "help",
    v: "values",
    s: "std",
    t: "text",
    f: "format",
    n: "numeric",
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
