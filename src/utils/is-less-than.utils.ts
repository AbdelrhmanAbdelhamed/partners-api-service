/**
 *
 * @param num1
 * @param num2
 * @param errorMargin The error margin to allow and tolerate the very small difference (default = `0.01`)
 * @returns `true` if `num2` is less than or equal `num1`, otherwise `false`. (respecting the `errorMargin` value)
 */
export function isLessThan(
  num1: number,
  num2: number,
  errorMargin = 0.01,
): boolean {
  return num1 - num2 >= -errorMargin;
}
