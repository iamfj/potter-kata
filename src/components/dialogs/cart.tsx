import * as Dialog from '@radix-ui/react-dialog';
import { Cross2Icon } from '@radix-ui/react-icons';
import { Check } from '@styled-icons/remix-fill';
import Image from 'next/image';
import { PropsWithChildren, useContext, useState } from 'react';
import { twMerge } from 'tailwind-merge';

import { CartContext } from '@/contexts/cartContext';
import { Books } from '@/data/book';

export function AddItemDialog({ children }: PropsWithChildren) {
  const { items, setItems } = useContext(CartContext);
  const [selectedBook, setSelectedBook] = useState<number | undefined>(
    undefined,
  );

  const onClickAdd = () => {
    if (items.filter((item) => item.book.id === selectedBook).length !== 0) {
      setItems(
        items.map((item) => {
          if (item.book.id === selectedBook) {
            return {
              ...item,
              quantity: item.quantity + 1,
            };
          }
          return item;
        }),
      );
    } else {
      setItems(
        items.concat({
          book: Books.filter((book) => book.id === selectedBook)[0],
          quantity: 1,
        }),
      );
    }
  };

  return (
    <Dialog.Root modal={true} onOpenChange={() => setSelectedBook(undefined)}>
      <Dialog.Trigger asChild>{children}</Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay
          className={`fixed inset-0 bg-blackA9 data-[state=open]:animate-overlayShow`}
        />
        <Dialog.Content
          className={`fixed left-[50%] top-[10%] translate-x-[-50%] rounded-xl bg-white p-6 text-gray-900`}
        >
          <Dialog.Title className={`m-0 text-xl font-semibold text-black`}>
            Add Item
          </Dialog.Title>
          <Dialog.Description
            className={`text-md mb-5 mt-2 leading-normal text-gray-500`}
          >
            Add a book to your cart
          </Dialog.Description>
          <div className={`grid grid-cols-3 gap-4`}>
            {Books.map((book) => (
              <div
                className={`relative cursor-pointer`}
                onClick={() => {
                  if (selectedBook === book.id) {
                    setSelectedBook(undefined);
                  } else {
                    setSelectedBook(book.id);
                  }
                }}
              >
                <Image
                  alt={book.name}
                  className={`w-24 rounded-lg`}
                  height={144}
                  src={book.cover}
                  width={96}
                />
                <div
                  className={twMerge(
                    `absolute bottom-0 left-0 right-0 top-0 h-full w-full rounded-lg bg-gray-800 opacity-0`,
                    book.id === selectedBook && `opacity-80`,
                  )}
                >
                  <Check
                    className={`absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%]`}
                    height={24}
                    width={24}
                  />
                </div>
              </div>
            ))}
          </div>
          <div className={`mt-4 flex`}>
            <Dialog.Close asChild>
              <button
                className={twMerge(
                  `w-full items-center justify-center rounded-lg bg-green4 px-6 py-2 font-medium text-green-800 hover:bg-green-100 focus:outline-none`,
                  selectedBook === undefined && `cursor-not-allowed opacity-50`,
                )}
                disabled={selectedBook === undefined}
                onClick={onClickAdd}
              >
                Add item
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
