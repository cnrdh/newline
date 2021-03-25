export default (k) =>
  k
    .trim()
    .toLowerCase()
    .replace(/\s/g, "_")
    .replace(/[^\w%æøåÆØÅµπ.]/g, "?");
