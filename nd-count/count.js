const defaultKey = (d) => JSON.stringify(d);

export const count = async ({ generator, key = defaultKey } = {}) => {
  const countMap = new Map();
  for await (const d of generator) {
    const k = key(d);
    if (!countMap.has(k)) {
      countMap.set(k, 1);
    } else {
      countMap.set(k, 1 + countMap.get(k));
    }
  }
  return countMap;
};
