import { describe, expect, it } from '@jest/globals';

import { Book } from '@/data/book';
import { CartItem } from '@/data/cart';
import { DiscountCalculator } from '@/lib/discountCalculator';

describe(`discountCalculator`, () => {
  const book1: Book = {
    id: 0,
    name: `Harry Potter and the Sorcerer's Stone (Harry Potter, Book 1): Volume 1`,
    cover: `https://bilder.buecher.de/produkte/50/50911/50911974n.jpg`,
    author: `J.K. Rowling`,
    price: 8,
  };

  const book2: Book = {
    id: 1,
    name: `Harry Potter and the Chamber of Secrets (Harry Potter, Book 2): Volume 2`,
    cover: `https://bilder.buecher.de/produkte/50/50910/50910238n.jpg`,
    author: `J.K. Rowling`,
    price: 8,
  };

  const book3: Book = {
    id: 2,
    name: `Harry Potter and the Prisoner of Azkaban (Harry Potter, Book 3): Volume 3`,
    cover: `https://bilder.buecher.de/produkte/50/50909/50909887z.jpg`,
    author: `J.K. Rowling`,
    price: 8,
  };

  const book4: Book = {
    id: 3,
    name: `Harry Potter and the Goblet of Fire (Harry Potter, Book 4): Volume 4`,
    cover: `https://bilder.buecher.de/produkte/50/50911/50911375n.jpg`,
    author: `J.K. Rowling`,
    price: 8,
  };

  const book5: Book = {
    id: 4,
    name: `Harry Potter and the Order of the Phoenix (Harry Potter, Book 5): Volume 5`,
    cover: `https://bilder.buecher.de/produkte/50/50909/50909780n.jpg`,
    author: `J.K. Rowling`,
    price: 8,
  };

  describe(`constructor`, () => {
    it(`should return 0 for no items`, () => {
      const calculator = new DiscountCalculator([]);
      expect(calculator.calculateDiscountForCart([])).toBe(0);
    });
  });

  describe.each<[string, CartItem[], number]>([
    [``, [], 0],
    [`1`, [{ book: book1, quantity: 1 }], 8],
    [`2`, [{ book: book2, quantity: 1 }], 8],
    [`3`, [{ book: book3, quantity: 1 }], 8],
    [`4`, [{ book: book4, quantity: 1 }], 8],
    [`5`, [{ book: book5, quantity: 1 }], 8],
    [`1, 1, 1`, [{ book: book1, quantity: 3 }], 8 * 3],
    [
      `1, 2`,
      [
        { book: book1, quantity: 1 },
        { book: book2, quantity: 1 },
      ],
      8 * 2 * 0.95,
    ],
    [
      `1, 3, 5`,
      [
        { book: book1, quantity: 1 },
        { book: book3, quantity: 1 },
        { book: book5, quantity: 1 },
      ],
      8 * 3 * 0.9,
    ],
    [
      `1, 2, 3, 5`,
      [
        { book: book1, quantity: 1 },
        { book: book2, quantity: 1 },
        { book: book3, quantity: 1 },
        { book: book5, quantity: 1 },
      ],
      8 * 4 * 0.8,
    ],
    [
      `1, 2, 3, 4, 5`,
      [
        { book: book1, quantity: 1 },
        { book: book2, quantity: 1 },
        { book: book3, quantity: 1 },
        { book: book4, quantity: 1 },
        { book: book5, quantity: 1 },
      ],
      8 * 5 * 0.75,
    ],
    [
      `1, 1, 2`,
      [
        { book: book1, quantity: 2 },
        { book: book2, quantity: 1 },
      ],
      8 + 8 * 2 * 0.95,
    ],
    [
      `1, 1, 2, 2`,
      [
        { book: book1, quantity: 2 },
        { book: book2, quantity: 2 },
      ],
      2 * (8 * 2 * 0.95),
    ],
    [
      `1, 1, 2, 3, 3, 4`,
      [
        { book: book1, quantity: 2 },
        { book: book2, quantity: 1 },
        { book: book3, quantity: 2 },
        { book: book4, quantity: 1 },
      ],
      8 * 4 * 0.8 + 8 * 2 * 0.95,
    ],
    [
      `1, 2, 2, 3, 4, 5`,
      [
        { book: book1, quantity: 1 },
        { book: book2, quantity: 2 },
        { book: book3, quantity: 1 },
        { book: book4, quantity: 1 },
        { book: book5, quantity: 1 },
      ],
      8 + 8 * 5 * 0.75,
    ],
    [
      `1, 1, 2, 2, 3, 3, 3, 4, 5`,
      [
        { book: book1, quantity: 2 },
        { book: book2, quantity: 2 },
        { book: book3, quantity: 2 },
        { book: book4, quantity: 1 },
        { book: book5, quantity: 1 },
      ],
      2 * (8 * 4 * 0.8),
    ],
    [
      `1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 4, 5, 5, 5, 5`,
      [
        { book: book1, quantity: 5 },
        { book: book2, quantity: 5 },
        { book: book3, quantity: 4 },
        { book: book4, quantity: 5 },
        { book: book5, quantity: 4 },
      ],
      3 * (8 * 5 * 0.75) + 2 * (8 * 4 * 0.8),
    ],
  ])(`calculateDiscountForCart(%s)`, (_, books, expected) => {
    const calculator = new DiscountCalculator([
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

    it(`should be equal`, () => {
      expect(calculator.calculateDiscountForCart(books)).toEqual(expected);
    });
  });
});
