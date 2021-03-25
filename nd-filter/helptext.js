export const helptext = `nd-filter`;
// generic bbox filter
// cat export.ndjson | nd-filter '[w,s,e,n] = JSON.parse(args.bbox), lat=d[args.lat], lon=d[args.lon], lat >= s && lat <= n && lon >= w && lon <= e' --bbox '[21.296000, 70.041000, 21.296050, 70.041100]' --lat 0 --lon 1
