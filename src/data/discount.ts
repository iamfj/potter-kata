export type Discount = {
  books: number;
  discount: number;
  label: string;
};

export function getDiscountForBooks(
  discounts: Discount[],
  books: number,
): Discount | undefined {
  return discounts.find((discount) => discount.books === books) || undefined;
}
