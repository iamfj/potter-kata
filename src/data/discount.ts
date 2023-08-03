export type Discount = {
  quantity: number;
  discount: number;
  label: string;
};

export function getDiscountForBooks(
  discounts: Discount[],
  books: number,
): Discount | undefined {
  return discounts.find((discount) => discount.quantity === books) || undefined;
}
