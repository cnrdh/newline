// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/AsyncFunction
export const AsyncFunction = Object.getPrototypeOf(async () => {}).constructor;

export const defaultClosure =
  `const { entries, fromEntries, keys, values } = Object;
  const { log, warn, error } = console;
  const { stringify, parse } = JSON;
`;

export const defaultArguments = "d,i,args";

export const createAsyncFunction = (
  body,
  { argstring = defaultArguments, closure = defaultClosure } = {},
) => new AsyncFunction(argstring, `${closure}; return ${body};`);
// Notice: The constants defined in the closure are reserved and cannot be re-assigned.
// If you use the default closure and need to import eg. a "parse" function use --imports with alias, or:
// 'mod = await import("parse.js"), _parse=mod.parse,  _parse(d)'

// Construct function from function body in first command line argument
export const functionFactory = ({ args, fallback = (d) => d }) => {
  const {
    _: [fxbody],
  } = args;
  return fxbody ? createAsyncFunction(fxbody) : fallback;
};
