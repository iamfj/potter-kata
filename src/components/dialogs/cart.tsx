import * as Dialog from '@radix-ui/react-dialog';
import { Cross2Icon } from '@radix-ui/react-icons';
import { PropsWithChildren } from 'react';

export function AddItemDialog({ children }: PropsWithChildren) {
  return (
    <Dialog.Root modal={true}>
      <Dialog.Trigger asChild>{children}</Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay
          className={`fixed inset-0 bg-blackA9 data-[state=open]:animate-overlayShow`}
        />
        <Dialog.Content
          className={`fixed left-[50%] top-[20%] translate-x-[-50%] translate-y-[-50%] rounded-xl bg-white p-6`}
        >
          <Dialog.Title className={`m-0 text-xl font-semibold text-black`}>
            Add Item
          </Dialog.Title>
          <Dialog.Description
            className={`mb-5 mt-[10px] text-[15px] leading-normal text-mauve11`}
          >
            Add a book to your cart
          </Dialog.Description>
          <div className={`grid`}></div>

          <fieldset className={`mb-[15px] flex items-center gap-5`}>
            <label
              className={`w-[90px] text-right text-[15px] text-violet11`}
              htmlFor={`name`}
            >
              Name
            </label>
            <input
              className={`inline-flex h-[35px] w-full flex-1 items-center justify-center rounded-[4px] px-[10px] text-[15px] leading-none text-violet11 shadow-[0_0_0_1px] shadow-violet7 outline-none focus:shadow-[0_0_0_2px] focus:shadow-violet8`}
              defaultValue={`Pedro Duarte`}
              id={`name`}
            />
          </fieldset>
          <fieldset className={`mb-[15px] flex items-center gap-5`}>
            <label
              className={`w-[90px] text-right text-[15px] text-violet11`}
              htmlFor={`username`}
            >
              Username
            </label>
            <input
              className={`inline-flex h-[35px] w-full flex-1 items-center justify-center rounded-[4px] px-[10px] text-[15px] leading-none text-violet11 shadow-[0_0_0_1px] shadow-violet7 outline-none focus:shadow-[0_0_0_2px] focus:shadow-violet8`}
              defaultValue={`@peduarte`}
              id={`username`}
            />
          </fieldset>
          <div className={`mt-[25px] flex justify-end`}>
            <Dialog.Close asChild>
              <button
                className={`inline-flex h-[35px] items-center justify-center rounded-[4px] bg-green4 px-[15px] font-medium leading-none text-green11 hover:bg-green5 focus:shadow-[0_0_0_2px] focus:shadow-green7 focus:outline-none`}
              >
                Save changes
              </button>
            </Dialog.Close>
          </div>
          <Dialog.Close asChild>
            <button
              aria-label={`Close`}
              className={`absolute right-[10px] top-[10px] inline-flex h-[25px] w-[25px] appearance-none items-center justify-center rounded-full text-violet11 hover:bg-violet4 focus:shadow-[0_0_0_2px] focus:shadow-violet7 focus:outline-none`}
            >
              <Cross2Icon />
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
