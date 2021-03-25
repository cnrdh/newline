import { NAMESPACE, uuidForObject } from "./uuid-for-object.js";
import { assertEquals, stringify, test } from "../test-deps.js";

// $ echo '{"a": "a" }' | nd-uuid
// {"a":"a","uuid":"c8221c5a-a4a9-5f98-9d69-1089c7ca7c72"}
test("uuidForObject should return a v5 SHA-1 UUID string using input JSON object as name", async () => {
  const a = "c8221c5a-a4a9-5f98-9d69-1089c7ca7c72";
  assertEquals(await uuidForObject({ a: "a" }), a);
  assertEquals(await uuidForObject({ a: "a" }, { namespace: NAMESPACE }), a);
  //assertEquals(await uuidForObject({ foo: "bar" }), a);
});

test("uuidForObject should use URL namspace when name is an URL", async () => {
  // $ uuidgen --sha1 --namespace @url --name "https://deno.land"
  // 95b12da3-d866-5a0a-9dab-97eea766ba72
  assertEquals(
    await uuidForObject({ url: "https://deno.land" }, { namefxbody: "d.url" }),
    "95b12da3-d866-5a0a-9dab-97eea766ba72",
  );

  // $ echo '{ "rfc": "4122" }' | nd-uuid --v5 --name '`https://tools.ietf.org/html/rfc${d.rfc}`' --key=rfc-uuid
  // {"rfc":"4122","rfc-uuid":"4a7c9d41-0178-5be0-8573-2328b4085067"}
  //
  // $ uuidgen --sha1 --namespace @url --name "https://tools.ietf.org/html/rfc4122"
  // 4a7c9d41-0178-5be0-8573-2328b4085067
  assertEquals(
    await uuidForObject(
      { rfc: "4122" },
      { namefxbody: "`https://tools.ietf.org/html/rfc${d.rfc}`" },
    ),
    "4a7c9d41-0178-5be0-8573-2328b4085067",
  );
});

// 4a7c9d41-0178-5be0-8573-2328b4085067
// Add UUID (v4/random)
// $ echo '{}' | nd-uuid --random --key=id
// {"id":"fdc9b6f6-173a-4383-ab45-057c22e88d48"}

// $ echo '{}' | nd-uuid --v4
// {"uuid":"9a5266ff-7c50-464a-a109-d3224e8eb181"}

// Add UUID v5 SHA-1 with URL namespace
// $ echo '{"foo": "bar"}' | nd-uuid
// {"foo":"bar","uuid":"11c7e137-6f68-5512-85ba-84b37a276de5"}
//
// $ echo '{"foo": "bar"}' | nd-uuid --name=d --v5
// {"foo":"bar","uuid":"11c7e137-6f68-5512-85ba-84b37a276de5"}
//
// $ echo '{"foo": "bar"}' | nd-uuid --name=d.foo --v5
// {"foo":"bar","uuid":"236d7907-5932-5887-9d6f-eb53a715b37c"}
//
// $ echo '{"foo": "bar"}' | nd-uuid --name=d.foo
// {"foodhw":"bar","uuid":"236d7907-5932-5887-9d6f-eb53a715b37c"}
