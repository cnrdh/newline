import { extractURL } from "./fetch-cache.js";
import { assertEquals, test } from "../test-deps.js";

const exampleURL = "https://example.com";
const i = 0;
const args = { _: [""] };

test("extractURL [from string]", async () => {
  assertEquals(await extractURL(exampleURL, i, args), exampleURL);
});

test("extractURL [from url property]", async () => {
  const d = { url: exampleURL };
  assertEquals(await extractURL(d, i, args), exampleURL);
});

test("extractURL [from custom --key property]", async () => {
  const d = { iri: exampleURL };
  assertEquals(await extractURL(d, i, { ...args, key: "iri" }), exampleURL);
});

test("extractURL [from user function]", async () => {
  const d = { deep: { ex: exampleURL } };
  const args = { _: ["d.deep.ex"] };
  assertEquals(await extractURL(d, i, args), exampleURL);
});
