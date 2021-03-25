import { count } from "./count.js";
import { jsongenerator } from "../generator/json-gen.js";
import { assertEquals, readTestdata, test } from "../test-deps.js";

test("count returns a map counting the number of unique documents", async () => {
  const generator = jsongenerator(
    `{ "foo": "bar"} \n {"foo": "bar"} \n {"bar":"foo"} \n {"foo":null} \n`,
  );
  const actual = await count({ generator });
  const exp = new Map([
    [`{"foo":"bar"}`, 2],
    [`{"foo":null}`, 1],
    [`{"bar":"foo"}`, 1],
  ]);
  assertEquals(actual, exp);
});
