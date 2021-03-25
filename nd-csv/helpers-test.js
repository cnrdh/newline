import { detectSeparator } from "./csv-helpers.js";

import { assertEquals, test } from "../test-deps.js";

test("nd-csv auto-detects separator", () => {
  const [tab, comma, semi, space] = [
    "1\t2\t3\n",
    "1,2,3\n",
    "a;b;c\n",
    "one two",
  ];
  assertEquals(detectSeparator(tab), "\t");
  assertEquals(detectSeparator(comma), ",");
  assertEquals(detectSeparator(semi), ";");
  assertEquals(detectSeparator(space), " ");
});
