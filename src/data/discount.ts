export type Discount = {
  books: number;
  discount: number;
  label: string;
};

export const Discounts: Discount[] = [
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
];

export function getDiscountForBooks(
  discounts: Discount[],
  books: number,
): Discount | undefined {
  return discounts.find((discount) => discount.books === books) || undefined;
}
