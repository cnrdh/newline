import { buildFacetMaps, facets } from "./facets.js";
import { jsongenerator } from "../generator/json-gen.js";
import { assertEquals, readTestdata, test } from "../test-deps.js";

test("buildFacetMaps returns object with { size, map, count, minmax } keys", async () => {
  const generator = jsongenerator(await readTestdata("123-mixed-order.ndjson"));
  const { size, map, count, minmax } = await buildFacetMaps({
    generator,
  });
  assertEquals(size, 6);
  assertEquals(map.size, 4);
  assertEquals(count.size, 6);
  assertEquals(minmax.size, 4);
});

test("buildFacetMaps returns a map with sets of unique values for each unique key", async () => {
  const generator = jsongenerator(await readTestdata("123-mixed-order.ndjson"));
  const { map } = await buildFacetMaps({ generator });
  assertEquals(map.get("one"), new Set([1]));
  assertEquals(map.get("ONE"), new Set(["1"]));
  assertEquals(map.get("two"), new Set([2, "2"]));
  assertEquals(map.get("three"), new Set([3, "3"]));
  // map: Map {
  //   "three" => Set { 3, "3" },
  //   "two" => Set { 2, "2" },
  //   "one" => Set { 1 },
  //   "ONE" => Set { "1" }
  // }
});

test("buildFacetMaps returns a frequency map as counts number of occurrences of each key-value", async () => {
  const generator = jsongenerator(await readTestdata("123-mixed-order.ndjson"));
  const { count } = await buildFacetMaps({ generator });
  assertEquals(count.get('["one",1]'), 4);
  // count: Map {
  //   '["three",3]' => 4,
  //   '["two",2]' => 5,
  //   '["one",1]' => 4,
  //   '["ONE","1"]' => 1,
  //   '["two","2"]' => 1,
  //   '["three","3"]' => 1
  // }
});

test("buildFacetMaps returns min and max values for each key", async () => {
  const generator = jsongenerator(await readTestdata("123-mixed-order.ndjson"));
  const { minmax } = await buildFacetMaps({ generator });
  assertEquals(minmax.get("three"), [3, 3]);
  // minmax: Map {
  //   "three" => [ 3, 3 ],
  //   "two" => [ 2, 2 ],
  //   "one" => [ 1, 1 ],
  //   "ONE" => [ "1", "1" ]
  // }
});

test("facets returns an object of unique fields, each with { facets, min, max, lines and uniq } keys", async () => {
  const generator = jsongenerator(await readTestdata("123-mixed-order.ndjson"));
  const actual = await facets({ generator });
  const exp = JSON.parse(
    `{"three":{"facets":[[3,4],["3",1]],"min":3,"max":3,"lines":6,"uniq":2},"two":{"facets":[[2,5],["2",1]],"min":2,"max":2,"lines":6,"uniq":2},"one":{"facets":[[1,4]],"min":1,"max":1,"lines":6,"uniq":1},"ONE":{"facets":[["1",1]],"min":"1","max":"1","lines":6,"uniq":1}}`,
  );
  assertEquals(actual, exp);
});
