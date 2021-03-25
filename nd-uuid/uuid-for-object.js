import { createAsyncFunction } from "../async-function.js";

import { uuidv4, uuidv5 } from "../deps.js";

export const NAMESPACE = "20d0c0d4-d220-42e7-8629-adf2751146b2"; // Just a random UUID;

export const uuidv5URL = (url) =>
  uuidv5({ value: url, namespace: "6ba7b811-9dad-11d1-80b4-00c04fd430c8" });
// URL namespace from https://tools.ietf.org/html/rfc4122#appendix-C

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
      name = String(await namefx(object, position));
    } else {
      name = JSON.stringify(object);
    }
    if (namespace) {
      uuid = uuidv5({ value: name, namespace });
    } else {
      if (/^https?:\/\/.+/i.test(name)) {
        uuid = uuidv5URL(name);
      } else {
        uuid = uuidv5({ value: name, namespace: NAMESPACE });
      }
    }
  }
  return uuid;
};
