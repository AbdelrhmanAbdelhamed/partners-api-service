import { getValueByPath } from '.';

/**
 * Function used in conjunction with the built in sortBy util function to determine the order of the elements.
 * Tailored especially for array of objects not primitives.
 * @param objA
 * @param objB
 * @param key Used to sort the elements according to its value
 * @param desc Set it to true if you want to sort in descending order (default = false to sort in ascending order)
 * @returns (`-1` in case of ascending order, otherwise `1`) if the first argument is less than the second argument,
 * `zero` if they're equal, and (`1` in case of ascending order, otherwise `-1`) if the first argument is greater than the second argument.
 */
export function compareBy(
  objA: Record<string, any>,
  objB: Record<string, any>,
  key: string,
  desc = false,
): number {
  const valueA = getValueByPath(objA, key);
  const valueB = getValueByPath(objB, key);

  if (valueA < valueB) {
    return desc ? 1 : -1;
  }
  if (valueA > valueB) {
    return desc ? -1 : 1;
  }
  return 0;
}
