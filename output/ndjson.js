const { entries, fromEntries, keys, values } = Object;
const { stringify } = JSON;

export const outputFactory = (/*{ format, args } = {}*/) => {
  return ndjson;
};

const ndjsonwrite = (o, { pretty = false, removeEmpty = false } = {}) => {
  o = removeEmpty
    ? fromEntries(entries(o).filter(([, v]) => ![""].includes(v)))
    : o;
  console.log(stringify(o, null, pretty !== true ? undefined : "  "));
};

export const ndjsonvalues = (
  o,
  { position, pretty, write = ndjsonwrite } = {},
) => {
  if (position === 0) {
    write(keys(o), { pretty });
  }
  write(values(o), { pretty });
};

export const ndjson = (
  o,
  { write = ndjsonwrite, position, variant, pretty, ...args } = {},
) => {
  if (o !== undefined) {
    if (variant === "array") {
      ndjsonvalues(o, { position, pretty, write });
    } else {
      const removeEmpty = args["remove-empty"] ? true : false;
      write(o, { pretty, removeEmpty });
    }
  }
};

export const debugOutput = (object, { position, variant }) =>
  console.warn(object, position, variant ?? "");
