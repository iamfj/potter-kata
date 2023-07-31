import { Discount, getDiscountForBooks } from '@/data/discount';

export class Calculator {
  private discounts: Discount[];
  private memo: Record<string, number> = {};

  constructor(discounts: Discount[]) {
    this.discounts = discounts;
  }

  private price(counts: number[]): number {
    const key = counts.sort().toString();
    if (key in this.memo) {
      return this.memo[key];
    }

    if (counts.length === 0) {
      return 0;
    }

    let minPrice = Infinity;
    for (let i = 1; i <= counts.length; i++) {
      let discount = getDiscountForBooks(this.discounts, i)?.discount;
      if (discount) {
        discount = 1 - discount;
      } else {
        // No discount (just multipied by 1)
        discount = 1;
      }

      for (let j = 0; j <= counts.length - i; j++) {
        const newCounts = [...counts];
        for (let k = j; k < j + i; k++) {
          newCounts[k]--;
        }
        const filteredCounts = newCounts.filter((count) => count > 0);
        const price = i * 8 * discount + this.price(filteredCounts);
        minPrice = Math.min(minPrice, price);
      }
    }

    this.memo[key] = minPrice;
    return minPrice;
  }

  calculatePrice(books: number[]): number {
    const counts: number[] = [];
    for (let i = 0; i < 5; i++) {
      counts.push(books.filter((book) => book === i).length);
    }
    const filteredCounts = counts.filter((count) => count > 0);
    return this.price(filteredCounts);
  }
}
