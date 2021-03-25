import { ndcountcommand } from "./nd-count/command.js";
import { helptext } from "./nd-count/helptext.js";
import { functionFactory } from "./async-function.js";
import { generatorFactory } from "./generator/factory.js";
import { commonOptions, getArgs } from "./args.js";

if (import.meta.main) {
  const options = { ...commonOptions };
  options.default = { ...options.default, key: "count" };

  const { help, ...args } = getArgs(Deno.args, options);
  const { stdin, exit } = Deno;

  if (help) {
    console.log(helptext);
    exit(0);
  } else {
    const mapfx = functionFactory({ args });
    const generator = generatorFactory({ args, reader: stdin });
    await ndcountcommand({ generator, mapfx, args });
  }
}
