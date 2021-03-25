import { uuidmapfx } from "./nd-uuid/uuid-mapfx.js";
import { helptext } from "./nd-uuid/helptext.js";
import { main } from "./nd-map/main.js";
import { ndmapcommand } from "./nd-map/command.js";

if (import.meta.main) {
  main({ command: ndmapcommand, helptext, mapfx: uuidmapfx });
}
