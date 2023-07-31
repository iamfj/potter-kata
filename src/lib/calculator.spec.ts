import { describe, expect, it } from '@jest/globals';

import { Calculator } from '@/lib/calculator';

describe(`calculator`, () => {
  describe(`constructor`, () => {
    it(`should return 0 for no items`, () => {
      const calculator = new Calculator([]);
      expect(calculator.calculatePrice([])).toBe(0);
    });
  });

  describe(`calculatePrice`, () => {
    const calculator = new Calculator([
      {
        books: 2,
        discount: 0.05,
        label: `5%`,
      },
      {
        books: 3,
        discount: 0.1,
        label: `10%`,
      },
      {
        books: 4,
        discount: 0.2,
        label: `20%`,
      },
      {
        books: 5,
        discount: 0.25,
        label: `25%`,
      },
    ]);

    it.each([
      [[], 0],
      [[1], 8],
      [[2], 8],
      [[3], 8],
      [[4], 8],
      [[1, 1, 1], 8 * 3],
      [[0, 1], 8 * 2 * 0.95],
      [[0, 2, 4], 8 * 3 * 0.9],
      [[0, 1, 2, 4], 8 * 4 * 0.8],
      [[0, 1, 2, 3, 4], 8 * 5 * 0.75],
      [[0, 0, 1], 8 + 8 * 2 * 0.95],
      [[0, 0, 1, 1], 2 * (8 * 2 * 0.95)],
      [[0, 0, 1, 2, 2, 3], 8 * 4 * 0.8 + 8 * 2 * 0.95],
      [[0, 1, 1, 2, 3, 4], 8 + 8 * 5 * 0.75],
      [[0, 0, 1, 1, 2, 2, 3, 4], 2 * (8 * 4 * 0.8)],
      [
        [0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 3, 4, 4, 4, 4],
        3 * (8 * 5 * 0.75) + 2 * (8 * 4 * 0.8),
      ],
    ])(`.calculatePrice(%s) and expect it to be %i`, (books, expected) => {
      expect(calculator.calculatePrice(books)).toEqual(expected);
    });
  });
});
