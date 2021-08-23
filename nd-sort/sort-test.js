import { sorton } from "./sort.js";
import { assertEquals, test } from "../test-deps.js";

export const _sorton = ({
  on,
  locales,
  numeric = false,
  reverse = false,
} = {}) =>
  (a, b) =>
    numeric === true
      ? _direction(reverse) * (a[on] - b[on])
      : _direction(reverse) * compareFactory(locales)(a[on], b[on]);

test("sorton", () => {
  const inp = "åaøbæc".split("");
  const act = inp.sort(sorton({ on: "0", locales: "no" }));
  assertEquals(act, "abcæøå".split(""));
});

test("sorton --numeric", () => {
  const inp = [0, 1111, 1, 111, 11].map((n) => ({ n }));
  const act = inp.sort(sorton({ on: "n", numeric: true }));
  assertEquals(
    act.map(({ n }) => n),
    [0, 1, 11, 111, 1111],
  );
});
