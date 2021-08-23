import { NAMESPACE, uuidForObject } from "./uuid-for-object.js";
import { assertEquals, test } from "../test-deps.js";

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
  // $ echo '{ "rfc": "4122" }' | nd-uuid --v5 --name '`https://tools.ietf.org/html/rfc${d.rfc}`' --key=rfc-uuid
  // {"rfc":"4122","rfc-uuid":"4a7c9d41-0178-5be0-8573-2328b4085067"}
  assertEquals(
    await uuidForObject(
      { rfc: "4122" },
      { namefxbody: "`https://tools.ietf.org/html/rfc${d.rfc}`" },
    ),
    "4a7c9d41-0178-5be0-8573-2328b4085067",
  );
});
