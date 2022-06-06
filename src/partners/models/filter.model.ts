export abstract class Filter<T> {
  abstract apply(data: T[], ...args: any[]): T[];

  static applyAll<T>(filters: Filter<T>[], data: T[], ...args: any[]) {
    return filters.reduce(
      (filteredData, filter) => filter.apply(filteredData, ...args),
      data,
    );
  }
}
