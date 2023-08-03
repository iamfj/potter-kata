import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Link from 'next/link';
import { twMerge } from 'tailwind-merge';

import './globals.css';

// eslint-disable-next-line @typescript-eslint/quotes
const inter = Inter({ subsets: ['latin'] });

// noinspection JSUnusedGlobalSymbols
export const metadata: Metadata = {
  title: `Potter Kata Coding Challenge`,
  description: `Solution to the Potter Kata Coding Challenge solved by Fabian Jocks @iamfj`,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang={`en`}>
      <body className={twMerge(inter.className, `h-screen w-screen`)}>
        <div
          className={`flex min-h-screen flex-col items-center bg-gray-100 text-gray-800 sm:pt-12`}
        >
          {children}
          <div className={`my-6 flex divide-x-2 divide-gray-300 text-sm`}>
            <span className={`px-4`}>
              &copy; 2023 by{` `}
              <Link
                className={`border-b-2 border-dotted border-gray-800 hover:border-solid`}
                href={`https://github.com/iamfj`}
                target={`_blank`}
              >
                Fabian Jocks
              </Link>
            </span>
            <span className={`px-4`}>
              Images by{` `}
              <Link
                className={`border-b-2 border-dotted border-gray-800 hover:border-solid`}
                href={`https://buecher.de`}
                target={`_blank`}
              >
                buecher.de
              </Link>
            </span>
          </div>
        </div>
      </body>
    </html>
  );
}
