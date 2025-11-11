export function normalize(s: string) {
  return s
    .normalize("NFD") // split accents
    .replace(/\p{Diacritic}/gu, "") // remove accents
    .toLowerCase()
    .trim()
    .replace(/\s+/g, " "); // collapse internal spaces
}
