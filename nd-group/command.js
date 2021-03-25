import { group } from "./group.js";
import { transform } from "../nd-map/transform.js";
import { ndjson } from "../output/ndjson.js";

export const ndgroupcommand = async ({
  groupfx,
  mapfx = (d) => d,
  generator,
  args,
}) => {
  const gen = transform({ generator, mapfx, args });
  const groups = await group({ generator: gen, by: groupfx });
  [...groups].map((d) => ndjson(d));
};
