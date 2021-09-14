import { fetchCache } from "./nd-fetch/fetch-cache.js";
import { ndmapcommand } from "./nd-map/command.js";
import { main } from "./nd-map/main.js";

if (import.meta.main) {
  main({ command: ndmapcommand, mapfx: fetchCache });
}
