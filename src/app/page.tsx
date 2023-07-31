'use client';

import { Books } from '@/data/book';
import { Discounts } from '@/data/discount';
import { useCartItems } from '@/hooks/useCartItems';

// noinspection JSUnusedGlobalSymbols
export default function ShoppingCart() {
  const {
    cartItems,
    addToCart,
    removeFromCart,
    changeQuantity,
    calculateTotal,
    calculateDiscountedTotal,
    calculateItemTotal,
  } = useCartItems(
    [
      {
        book: Books[0],
        quantity: 2,
      },
      {
        book: Books[1],
        quantity: 2,
      },
      {
        book: Books[2],
        quantity: 2,
      },
      {
        book: Books[3],
        quantity: 1,
      },
      {
        book: Books[4],
        quantity: 1,
      },
    ],
    Discounts,
  );

  const total = calculateTotal();
  const discountedTotal = calculateDiscountedTotal();
  const isDiscounted = discountedTotal != 0 && discountedTotal < total;

  return (
    <div
      className={`flex min-h-screen items-center justify-center bg-gray-100 text-gray-800`}
    >
      <div
        className={`container max-w-2xl rounded-xl border-2 border-gray-300 bg-white p-6 shadow-lg`}
      >
        <h1 className={`mb-4 text-2xl font-bold`}>Shopping Cart</h1>
        {cartItems.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <>
            {cartItems.map(
              ({ book: { id, name, cover, author, price }, quantity }) => (
                <div className={`mb-4 flex items-center`} key={id}>
                  <img alt={name} className={`w-24 rounded`} src={cover} />
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
                {(isDiscounted && discountedTotal.toFixed(2)) ||
                  total.toFixed(2)}
                {` `}€
              </span>
            </p>
          </>
        )}
      </div>
    </div>
  );
}
