export type TransactionType = 'income' | 'expense';
export type AccountType = 'card' | 'cash' | 'savings';

export interface Transaction {
  id: string;
  date: string;
  type: TransactionType;
  category: string;
  amount: number;
  note: string;
  accountId: string;
}

export interface Account {
  id: string;
  name: string;
  type: AccountType;
  balance: number;
  mask: string;
  color: string;
}

export interface Budget {
  id: string;
  category: string;
  limit: number;
  color: string;
}

export interface SavingGoal {
  id: string;
  title: string;
  target: number;
  current: number;
  deadline: string;
  icon: string;
}

export interface FinanceSnapshot {
  transactions: Transaction[];
  accounts: Account[];
  budgets: Budget[];
  goals: SavingGoal[];
}

export interface TransactionFilters {
  query: string;
  type: TransactionType | 'all';
  category: string | 'all';
}

export const EXPENSE_CATEGORIES = ['Жильё', 'Продукты', 'Транспорт', 'Подписки', 'Здоровье', 'Образование', 'Развлечения', 'Покупки'];
export const INCOME_CATEGORIES = ['Зарплата', 'Фриланс', 'Кэшбэк', 'Подарки', 'Прочее'];
