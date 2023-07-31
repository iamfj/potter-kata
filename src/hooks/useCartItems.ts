import { useState } from 'react';

import { Book } from '@/data/book';
import { CartItem } from '@/data/cart';
import { Discount } from '@/data/discount';
import { DiscountCalculator } from '@/lib/discountCalculator';

export const useCartItems = (
  initialState: CartItem[],
  discounts: Discount[],
) => {
  const calculator = new DiscountCalculator(discounts);
  const [cartItems, setCartItems] = useState<CartItem[]>(initialState);

  const addToCart = (book: Book, quantity: number) => {
    setCartItems([...cartItems, { book: book, quantity }]);
  };

  const removeFromCart = (bookId: number) => {
    setCartItems(cartItems.filter((item) => item.book.id !== bookId));
  };

  const changeQuantity = (bookId: number, quantity: number) => {
    if (quantity <= 0) {
      return removeFromCart(bookId);
    }

    setCartItems(
      cartItems.map((item) => {
        if (item.book.id === bookId) {
          return { ...item, quantity };
        }
        return item;
      }),
    );
  };

  const calculateTotal = () => {
    return cartItems
      .map(({ book, quantity }) => book.price * quantity)
      .reduce((a, b) => a + b, 0);
  };

  const calculateDiscountedTotal = () => {
    return calculator.calculateDiscountForCart(cartItems);
  };

  const calculateItemTotal = (bookId: number) => {
    const item = cartItems.find((item) => item.book.id === bookId);
    if (item) {
      return item.book.price * item.quantity;
    }
    return 0;
  };

  return {
    cartItems,
    addToCart,
    removeFromCart,
    changeQuantity,
    calculateTotal,
    calculateDiscountedTotal,
    calculateItemTotal,
  };
};
