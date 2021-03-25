import { parseCSV, readLines } from "../deps.js";
import {
  arrayFromCSVLine,
  detectSeparator,
  normalizeKey,
  objectFromCSVLine,
} from "../nd-csv/csv-helpers.js";

import { isEmptyOrComment } from "../generator/common-helpers.js";

const { keys } = Object;
// create map column name => to actual position in CSV (array index)
const columnNamePositionMap = ({ columns, actualColumns }) =>
  new Map(
    columns.map((usercol) => [
      usercol,
      actualColumns.findIndex((act) => act === usercol),
    ]),
  );

export async function* csvgenerator(
  reader,
  {
    columnTransformer,
    separator,
    columns,
    values,
    ignore = isEmptyOrComment,
    debug,
    objectifier = objectFromCSVLine,
    ...args
  } = {},
) {
  let position = 0;
  let columnMap;

  for await (const line of readLines(reader)) {
    if (ignore(line) !== true) {
      if (debug) {
        console.warn({ line });
      }
      if (!separator) {
        separator = detectSeparator(line);
      }

      // FIXME Handle repeated keys
      // che@:~/@cnrdh/newline$ echo -e 'n,n\n1,2' | nd-csv
      // {"n":"1"}
      if (position === 0) {
        const actualColumns = await arrayFromCSVLine(line.trim(), {
          separator,
        });
        if (values) {
          args.first = true;
        }
        if (!columns) {
          columns = actualColumns;
        }
        if (columnTransformer) {
          const fixedColumns = columns.map((k) => columnTransformer(k));
          const fixedActualColumns = actualColumns.map((k) =>
            columnTransformer(k)
          );
          columnMap = columnNamePositionMap({
            columns: fixedColumns,
            actualColumns: fixedActualColumns,
          });
        } else {
          columnMap = columnNamePositionMap({ columns, actualColumns });
        }
      }

      const object = await objectifier({
        line,
        position,
        separator,
        values,
        columns,
        columnMap,
      });

      if (position > 0 || args.first) {
        yield object;
      }
      position++; // not increased for empty lines
    }
  }
}
