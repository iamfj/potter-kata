import { describe, expect, it } from '@jest/globals';

import { Discount, Discounts, getValues } from '@/data/discount';

describe(`discounts`, () => {
  it(`should return expected static discounts`, () => {
    expect(Discounts).toEqual([
      {
        books: 0,
      },
      {
        books: 1,
        discount: false,
      },
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
  });

  describe.each<[string, Discount[], number[]]>([
    [
      `with no discounts`,
      [
        {
          books: 0,
        },
        {
          books: 1,
          discount: false,
        },
      ],
      [0, 1],
    ],
    [
      `with all discounts in order`,
      [
        {
          books: 0,
        },
        {
          books: 1,
          discount: false,
        },
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
      ],
      [0, 1, 0.95, 0.9, 0.8, 0.75],
    ],
    [
      `with all discounts in mixed order`,
      [
        {
          books: 5,
          discount: 0.25,
          label: `25%`,
        },
        {
          books: 0,
        },
        {
          books: 2,
          discount: 0.05,
          label: `5%`,
        },
        {
          books: 4,
          discount: 0.2,
          label: `20%`,
        },
        {
          books: 3,
          discount: 0.1,
          label: `10%`,
        },
        {
          books: 1,
          discount: false,
        },
      ],
      [0, 1, 0.95, 0.9, 0.8, 0.75],
    ],
  ])(`getValues %s`, (_, discounts, expectedValues) => {
    it(`should return correct sorted discount values`, () => {
      expect(getValues(discounts)).toEqual(expectedValues);
    });
  });
});
