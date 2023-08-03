import { useContext } from 'react';

import { CartContext } from '@/contexts/cartContext';

export function DiscountSection() {
  const { discounts, setDiscounts } = useContext(CartContext);

  const onClickDelete = (discount: number, quantity: number) => {
    setDiscounts(
      discounts.filter(
        (_discount) =>
          _discount.discount !== discount && _discount.quantity !== quantity,
      ),
    );
  };

  return (
    <>
      {discounts.length === 0 && (
        <div className={`block`}>
          <p className={`text-gray-600`}>No discounts added.</p>
        </div>
      )}

      {discounts.map(({ label, quantity, discount }) => {
        return (
          <div
            className={`flex items-center justify-between border-b p-4`}
            key={quantity}
          >
            <div>
              <h3 className={`text-lg font-semibold`}>{label}</h3>
              <p className={`text-gray-600`}>{`Discount: ${
                discount * 100
              }% | Quantity: ${quantity}`}</p>
            </div>
            <button
              className={`text-red-500 hover:text-red-600 focus:outline-none`}
              onClick={() => onClickDelete(discount, quantity)}
            >
              Remove
            </button>
          </div>
        );
      })}
    </>
  );
}
