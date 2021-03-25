import { transform } from "../nd-map/transform.js";
import { ndjson } from "../output/ndjson.js";

export const nduniqcommand = async ({ generator, mapfx, args }) => {
  const uniq = new Set();
  const dup = new Set();

  const dupflag = args.d;
  for await (const d of transform({ generator, mapfx, args })) {
    const v = JSON.stringify(d);

    if (dupflag) {
      if (uniq.has(v) && !dup.has(v)) {
        dup.add(v);
        ndjson(d);
      } else {
        uniq.add(v);
      }
    } else if (!uniq.has(v)) {
      uniq.add(v);
      ndjson(d);
    }
  }
  return uniq;
};
