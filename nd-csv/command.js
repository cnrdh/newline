import { csvgenerator } from "./csv-gen.js";
import { helptext } from "./helptext.js";

import { parseArgs } from "../deps.js";
import { ndjson } from "../output/ndjson.js";

const isNumber = (n) =>
  !["", undefined, null, true, false].includes(n) && !Number.isNaN(Number(n));
const { stdin, stdout, exit } = Deno;

export const ndcsv = async ({ generator, args, position = 0 }) => {
  const { num, variant } = args;
  for await (const object of generator) {
    if (num) {
      Object.keys(object).map((k) => {
        const n = object[k];
        if (isNumber(n)) {
          object[k] = Number(n);
        }
      });
    }
    ndjson(object, { position, variant });
    position++;
  }
};
