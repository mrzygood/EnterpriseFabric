export interface Money {
  readonly amount: number;
  readonly currency: string;
}

export const money = (amount: number, currency = 'PLN'): Money => ({
  amount,
  currency,
});
