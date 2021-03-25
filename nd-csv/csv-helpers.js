import { parseCSV } from "../deps.js";
import { objectifier } from "./col-helpers.js";

export const detectSeparator = (csvtextline) => {
  if (/^(.+?)\t/.test(csvtextline.trimLeft())) {
    return "\t";
  }
  if (/^(.+?);/.test(csvtextline.trimLeft())) {
    return ";";
  }
  if (/^(.+?),/.test(csvtextline.trimLeft())) {
    return ",";
  }
  if (/^(.+?)\s/.test(csvtextline.trimLeft())) {
    return " ";
  }
  return ",";
};

export const objectFromCSVLine = async ({
  line,
  position,
  separator,
  columns,
  columnMap,
  values = false,
}) => {
  const parsed = await arrayFromCSVLine(line, { separator });
  return values === true ? parsed : objectifier({ parsed, columns, columnMap });
};

export const arrayFromCSVLine = async (line, { separator } = {}) =>
  (await parseCSV(line, { separator }))[0];

export const t = (k, map) => (map.has(k) ? map.get(k) : k);

export const normalizeKey = (k) => k.toLowerCase().replace(/\W/g, "_");
