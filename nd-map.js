import { main } from "./nd-map/main.js";
import { ndmapcommand as command } from "./nd-map/command.js";
import { helptext } from "./nd-map/helptext.js";

if (import.meta.main) {
  main({ command, helptext });
}
