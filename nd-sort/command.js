import { arrayAggregate } from "../array-aggregate.js";
import { transform } from "../nd-map/transform.js";
import { ndjson } from "../output/ndjson.js";

export const ndsortcommand = async ({ sortfx, generator, args } = {}) => {
  const array = await arrayAggregate({
    generator: transform({ generator, args }),
  });
  array.sort(sortfx);
  array.map((d) => ndjson(d));
};
