import {
  assert,
  assertEquals,
  assertStringIncludes,
  moduledir as dir,
} from "../test-deps.js";
const { test, run, execPath } = Deno;

const deno = execPath();

const output = (d) => {}; // suppress
const denoRunNDMap = [deno, "run", "nd-map.js"];

const cmdfx = (stmt, args) => [...denoRunNDMap, stmt, ...args];
const decode = (s) => new TextDecoder().decode(s);
const encode = (s) => new TextEncoder().encode(s);

const processRunOptions = ({
  stmt = "",
  cmd,
  args = [],
  stdin = "piped", // => tests must close stdin unless set to null
  stdout = "piped", // => test must read stdout or explicit close
  stderr = "null", // => tests need not close stderr unless piped
  cwd = dir,
} = {}) => ({
  stmt,
  cmd: !cmd ? cmdfx(stmt, args) : cmd,
  cwd,
  stdin,
  stdout,
  stderr,
});

const runNdMap = (stmt, rest) => run(processRunOptions({ stmt, ...rest }));

test(`nd-map --text [cli] should return newline separated JSON strings, ie. "text"`, async () => {
  const p = runNdMap(undefined, { args: ["--text"] });
  assert(p.stdin !== null);

  await p.stdin.write(encode("nd-map --text\nyay\n123\n"));
  p.stdin.close();

  assertEquals(await p.status(), { code: 0, success: true });
  assertEquals(
    new TextDecoder().decode(await p.output()),
    '"nd-map --text"\n"yay"\n"123"\n',
  );

  p.close();
});

test("nd-map [cli] should exit with success status 0", async () => {
  const p = runNdMap(
    "epochYear = new Date(d.epoch).getFullYear(), { epochYear }",
  );
  assert(p.stdin !== null);
  await p.stdin.write(encode(`{ "epoch": 0 }`));
  p.stdin.close();

  assertEquals(await p.status(), { code: 0, success: true });
  const actual = JSON.parse(new TextDecoder().decode(await p.output()));

  assertEquals(actual, { epochYear: 1970 });

  p.close();
});

test(`nd-map [cli] should support unicode eg. { "π": 3.14 }`, async () => {
  const p = runNdMap("{π}=d, Math.abs(π-Math.PI) < 1e-6", {
    stderr: "piped",
  });
  await p.stdin.write(encode(JSON.stringify({ π: Math.PI })));
  p.stdin.close();
  p.stderr.close();

  const actual = JSON.parse(decode(await p.output()));
  assertEquals(actual, true);

  assertEquals(await p.status(), { code: 0, success: true });

  p.close();
});

test(`nd-map [cli] should yield nothing on empty input and empty statement`, async () => {
  const p = runNdMap("");
  await p.stdin.write(encode(``));
  p.stdin.close();

  assertEquals(await p.status(), { code: 0, success: true });
  const actual = decode(await p.output());
  assertEquals(actual, "");

  p.close();
});

test(`nd-map [cli] yields nothing on empty input and empty statement`, async () => {
  const p = runNdMap("");
  await p.stdin.write(encode(``));
  p.stdin.close();

  assertEquals(await p.status(), { code: 0, success: true });
  const actual = decode(await p.output());
  assertEquals(actual, "");

  p.close();
});

// echo -e '{"a":"b"}' | nd-map --ignore-empty=false
// {"a":"b"}
// null
test("nd-mapcommand --blanks yields also blank lines", async () => {
  // const chunks = [];
  // const generator = jsongenerator(`\n{"foo":null}\n\n{"bar":null}\n\n`);
  // const mapfx = (d) => chunks.push(d);
  // await ndmapcommand({
  //   generator,
  //   mapfx,
  //   output,
  //   args: { "ignore-empty": false },
  // });
  // assertEquals(chunks.length, 2);
  // assertEquals(chunks, [{ foo: null }, { bar: null }]);
});

test(`nd-map [cli] should exit with error code on invalid input JSON`, async () => {
  const p = runNdMap("", { stderr: "piped" });
  await p.stdin.write(encode(`{ π }`));
  p.stdin.close();
  p.stderr.close();

  const { code, success } = await p.status();
  assertEquals(code > 0, true);
  assertEquals(success, false);

  const actual = decode(await p.output());
  assertEquals(actual, "");

  p.close();
});

// $ echo '{}' | nd-map '{'
// SyntaxError: Unexpected token c in JSON at position 0[…]
// $ echo $?
// 1
test(`nd-map [cli] should exit with error code on invalid JavaScript statement`, async () => {
  const p = runNdMap("{", {
    stdin: "null",
    stderr: "piped",
  });

  const { code, success } = await p.status();
  assertEquals(code > 0, true);
  assertEquals(success, false);

  const actual = decode(await p.output());
  const actualStderr = decode(await p.stderrOutput());
  assertEquals(actual, "");
  assertStringIncludes(actualStderr, "SyntaxError");

  p.close();
});
