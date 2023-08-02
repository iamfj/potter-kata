import { useContext } from 'react';

import { CartContext, CartContextType } from '@/contexts/cartContext';
import { Book } from '@/data/book';
import { DiscountCalculator } from '@/lib/discountCalculator';

export const useCartItems = ({
  items,
  setItems,
  discounts,
}: Pick<CartContextType, 'items' | 'setItems' | 'discounts'>) => {
  const calculator = new DiscountCalculator(discounts);
  const {} = useContext(CartContext);

  const addToCart = (book: Book, quantity: number) => {
    setItems([...items, { book: book, quantity }]);
  };

  const removeFromCart = (bookId: number) => {
    setItems(items.filter((item) => item.book.id !== bookId));
  };

  const changeQuantity = (bookId: number, quantity: number) => {
    if (quantity <= 0) {
      return removeFromCart(bookId);
    }

    setItems(
      items.map((item) => {
        if (item.book.id === bookId) {
          return { ...item, quantity };
        }
        return item;
      }),
    );
  };

  const calculateTotal = () => {
    return items
      .map(({ book, quantity }) => book.price * quantity)
      .reduce((a, b) => a + b, 0);
  };

  const calculateDiscounted = () => {
    return calculator.calculateDiscountForCart(items);
  };

  const calculateItemTotal = (bookId: number) => {
    const item = items.find((item) => item.book.id === bookId);
    if (item) {
      return item.book.price * item.quantity;
    }
    return 0;
  };

  return {
    items,
    addToCart,
    removeFromCart,
    changeQuantity,
    calculateTotal,
    calculateDiscounted,
    calculateItemTotal,
  };
};
