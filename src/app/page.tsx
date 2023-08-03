'use client';

import * as Tabs from '@radix-ui/react-tabs';
import { Add, Github, Information } from '@styled-icons/remix-fill';
import Link from 'next/link';
import { useState } from 'react';

import { AddItemDialog } from '@/components/dialogs/cart';
import { AddDiscountDialog } from '@/components/dialogs/discounts';
import { CartSection } from '@/components/sections/cart';
import { DiscountSection } from '@/components/sections/discounts';
import { CartContext } from '@/contexts/cartContext';
import { Books } from '@/data/book';
import { CartItem } from '@/data/cart';
import { Discount } from '@/data/discount';

// noinspection JSUnusedGlobalSymbols
export default function Page() {
  const [activeTab, setActiveTab] = useState<string>(`tab-cart`);
  const [items, setItems] = useState<CartItem[]>([
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
  ]);
  const [discounts, setDiscounts] = useState<Discount[]>([
    {
      quantity: 2,
      discount: 0.05,
      label: `5%`,
    },
    {
      quantity: 3,
      discount: 0.1,
      label: `10%`,
    },
    {
      quantity: 4,
      discount: 0.2,
      label: `20%`,
    },
    {
      quantity: 5,
      discount: 0.25,
      label: `25%`,
    },
  ]);

  return (
    <CartContext.Provider value={{ items, setItems, discounts, setDiscounts }}>
      <div
        className={`container max-w-2xl border-2 border-gray-300 bg-white p-6 shadow-lg sm:rounded-xl`}
      >
        <div className={`flex items-center justify-center pb-4`}>
          <div className={`flex flex-grow flex-col`}>
            <h1 className={`text-2xl font-bold`}>Potter Kata</h1>
            <p className={`text-sm`}>Coding Challenge</p>
          </div>
          <div className={`flex gap-3`}>
            <Link
              className={`group rounded-xl border-2 border-gray-400 bg-white p-1 duration-200 ease-in-out hover:border-gray-900 hover:bg-gray-900`}
              href={`https://codingdojo.org/kata/Potter`}
              target={`_blank`}
            >
              <Information
                className={`fill-gray-500 duration-200 ease-in-out group-hover:fill-white`}
                size={`30`}
                title={`Task on CodingDojo.org`}
              />
            </Link>
            <Link
              className={`group rounded-xl border-2 border-gray-400 bg-white p-1 duration-200 ease-in-out hover:border-gray-900 hover:bg-gray-900`}
              href={`https://github.com/iamfj/potter-kata`}
              target={`_blank`}
              title={`View the source code on GitHub`}
            >
              <Github
                className={`fill-gray-500 duration-200 ease-in-out group-hover:fill-white`}
                size={`30`}
              />
            </Link>
            {activeTab === `tab-cart` && (
              <AddItemDialog>
                <button
                  className={`group rounded-xl border-2 border-green-500 bg-green-500 p-1 duration-200 ease-in-out hover:border-green-600 hover:bg-white`}
                >
                  <Add
                    className={`fill-white duration-200 ease-in-out group-hover:fill-green-600`}
                    size={`30`}
                  />
                </button>
              </AddItemDialog>
            )}
            {activeTab === `tab-discounts` && (
              <AddDiscountDialog>
                <button
                  className={`group rounded-xl border-2 border-green-500 bg-green-500 p-1 duration-200 ease-in-out hover:border-green-600 hover:bg-white`}
                >
                  <Add
                    className={`fill-white duration-200 ease-in-out group-hover:fill-green-600`}
                    size={`30`}
                  />
                </button>
              </AddDiscountDialog>
            )}
          </div>
        </div>
        <Tabs.Root
          className={`flex w-full flex-col`}
          defaultValue={`tab-cart`}
          onValueChange={(tab) => setActiveTab(tab)}
        >
          <Tabs.List className={`flex`}>
            <Tabs.Trigger
              className={`flex-1 rounded-l-lg border-2 border-r-0 border-solid border-gray-300 py-4 data-[state=active]:bg-gray-100 data-[state=active]:font-semibold`}
              value={`tab-cart`}
            >
              Cart
            </Tabs.Trigger>
            <Tabs.Trigger
              className={`flex-1 rounded-r-lg border-2 border-l-0 border-solid border-gray-300 py-4 data-[state=active]:bg-gray-100 data-[state=active]:font-semibold`}
              value={`tab-discounts`}
            >
              Discounts
            </Tabs.Trigger>
          </Tabs.List>
          <Tabs.Content className={`pt-6`} value={`tab-cart`}>
            <CartSection />
          </Tabs.Content>
          <Tabs.Content className={`pt-6`} value={`tab-discounts`}>
            <DiscountSection />
          </Tabs.Content>
        </Tabs.Root>
      </div>
    </CartContext.Provider>
  );
}
