import { Book } from '@/data/book';

export type CartItem = {
  book: Book;
  quantity: number;
};

export function getBookIds(cartItems: CartItem[]): number[] {
  return cartItems.flatMap((item) => Array(item.quantity).fill(item.book.id));
}
