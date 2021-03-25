export const helptext = `nd-count

Counts unique JSON documents

Use:
  cat file.ndjson | nd-count [--key="count"]

Example
  echo -e '{"foo":"bar"}\\n{"foo": "bar"}\\n{"bar":"foo"}' | nd-count --sort '(a,b) => a.count - b.count'
  {"foo":"bar","count":2}
  {"bar":"foo","count":1}

Options
  --key       (Default is "count")
  --sort      Sort expression
`;
