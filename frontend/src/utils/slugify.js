export function slugify(name) {
  return name
    .toString()
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')   // non-alphanumeric → hyphens
    .replace(/^-+|-+$/g, '');      // trim leading/trailing hyphens
}
