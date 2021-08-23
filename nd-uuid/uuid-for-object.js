import { createAsyncFunction } from "../async-function.js";

import { uuidv4, uuidv5 } from "../deps.js";
import { uuidv5URL } from "./v5-url.js";
export const NAMESPACE = "20d0c0d4-d220-42e7-8629-adf2751146b2"; // Just a random UUID;

const v5 = (string, namespace = NAMESPACE) =>
  uuidv5(namespace, new TextEncoder().encode(string));

export const uuidForObject = async (
  object,
  { namefxbody, namespace, random, position } = {},
) => {
  let uuid;

  if (random) {
    uuid = uuidv4();
  } else {
    let name;
    if (namefxbody) {
      const namefx = createAsyncFunction(namefxbody);
      name = await namefx(object, position);
    } else {
      name = JSON.stringify(object);
    }
    if (namespace) {
      uuid = v5(name, namespace);
    } else {
      if (/^https?:\/\/.+/i.test(name)) {
        uuid = uuidv5URL(name);
      } else {
        uuid = v5(name);
      }
    }
  }
  return uuid;
};
