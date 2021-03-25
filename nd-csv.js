import { parseArgs } from "./deps.js";
import { ndjson } from "./output/ndjson.js";
import { csvgenerator } from "./nd-csv/csv-gen.js";
const { stdin, exit } = Deno;

import { helptext } from "./nd-csv/helptext.js";
import { ndcsv } from "./nd-csv/command.js";
export const defaultArgs = {
  boolean: ["help", "std", "debug"],
  alias: { h: "help", v: "values", n: "num", s: "std" },
  default: {
    "keys-fx": "default",
    values: false,
  },
};
if (import.meta.main) {
  try {
    const args = parseArgs(Deno.args, defaultArgs);
    const { separator, select, std, values, help } = args;

    if (help) {
      console.log(helptext);
      exit(0);
    }

    const columns = select ? select.split(",") : undefined;
    if (std && !args["keys"]) {
      args["keys"] = "./nd-csv/std-keys.js";
    }

    const columnTransformer = args["keys"]
      ? (await import(args["keys"]))[args["keys-fx"]]
      : undefined;

    const generator = csvgenerator(stdin, {
      separator,
      columns,
      values,
      columnTransformer,
      ...args,
    });

    await ndcsv({ generator, args });
  } catch (e) {
    console.error(e);
    exit(1);
  }
}
