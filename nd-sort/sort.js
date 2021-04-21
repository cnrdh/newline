let _locales;
const { state } = await Deno.permissions.request({ name: "env" });

const envLocales = (key = "LANGUAGE") => {
  if (!_locales) {
    _locales = state === "granted"
      ? Deno.env
        .get(key)
        .split(":")
        .map((l) => l.replace("_", "-"))
        .map(Intl.getCanonicalLocales)
      : undefined;
  }
  return _locales;
};

// Language sensitive compare function factory
const compareFactory = (locales = envLocales(), options) => {
  const { compare } = new Intl.Collator(locales, options);
  return compare;
};

const _direction = (reverse) => (reverse === true ? -1 : 1);

// Language sensitive JSON string sort
export const sortjson = ({ locales, reverse = false } = {}) =>
  (a, b) => {
    const json = JSON.stringify;
    return _direction(reverse) * compareFactory(locales)(json(a), json(b));
  };

// Language sensitive sort on JSON key
// nd-sort --on key1 --lang no
export const sorton = ({
  on,
  locales,
  numeric = false,
  reverse = false,
} = {}) =>
  (a, b) =>
    numeric === true
      ? _direction(reverse) * (a[on] - b[on])
      : _direction(reverse) * compareFactory(locales)(a[on], b[on]);

// Bring your own search function
// nd-sort 'v=[a,b].map(d=>d.key1), cmp=new Intl.Collator("no").compare, cmp(...v)'
export const createSortFunction = ({ sortfxbody, reverse, locales }) =>
  sortfxbody && sortfxbody.length
    ? Function("a", "b", "return " + sortfxbody)
    : sortjson({ reverse, locales });
