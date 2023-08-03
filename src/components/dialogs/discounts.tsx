import * as Dialog from '@radix-ui/react-dialog';
import { Cross2Icon } from '@radix-ui/react-icons';
import { PropsWithChildren, useContext, useEffect, useState } from 'react';
import { twMerge } from 'tailwind-merge';

import { CartContext } from '@/contexts/cartContext';

export function AddDiscountDialog({ children }: PropsWithChildren) {
  const { discounts, setDiscounts } = useContext(CartContext);
  const [label, setLabel] = useState<string | undefined>(undefined);
  const [quantity, setQuantity] = useState<number | undefined>(undefined);
  const [discount, setDiscount] = useState<number | undefined>(undefined);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);

  useEffect(() => {
    setIsCompleted(
      label !== undefined && quantity !== undefined && discount !== undefined,
    );
  }, [label, quantity, discount]);

  const reset = () => {
    setLabel(undefined);
    setQuantity(undefined);
    setDiscount(undefined);
  };

  const onClickAdd = () => {
    const discountPercentage = (discount ?? 0) / 100;

    if (
      discounts.filter((discount) => discount.quantity === quantity).length !==
      0
    ) {
      setDiscounts(
        discounts.map((_discount) => {
          if (_discount.quantity === quantity) {
            return {
              label: label ?? ``,
              quantity: quantity ?? 0,
              discount: discountPercentage,
            };
          }
          return _discount;
        }),
      );
    } else {
      setDiscounts(
        discounts.concat({
          label: label ?? ``,
          quantity: quantity ?? 0,
          discount: discountPercentage,
        }),
      );
    }
  };

  return (
    <Dialog.Root modal={true} onOpenChange={reset}>
      <Dialog.Trigger asChild>{children}</Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay
          className={`fixed inset-0 bg-blackA9 data-[state=open]:animate-overlayShow`}
        />
        <Dialog.Content
          className={`fixed left-[50%] top-[10%] translate-x-[-50%] rounded-xl bg-white p-6 text-gray-900`}
        >
          <Dialog.Title className={`m-0 text-xl font-semibold text-black`}>
            Add Discount
          </Dialog.Title>
          <Dialog.Description
            className={`text-md mb-5 mt-2 leading-normal text-gray-500`}
          >
            Add discount to your cart
          </Dialog.Description>

          <fieldset className={`mb-3 flex items-center gap-5`}>
            <label className={`text-md w-24 text-right`} htmlFor={`label`}>
              Label
            </label>
            <input
              className={`text-md inline-flex w-full flex-1 items-center justify-center rounded-md border border-gray-400 px-4 py-2 focus:border-gray-500 focus:outline-none`}
              id={`label`}
              placeholder={`10% off`}
              type={`text`}
              value={label}
              onChange={(e) => setLabel(e.target.value)}
            />
          </fieldset>

          <fieldset className={`mb-3 flex items-center gap-5`}>
            <label className={`text-md w-24 text-right`} htmlFor={`quantity`}>
              Quantity <span className={`block text-xs`}>num. of Books</span>
            </label>
            <input
              className={`text-md inline-flex w-full flex-1 items-center justify-center rounded-md border border-gray-400 px-4 py-2 focus:border-gray-500 focus:outline-none`}
              id={`quantity`}
              min={1}
              placeholder={`2`}
              step={1}
              type={`number`}
              value={quantity}
              onChange={(e) => setQuantity(parseInt(e.target.value))}
            />
          </fieldset>

          <fieldset className={`mb-3 flex items-center gap-5`}>
            <label className={`text-md w-24 text-right`} htmlFor={`discount`}>
              Discount <span className={`block text-xs`}>in %</span>
            </label>
            <input
              className={`text-md inline-flex w-full flex-1 items-center justify-center rounded-md border border-gray-400 px-4 py-2 focus:border-gray-500 focus:outline-none`}
              id={`discount`}
              min={1}
              placeholder={`10`}
              step={1}
              type={`number`}
              value={discount}
              onChange={(e) => setDiscount(parseInt(e.target.value))}
            />
          </fieldset>

          <div className={`mt-4 flex`}>
            <Dialog.Close asChild>
              <button
                className={twMerge(
                  `w-full items-center justify-center rounded-lg bg-green4 px-6 py-2 font-medium text-green-800 hover:bg-green-100 focus:outline-none`,
                  !isCompleted && `cursor-not-allowed opacity-50`,
                )}
                disabled={!isCompleted}
                onClick={onClickAdd}
              >
                Add discount
              </button>
            </Dialog.Close>
          </div>
          <Dialog.Close asChild>
            <button
              aria-label={`Close`}
              className={`absolute right-4 top-4 inline-flex`}
            >
              <Cross2Icon
                className={`text-gray-400 hover:text-gray-600`}
                height={18}
                width={18}
              />
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
