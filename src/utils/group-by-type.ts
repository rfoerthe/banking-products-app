import type { BankingProduct, AccountType } from '../types/banking.types';

export function groupByAccountType(
  products: BankingProduct[]
): Record<AccountType, BankingProduct[]> {
  const grouped: Record<AccountType, BankingProduct[]> = {
    checking: [],
    savings: [],
    credit: [],
    investment: [],
  };

  products.forEach((product) => {
    grouped[product.accountType].push(product);
  });

  return grouped;
}

export function getStateColor(state: string): string {
  const colorMap: Record<string, string> = {
    active: '#10b981',
    inactive: '#f59e0b',
    closed: '#6b7280',
    frozen: '#3b82f6',
  };
  return colorMap[state] || '#9ca3af';
}

export function getStateLabel(state: string): string {
  return state.charAt(0).toUpperCase() + state.slice(1);
}
