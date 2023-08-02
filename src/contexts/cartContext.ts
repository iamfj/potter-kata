import { Dispatch, SetStateAction, createContext } from 'react';

import { CartItem } from '@/data/cart';
import { Discount } from '@/data/discount';

export type CartContextType = {
  items: CartItem[];
  setItems: Dispatch<SetStateAction<CartItem[]>>;
  discounts: Discount[];
  setDiscounts: Dispatch<SetStateAction<Discount[]>>;
};

export const CartContext = createContext<CartContextType>({
  items: [],
  setItems: () => {
    console.log(`context was not initialized`);
  },
  discounts: [],
  setDiscounts: () => {
    console.log(`context was not initialized`);
  },
});
