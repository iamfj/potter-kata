import { describe, expect, it } from '@jest/globals';

import { getDiscountValues, getDiscounts } from '@/data/discount';

describe(`discounts`, () => {
  describe(`getDiscounts`, () => {
    it(`should return no discount for no discounts`, () => {
      expect(getDiscounts()).toEqual([
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
  });

  describe(`getDiscountValues`, () => {
    it(`should return correct sorted discount values`, () => {
      expect(getDiscountValues()).toEqual([0, 1, 0.95, 0.9, 0.8, 0.75]);
    });
  });
});
