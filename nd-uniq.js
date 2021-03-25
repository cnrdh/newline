import { nduniqcommand } from "./nd-uniq/command.js";
import { functionFactory } from "./async-function.js";
import { generatorFactory } from "./generator/factory.js";

import { getArgs } from "./args.js";
const helptext = `nd-uniq

Writes unique documents to stdout

Options
  -d    Emit only repeated documents (duplicates)

Note: In contrast to GNU uniq, lines do not need to be presorted.`;

if (import.meta.main) {
  const args = getArgs();
  const { help } = args;
  const { stdin, exit } = Deno;

  if (help) {
    console.log(helptext);
    exit(0);
  } else {
    const mapfx = functionFactory({ args });
    const generator = generatorFactory({ args, reader: stdin });
    await nduniqcommand({ generator, mapfx, args });
  }
}
