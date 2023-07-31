import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Link from 'next/link';

import './globals.css';

// eslint-disable-next-line @typescript-eslint/quotes
const inter = Inter({ subsets: ['latin'] });

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
      <body className={inter.className}>
        {children}
        <div
          className={`fixed bottom-0 left-0 right-0 p-4 text-center text-sm text-gray-900`}
        >
          solved by{` `}
          <Link
            className={`text-blue-800 hover:text-blue-400`}
            href={`https://github.com/iamfj`}
            target={`_blank`}
          >
            fabian jocks
          </Link>
          {` `}|{` `}
          <Link
            className={`text-blue-800 hover:text-blue-400`}
            href={`https://github.com/iamfj/potter-kata`}
            target={`_blank`}
          >
            open this project on github
          </Link>
          {` `}|{` `}Credits to{` `}
          <Link
            className={`text-blue-800 hover:text-blue-400`}
            href={`https://codingdojo.org/kata/Potter/`}
            target={`_blank`}
          >
            the original challenge
          </Link>
        </div>
      </body>
    </html>
  );
}
