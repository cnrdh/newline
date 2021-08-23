import { uuidv5URL } from "./v5-url.js";
import { assertEquals, test } from "../test-deps.js";

test("uuidv5URL", async () => {
  assertEquals(
    await uuidv5URL("https://deno.land"),
    "95b12da3-d866-5a0a-9dab-97eea766ba72",
  );
});
