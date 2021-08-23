import { generatorFactory } from "../generator/factory.js";

import { getArgs } from "../args.js";
import { createAsyncFunction } from "../async-function.js";

import { outputFactory } from "../output/ndjson.js";

const { stdin, exit } = Deno;

export async function main({
  command,
  mapfx,
  filter,
  helptext = "",
  args = getArgs(),
  generator = generatorFactory({ args, reader: stdin }),
}) {
  const {
    _: [fxbody],
    //imports,
    format,
    help,
  } = args;

  if (help) {
    console.log(helptext);
    exit(0);
  }
  try {
    mapfx = !mapfx && fxbody ? createAsyncFunction(fxbody) : mapfx;
    mapfx = mapfx ? mapfx : (d) => d;
    const output = outputFactory({ format });
    await command({ args, filter, generator, mapfx, output });
  } catch (e) {
    console.error(e);
    exit(1);
  }
}
