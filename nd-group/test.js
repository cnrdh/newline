import { group } from "./group.js";
import { jsongenerator } from "../generator/json-gen.js";
import { assertEquals, test } from "../test-deps.js";

const groupme =
  `{ "a": "a0", "p": "p0" }\n{ "b": "b0" }\n{ "a": "a1" }\n{ "b": "b1", "a": "a0" }`;

test("group returns a map of documents keyed by a user-supplied grouping function", async () => {
  const generator = jsongenerator(groupme);
  const g = await group({
    generator,
    by: (d) => {
      return d.a;
    },
  });
  assertEquals(g.get("a0"), [
    { a: "a0", p: "p0" },
    { a: "a0", b: "b1" },
  ]);
  assertEquals(g.get(undefined), [{ b: "b0" }]);
  assertEquals(g.get("a1"), [{ a: "a1" }]);
});
