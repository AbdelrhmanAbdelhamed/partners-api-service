import { sortBy } from '.';

describe('sortBy', () => {
  let data: any[];

  beforeEach(async () => {
    data = [
      { name: 'c' },
      { name: 'a' },
      { name: 'x' },
      { name: 'e' },
      { name: 'b' },
    ];
  });

  it('should be defined', async () => {
    expect(sortBy).toBeDefined();
  });

  it('should sort the given array by name in asc order', async () => {
    expect(sortBy(data, 'name')).toStrictEqual([
      { name: 'a' },
      { name: 'b' },
      { name: 'c' },
      { name: 'e' },
      { name: 'x' },
    ]);
  });

  it('should sort the given array by name in desc order', async () => {
    expect(sortBy(data, 'name', true)).toStrictEqual([
      { name: 'x' },
      { name: 'e' },
      { name: 'c' },
      { name: 'b' },
      { name: 'a' },
    ]);
  });
});
