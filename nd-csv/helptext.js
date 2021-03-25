export const helptext = `nd-csv

Emits NDJSON to stdout from CSV/TSV via stdin

Usage:
  nd-csv < file.tsv

Options:
--select key1,key2  Ordered list of columns names to include
--num [-n]          Cast numbers to Number
--std [-s]          Standardise keys
--values [-v]       Emit only values
--help [-h]         Show this helptext
Advanced
--keys /some/path.js  Path to custom transform of column names
--keys-fx             Function name for transforming keys, defaults to "default"
`;
