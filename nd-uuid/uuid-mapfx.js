import { uuidForObject } from "./uuid-for-object.js";

export const uuidmapfx = async (d, i, args) => {
  const { v4, name, namespace, key, random } = args;

  const uuid = await uuidForObject(d, {
    namefxbody: name,
    v5: name ? true : false,
    namespace,
    random: random ?? v4,
    position: i,
  });
  if (uuid) {
    if (args.text) {
      return `${uuid ?? ""} ${d}`.trim();
    } else {
      d[key ?? "uuid"] = uuid;
    }
  }
  return d;
};
