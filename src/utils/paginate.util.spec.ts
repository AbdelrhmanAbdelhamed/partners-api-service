import { paginate } from '.';

describe('paginate', () => {
  let data: any[];
  let limit: number;
  let page: number;

  beforeEach(async () => {
    data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17];
    limit = 10;
    page = 1;
  });

  it('should be defined', async () => {
    expect(paginate).toBeDefined();
  });

  it('should paginate the given array and return the first 10 elements', async () => {
    expect(paginate(data, limit, page)).toStrictEqual([
      1, 2, 3, 4, 5, 6, 7, 8, 9, 10,
    ]);
  });

  it('should paginate the given array and return the last 7 elements', async () => {
    page = 2;
    expect(paginate(data, limit, page)).toStrictEqual([
      11, 12, 13, 14, 15, 16, 17,
    ]);
  });

  it('should return all elements', async () => {
    limit = 0;
    expect(paginate(data, limit, page)).toStrictEqual(data);
  });
});
