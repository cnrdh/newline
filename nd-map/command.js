import { transform } from "./transform.js";
import { jsongenerator } from "../generator/json-gen.js";

const { stdin } = Deno;
import { debugOutput as dbg, ndjson } from "../output/ndjson.js";

// Apply `mapfx` to stream of objects
// Input is derived from STDIN via async `generator`
// Write result to stdout
export const ndmapcommand = async ({
  mapfx,
  generator = jsongenerator(stdin), // NDJSON from STDIN
  position = 0,
  filter = false,
  output = ndjson,
  debug = dbg,
  args = {},
} = {}) => {
  try {
    const { silent, array, values } = args;

    const variant =
      values || array || ["values", "array"].includes(args.variant)
        ? "array"
        : undefined;

    for await (
      const object of transform({
        generator,
        mapfx,
        args,
        position,
      })
    ) {
      if (args.debug) {
        debug(object, { variant, position });
      }
      if (silent !== true) {
        if (
          filter === false ||
          (await filter(object, position, args)) === true
        ) {
          output(object, { variant, position, ...args });
        }
      }
      position++;
    }
    return position;
  } catch (e) {
    console.error("nd-map failed at line", { position });
    throw e;
  }
};
