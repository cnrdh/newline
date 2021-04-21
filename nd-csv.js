import { parseArgs } from "./deps.js";
import { commonOptions } from "./args.js";
import { ndjson } from "./output/ndjson.js";
import { csvgenerator } from "./nd-csv/csv-gen.js";
const { stdin, exit } = Deno;

import { helptext } from "./nd-csv/helptext.js";
import { ndcsvcommand } from "./nd-csv/command.js";

if (import.meta.main) {
  try {
    const options = { ...commonOptions };
    options.default = {
      ...options.default,
      "keys-fx": "default",
      values: false,
    };
    const args = parseArgs(Deno.args, options);

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
      ...args,
      separator,
      columns,
      values,
      columnTransformer,
    });

    await ndcsvcommand({ generator, args });
  } catch (e) {
    console.error(e);
    exit(1);
  }
}
