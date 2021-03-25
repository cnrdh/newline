import { helptext } from "./nd-facets/helptext.js";
import { facets } from "./nd-facets/facets.js";
import { getArgs } from "./nd-facets/args.js";

import { ndjson } from "./output/ndjson.js";
import { jsongenerator } from "./generator/json-gen.js";

if (import.meta.main) {
  const { stdin, exit } = Deno;
  const args = getArgs();
  const { help } = args;

  if (help) {
    console.log(helptext);
    exit(0);
  } else {
    const generator = jsongenerator(stdin);
    ndjson(await facets({ ...args, generator }));
  }
}
