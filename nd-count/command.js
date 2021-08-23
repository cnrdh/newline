import { count } from "./count.js";
import { transform } from "../nd-map/transform.js";
import { ndjson } from "../output/ndjson.js";

const numsort = (key, direction = 1) => (a, b) => direction * (a[key] - b[key]);

// An alternative to the "| sort | uniq -c" pattern, with the advantage of adding "count" as a regular JSON member
export const ndcountcommand = async ({ generator, mapfx, args }) => {
  const transformGenerator = transform({ generator, mapfx, args });
  const countMap = await count({ generator: transformGenerator });
  const key = args.key ?? "count";
  const array = [...countMap]
    .filter(([, count]) => (args.d ? count > 1 : true))
    .map(([group, count]) => ({
      ...JSON.parse(group),
      [key]: count,
    }));

  let sort;

  if (true === args.sort) {
    sort = numsort(key, args.reverse === true ? -1 : 1);
  } else if (args.sort && args.sort.length) {
    sort = Function("a", "b", "return " + args.sort);
  }
  if (sort) {
    array.sort(sort);
  }
  array.map((d) => ndjson(d));
};
