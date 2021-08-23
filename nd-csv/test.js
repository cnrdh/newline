import { csvgenerator } from "./csv-gen.js";
import { assertEquals, test, testdataPath } from "../test-deps.js";

test("nd-csv transforms CSV to newline-delimited JSON documents", async () => {
  const chunks = [];
  const reader = await Deno.open(testdataPath("123.csv"));
  for await (const object of csvgenerator(reader)) {
    chunks.push(object);
  }
  reader.close();
  const exp =
    `{"one":"1","two":"2","three":"3"}\n{"one":"ein","two":"to","three":"tri"}\n{"one":"en","two":"to","three":"tre"}`;
  assertEquals(chunks.map(JSON.stringify).join("\n"), exp);
});
