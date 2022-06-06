/**
 * Get deep value from object by passing its path to it as string
 * @param {Object} obj Target object to be getting the value from
 * @param {String} path Dot separated string. example: best_book.author.name
 */
export function getValueByPath(obj: Record<string, any>, path: string): any {
  return path
    .split('.')
    .reduce(
      (o: Record<string, any>, key: string | number) =>
        o != null && o[key] != null ? o[key] : null,
      obj,
    );
}
