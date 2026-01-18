export type AccountType = 'checking' | 'savings' | 'credit' | 'investment';
export type AccountState = 'active' | 'inactive' | 'closed' | 'frozen';

export interface BankingProduct {
  id: string;
  iban: string;
  accountType: AccountType;
  accountState: AccountState;
  balance?: number;
  currency?: string;
  accountName?: string;
  lastActivity?: Date;
}
