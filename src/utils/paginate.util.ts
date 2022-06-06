/**
 *
 * @param array to paginate
 * @param limit number of items per page
 * @param page page number
 * @returns new array after pagination
 */
export function paginate(array: any[], limit: number, page: number): any {
  if (limit == null || limit <= 0) return array;
  return array.slice((page - 1) * limit, page * limit);
}
