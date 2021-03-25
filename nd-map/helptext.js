export const helptext = `nd-map

Transforms newline separated JSON or other text data with JavaScript.

A user-supplied function statement is run on each line piped from STDIN.
The last statement is automatically writted to STDOUT as JSON plus a newline (\\n).

Usage: nd-map < file.ndjson

Examples:

echo -e '1\\n2\\n3' | nd-map --text 'r=+d, π = Math.PI, area = π*r**2, { r, area, π }'
{"r":1,"area":3.141592653589793,"π":3.141592653589793}
{"r":2,"area":12.566370614359172,"π":3.141592653589793}
{"r":3,"area":28.274333882308138,"π":3.141592653589793}


Source code:
  https://github.com/cnrdh/newline

Options:
        --debug
    -h, --help      Prints help information

        --silent     Disables output
        --select
        --text
    -v  --values`;
