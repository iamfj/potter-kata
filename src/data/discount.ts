export type Discount = {
  books: number;
  discount?: number | undefined | false;
  label?: string | undefined;
};

export function getDiscounts(): Discount[] {
  return [
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
  ];
}

export function getDiscountValues(): number[] {
  return getDiscounts()
    .sort((a, b) => a.books - b.books)
    .map(({ discount }) =>
      discount === undefined ? 0 : discount === false ? 1 : 1 - discount,
    );
}
