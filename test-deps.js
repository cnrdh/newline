import {
  dirname,
  fromFileUrl,
  resolve,
} from "https://deno.land/std@0.105.0/path/mod.ts";

export {
  assert,
  assertArrayIncludes,
  assertEquals,
  assertObjectMatch,
  assertStringIncludes,
} from "https://deno.land/std@0.105.0/testing/asserts.ts";

const { test, readTextFile } = Deno;
const { stringify, parse } = JSON;

export { parse, stringify, test };

export const moduledir = dirname(fromFileUrl(import.meta.url));

export const testdataPath = (filename) =>
  resolve(moduledir, "testdata", filename);

export const readTestdata = (filename) => readTextFile(testdataPath(filename));
