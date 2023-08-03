'use client';

import Image from 'next/image';
import { useContext, useEffect, useState } from 'react';

import { CartContext } from '@/contexts/cartContext';
import { useCartItems } from '@/hooks/useCartItems';

export function CartSection(): React.ReactElement {
  const cartContext = useContext(CartContext);
  const {
    removeFromCart,
    changeQuantity,
    calculateTotal,
    calculateDiscounted,
    calculateItemTotal,
  } = useCartItems(cartContext);

  const { items, discounts } = cartContext;

  const [total, setTotal] = useState(() => calculateTotal());
  const [discounted, setDiscounted] = useState(() => calculateDiscounted());
  const [isDiscounted, setIsDiscounted] = useState(
    () => discounted != 0 && discounted < total,
  );

  useEffect(() => {
    const newTotal = calculateTotal();
    const newDiscounted = calculateDiscounted();

    setTotal(newTotal);
    setDiscounted(newDiscounted);
    setIsDiscounted(newDiscounted != 0 && newDiscounted < newTotal);
  }, [items, discounts]);

  return (
    <div>
      {items.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div>
          {items.map(
            ({ book: { id, name, cover, author, price }, quantity }) => (
              <div className={`mb-4 flex items-center`} key={id}>
                <Image
                  alt={name}
                  className={`rounded-lg`}
                  height={144}
                  src={cover}
                  width={96}
                />
                <div className={`ml-4`}>
                  <h2 className={`font-semibold`}>{name}</h2>
                  <p className={`text-sm text-gray-500`}>{author}</p>
                  <p className={`text-gray-600`}>${price}</p>
                  <div className={`mt-2 flex items-center`}>
                    <button
                      className={`text-gray-600 hover:text-red-500 focus:outline-none`}
                      onClick={() => changeQuantity(id, quantity - 1)}
                    >
                      -
                    </button>
                    <span className={`mx-2`}>{quantity}</span>
                    <button
                      className={`text-gray-600 hover:text-green-500 focus:outline-none`}
                      onClick={() => changeQuantity(id, quantity + 1)}
                    >
                      +
                    </button>
                    <button
                      className={`ml-4 text-red-500 hover:text-red-600 focus:outline-none`}
                      onClick={() => removeFromCart(id)}
                    >
                      Remove
                    </button>
                  </div>
                  <p className={`text-gray-600`}>
                    Total: ${calculateItemTotal(id).toFixed(2)}
                  </p>
                </div>
              </div>
            ),
          )}
          <hr className={`my-4`} />
          <p className={`text-lg`}>
            <span className={`font-semibold`}>Total:</span>
            {` `}
            {isDiscounted && (
              <span className={`text-sm text-red-700 line-through`}>
                {total.toFixed(2)} €
              </span>
            )}
            {` `}
            <span className={`font-semibold`}>
              {(isDiscounted && discounted.toFixed(2)) || total.toFixed(2)}
              {` `}€
            </span>
          </p>
        </div>
      )}
    </div>
  );
}
