import { main } from "./nd-map/main.js";
import { getArgs } from "./args.js";
import { ndmapcommand as command } from "./nd-map/command.js";
import { functionFactory } from "./async-function.js";
import { helptext } from "./nd-filter/helptext.js";

if (import.meta.main) {
  const args = getArgs();
  const mapfx = (d /*, i, args*/) => d;
  const filter = functionFactory({ args });
  main({ command, helptext, args, filter, mapfx });
}
