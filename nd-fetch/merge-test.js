import { merge } from "./fetch-cache.js";
import { assertArrayIncludes, assertObjectMatch, test } from "../test-deps.js";

const args = { _: [""] };
const d = { foo: null };

test("merge [default]", () => {
  const actual = merge(d, { foo: "bar" });
  const expected = { foo: "bar" };
  assertObjectMatch(actual, expected);
});

test("merge --tuple", () => {
  const actual = merge(d, { foo: "bar" }, { ...args, tuple: true });
  const expected = [d, { foo: "bar" }];
  assertArrayIncludes(actual, expected);
});

test("merge --result-key", () => {
  const actual = merge(
    d,
    { foo: "bar" },
    { ...args, ["result-key"]: "result" },
  );
  const expected = { foo: null, result: { foo: "bar" } };
  assertObjectMatch(actual, expected);
});
