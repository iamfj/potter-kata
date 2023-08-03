import { describe, expect, it } from '@jest/globals';

import { Discount, Discounts, getDiscountForBooks } from '@/data/discount';

describe(`discounts`, () => {
  const discount5: Discount = {
    quantity: 2,
    discount: 0.05,
    label: `5%`,
  };

  const discount10: Discount = {
    quantity: 3,
    discount: 0.1,
    label: `10%`,
  };

  const discount20: Discount = {
    quantity: 4,
    discount: 0.2,
    label: `20%`,
  };

  const discount25: Discount = {
    quantity: 5,
    discount: 0.25,
    label: `25%`,
  };

  it(`should return expected static discounts`, () => {
    expect(Discounts).toEqual([discount5, discount10, discount20, discount25]);
  });

  describe.each<[number, Discount[], Discount | undefined]>([
    [0, [discount10, discount25], undefined],
    [1, [discount10, discount25], undefined],
    [2, [discount10, discount25], undefined],
    [3, [discount10, discount25], discount10],
    [4, [discount10, discount25], undefined],
    [5, [discount10, discount25], discount25],
    [0, [discount5, discount10, discount20, discount25], undefined],
    [1, [discount5, discount10, discount20, discount25], undefined],
    [2, [discount5, discount10, discount20, discount25], discount5],
    [3, [discount5, discount10, discount20, discount25], discount10],
    [4, [discount5, discount10, discount20, discount25], discount20],
    [5, [discount5, discount10, discount20, discount25], discount25],
    [6, [discount5, discount10, discount20, discount25], undefined],
  ])(`getDiscountForBooks(%i)`, (books, discounts, expectedDiscount) => {
    it(`should return correct sorted discount values`, () => {
      expect(getDiscountForBooks(discounts, books)).toEqual(expectedDiscount);
    });
  });
});
