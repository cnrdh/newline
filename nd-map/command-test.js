import { ndmapcommand } from "./command.js";
import { textgenerator } from "../generator/text-gen.js";
import { jsongenerator } from "../generator/json-gen.js";
import { assertEquals, test } from "../test-deps.js";

const output = (d) => {};

// echo -e '\r\n{"a": "a"}\r\n{"b": "b"}\r\n{"æøå": "ÆØÅ"}'  | nd-map
// {"a":"a"}
// {"b":"b"}
// {"æøå":"ÆØÅ"}
test("ndmapcommand", async () => {
  const chunks = [];
  const generator = jsongenerator(
    `\r\n{"a": "a"}\r\n{"b": "b"}\r\n{"æøå": "ÆØÅ"}`
  );

  const mapfx = (d) => {
    const mapped = Object.values(d)[0];
    chunks.push(mapped);
  };
  await ndmapcommand({ generator, mapfx, output });
  const [a, b, nor] = chunks;
  assertEquals(3, chunks.length);
  assertEquals(a, "a");
  assertEquals(b, "b");
  assertEquals(nor, "ÆØÅ");
});

// echo -e 'a\nb\nc' | nd-map --text
// "a"
// "b"
// "c"
test("ndmapcommand --text", async () => {
  const chunks = [];
  const generator = textgenerator("a\nb\nc");
  const mapfx = (d) => chunks.push(d);
  await ndmapcommand({ generator, mapfx, output });
  assertEquals(chunks, ["a", "b", "c"]);
});

// echo "0" | deno run nd-map.js '{ epoch: new Date(+d)}' --text
// "1970-01-01T00:00:00.000Z"
test("ndmapcommand [number]", async () => {
  const chunks = [];
  const generator = jsongenerator("0");
  const mapfx = (d) => chunks.push(new Date(d));
  await ndmapcommand({ generator, mapfx, output });
  const [epoch] = chunks;
  assertEquals(new Date(epoch), new Date("1970-01-01T00:00:00.000Z"));
});

// echo "null" | nd-map
// null
test("ndmapcommand [null]", async () => {
  const chunks = [];
  const generator = jsongenerator("null");
  const mapfx = (d) => chunks.push(d);
  await ndmapcommand({ generator, mapfx, output });
  const [nullvalue] = chunks;
  assertEquals(nullvalue, null);
});

// Duplicates are removed --detect? and fix?
// echo '{ "a": "a", "a": "b"}' |nd-map
// {"a":"b"}
