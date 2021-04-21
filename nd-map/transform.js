const { create, keys } = Object;

const isNumber = (n) =>
  !["", undefined, null, true, false].includes(n) && !Number.isNaN(Number(n));

const defaultSelectfx = (object, position, args) => {
  const keys = args.select.split(",");
  const sel = create(null);
  keys.map((k) => (sel[k] = object[k] ?? null)); // Injecting null keeps key ordering consistent
  return sel;
};

export async function* transform({
  generator,
  mapfx = (d) => d,
  selectfx = defaultSelectfx,
  position = 0,
  args,
}) {
  const { select, numeric } = args;

  for await (let object of generator) {
    // --select field1,field2
    if (select && select.length > 0) {
      object = selectfx(object, position, args);
    }
    // --numeric
    if (numeric) {
      keys(object).map((k) => {
        const n = object[k];
        if (isNumber(n)) {
          object[k] = Number(n);
        }
      });
    }

    yield await mapfx(object, position, args);
    position++;
  }
}
