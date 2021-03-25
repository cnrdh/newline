import { ndgroupcommand } from "./nd-group/command.js";
import { helptext } from "./nd-group/helptext.js";
import { functionFactory } from "./async-function.js";
import { generatorFactory } from "./generator/factory.js";
import { commonOptions, getArgs } from "./args.js";

if (import.meta.main) {
  const options = { ...commonOptions };
  options.default = { ...options.default };

  const { help, ...args } = getArgs(Deno.args, options);
  const { stdin, exit } = Deno;

  if (help) {
    console.log(helptext);
    exit(0);
  } else {
    const groupfx = functionFactory({ args });
    const generator = generatorFactory({ args, reader: stdin });
    await ndgroupcommand({
      generator,
      groupfx,
      args,
    });
  }
}
