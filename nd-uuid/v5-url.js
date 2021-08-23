import { uuidv5 } from "../deps.js";

export const UUID_URL_NAMESPACE = "6ba7b811-9dad-11d1-80b4-00c04fd430c8";
export const uuidv5URL = (url) =>
  uuidv5(UUID_URL_NAMESPACE, new TextEncoder().encode(url));
// URL namespace from https://tools.ietf.org/html/rfc4122#appendix-C
