export const arrayAggregate = async ({ generator }) => {
  const array = [];
  for await (const d of generator) {
    array.push(d);
  }
  return array;
};
