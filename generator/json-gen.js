import { textgenerator } from "./text-gen.js";

export async function* jsongenerator(ndjsontext, args) {
  for await (const line of textgenerator(ndjsontext, args)) {
    yield line && line.length ? JSON.parse(line) : null;
  }
}
