const { stringify } = JSON;
const { keys, entries, fromEntries } = Object;

export const buildFacetMaps = async ({ generator }) => {
  const map = new Map(); // Map of unique value sets keyed by term
  const count = new Map(); // Map of counts keyed by "[term,value]"
  const minmax = new Map(); // Map of min max array keyed by term
  let i = 0;
  for await (const object of generator) {
    i++;
    keys(object).map((k) => {
      const v = object[k];
      if (!map.has(k)) {
        map.set(k, new Set());
      }
      const uniq = map.get(k);
      const countkey = stringify([k, v]);
      let [min, max] = minmax.get(k) ?? [];

      if (!min || v < min) {
        min = v;
        minmax.set(k, [min, max]);
      }
      if (!max || v > max) {
        max = v;
        minmax.set(k, [min, max]);
      } // The above even works if values are true|false

      if (!uniq.has(v)) {
        count.set(countkey, 1);
        uniq.add(v);
        map.set(k, uniq);
      } else {
        count.set(countkey, count.get(countkey) + 1);
      }
    });
  }
  return { size: i, map, count, minmax };
};

const sortedFacetEntries = ({ map, count, sorton, sortdir = -1, min, max }) => {
  return [...map] // map of facet sets ie. uniqe term values
    .map(([k, values]) => [k, [...values]]) // expand set to unique values
    .map(([k, values]) => [
      k,
      values
        .map((v) => [v, count.get(stringify([k, v]))])
        .filter(([v, c]) => {
          return c >= min;
        })
        .sort((a, b) => {
          return -1 * (a[sorton] - b[sorton]);
        })
        .slice(0, max),
    ]);
};

export const facets = async ({
  generator,
  min = 0,
  max = 10,
  sorton = 1,
  sortdir = "desc",
}) => {
  const f = {};
  const { size, map, count, minmax } = await buildFacetMaps({
    generator,
  });

  sortedFacetEntries({
    map,
    count,
    sorton,
    sortdir,
    min,
    max,
  }).map(([k, facets]) => {
    const [min, max] = minmax.get(k);
    f[k] = { facets, min, max, lines: size, uniq: map.get(k).size };
  });
  return f;
};
