import { ndsortcommand } from "./nd-sort/command.js";
import { createSortFunction, sortjson, sorton } from "./nd-sort/sort.js";
import { helptext } from "./nd-sort/helptext.js";

import { generatorFactory } from "./generator/factory.js";
import { commonOptions, getArgs } from "./args.js";

if (import.meta.main) {
  const options = { ...commonOptions };
  options.alias = { ...options.alias, lang: "locales", locale: "locales" };
  options.boolean = [...options.boolean, "reverse"];
  options.default = { ...options.default, reverse: false };

  const args = getArgs(Deno.args, options);
  const {
    on,
    help,
    numerical,
    reverse,
    locales,
    _: [sortfxbody],
  } = args;

  const { stdin, exit } = Deno;

  if (help) {
    console.log(helptext);
    exit(0);
  }
  const sortfx = on && on.length > 0
    ? sorton({ on, reverse, numerical, locales })
    : createSortFunction({ sortfxbody, locales, reverse });

  const generator = generatorFactory({ args, reader: stdin });

  await ndsortcommand({
    generator,
    sortfx,
    args,
  });
}
