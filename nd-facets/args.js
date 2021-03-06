import { commonOptions, getArgs as _getArgs } from "../args.js";

export const VALUE_KEY = 0;
export const COUNT_KEY = 1;

export const facetOptions = {
  ...commonOptions,
  default: {
    min: 1,
    max: 10,
    sorton: COUNT_KEY,
    sortdir: "desc",
  },
};

export const getArgs = (args = Deno.args, options = facetOptions) =>
  _getArgs(args, options);
