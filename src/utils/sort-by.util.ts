import { compareBy } from '.';

/**
 * Sorts an array without mutating it. This method returns a new copy of the array.
 * @param array Array to sort
 * @param key Used to sort the elements according to its value
 * @param desc Set it to true if you want to sort in descending order (default = false to sort in ascending order)
 * @returns A new copy of the array after sorting
 */
export function sortBy(array: any[], key: string, desc = false): any {
  return [...array].sort((partnerA, partnerB) =>
    compareBy(partnerA, partnerB, key, desc),
  );
}
