import { createAsyncFunction } from "../async-function.js";

import { cache as cachefetch } from "https://deno.land/x/cache@0.2.13/mod.ts";

// Extract URL to fetch:
// From function body in first param (like nd-map)
// Or from "url" property in d
// Or from custom property using --key=
// Or from JSON string d
export const extractURL = async (d, i, args) => {
  const {
    _: [fxbody],
  } = args;

  const key = args.key ?? "url";

  if (fxbody) {
    const urlfx = createAsyncFunction(fxbody);
    return await urlfx(d, i);
  } else if (d[key]) {
    return d[key];
  } else {
    return d;
  }
};

// Merge incoming d with fetch result
export const merge = (d, result, args) => {
  if (args && args["result-key"]) {
    const k = args["result-key"];
    d[k] = result;
    return d;
  } else if (args && args["tuple"]) {
    return [d, result];
  } else {
    return { ...d, ...result };
  }
};

const fetchJSON = async (url, { cache }) => {
  if (cache) {
    const file = await cachefetch(url);
    return JSON.parse(await Deno.readTextFile(file.path));
  } else {
    const r = await fetch(url);
    if (r.ok) {
      return r.json();
    }
  }
};

export const fetchCache = async (d, i, args) => {
  const url = await extractURL(d, i, args);
  const result = await fetchJSON(url, args);
  if (args.merge) {
    return merge(d, result, args);
  } else {
    return result;
  }
};
