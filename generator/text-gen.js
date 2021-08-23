import { readLines, StringReader } from "../deps.js";
import { isEmptyOrComment } from "./common-helpers.js";

export async function* textgenerator(text, args = {}) {
  const reader = typeof text === "string" ? new StringReader(text) : text;
  let { ignore } = args;
  ignore = ignore ?? isEmptyOrComment;
  let i = 0;
  for await (const line of readLines(reader)) {
    const ign = ignore(line, i++, args);
    if (args.blanks === true || ign !== true) {
      yield line;
    }
  }
}
