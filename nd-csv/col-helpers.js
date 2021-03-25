export const objectifier = ({ parsed, columns, columnMap, blank } = {}) => {
  const o = Object.create(null);

  if (!columnMap) {
    if (columns && columns.map) {
      // create map of actual column positions
      let idx = 0;
      columnMap = new Map(columns.map((col) => [col, idx++]));
    } else {
      // @todo, handle no list of columns, and no column map, ie. just values
      throw "No columns or column map provided";
    }
  }
  for (const [col, idx] of columnMap) {
    let v = parsed[idx];
    if (blank === false && v === "") {
      v = undefined;
    }
    o[col] = v;
  }
  return o;
};
