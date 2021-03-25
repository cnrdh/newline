export const group = async ({ by, generator }) => {
  const grp = new Map();
  for await (const d of generator) {
    const v = await by(d);
    if (!grp.has(v)) {
      grp.set(v, [d]);
    } else {
      grp.set(v, [...grp.get(v), d]);
    }
  }
  return grp;
};
