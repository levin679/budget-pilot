import { computed, effect, inject, Injectable, signal } from '@angular/core';
import { BrowserStorageService } from './browser-storage.service';
import { FINANCE_SEED } from './finance.seed';
import { FinanceSnapshot, Transaction, TransactionFilters } from './finance.models';

const STORAGE_KEY = 'budget-pilot-v1';
const ACTIVE_MONTH = '2026-11';

function seed(): FinanceSnapshot {
  return structuredClone(FINANCE_SEED);
}

@Injectable({ providedIn: 'root' })
export class FinanceStore {
  private readonly storage = inject(BrowserStorageService);
  private readonly snapshot = signal<FinanceSnapshot>(this.storage.read(STORAGE_KEY, seed()));
  readonly selectedMonth = signal(ACTIVE_MONTH);
  readonly filters = signal<TransactionFilters>({ query: '', type: 'all', category: 'all' });

  readonly transactions = computed(() => this.snapshot().transactions);
  readonly accounts = computed(() => this.snapshot().accounts);
  readonly budgets = computed(() => this.snapshot().budgets);
  readonly goals = computed(() => this.snapshot().goals);

  readonly monthTransactions = computed(() => this.transactions().filter((item) => item.date.startsWith(this.selectedMonth())));
  readonly filteredTransactions = computed(() => {
    const query = this.filters().query.trim().toLocaleLowerCase('ru');
    return this.monthTransactions().filter((item) => {
      const queryMatch = !query || `${item.note} ${item.category}`.toLocaleLowerCase('ru').includes(query);
      const typeMatch = this.filters().type === 'all' || item.type === this.filters().type;
      const categoryMatch = this.filters().category === 'all' || item.category === this.filters().category;
      return queryMatch && typeMatch && categoryMatch;
    }).sort((a, b) => b.date.localeCompare(a.date));
  });

  readonly income = computed(() => this.sum(this.monthTransactions().filter((item) => item.type === 'income')));
  readonly expenses = computed(() => this.sum(this.monthTransactions().filter((item) => item.type === 'expense')));
  readonly cashflow = computed(() => this.income() - this.expenses());
  readonly savingRate = computed(() => this.income() ? Math.round((this.cashflow() / this.income()) * 100) : 0);
  readonly totalBalance = computed(() => this.accounts().reduce((sum, account) => sum + account.balance, 0));
  readonly categories = computed(() => [...new Set(this.transactions().map((item) => item.category))].sort());

  readonly categoryExpenses = computed(() => {
    const totals = new Map<string, number>();
    this.monthTransactions().filter((item) => item.type === 'expense').forEach((item) => totals.set(item.category, (totals.get(item.category) ?? 0) + item.amount));
    return [...totals.entries()].map(([category, amount]) => ({ category, amount })).sort((a, b) => b.amount - a.amount);
  });

  readonly monthlySeries = computed(() => {
    const months = ['2026-06', '2026-07', '2026-08', '2026-09', '2026-10', '2026-11'];
    return months.map((month) => {
      const items = this.transactions().filter((item) => item.date.startsWith(month));
      return {
        month,
        income: this.sum(items.filter((item) => item.type === 'income')),
        expense: this.sum(items.filter((item) => item.type === 'expense'))
      };
    });
  });

  constructor() {
    effect(() => this.storage.write(STORAGE_KEY, this.snapshot()));
  }

  spentByCategory(category: string): number {
    return this.monthTransactions().filter((item) => item.type === 'expense' && item.category === category).reduce((sum, item) => sum + item.amount, 0);
  }

  budgetPercent(category: string, limit: number): number {
    return Math.min(100, Math.round((this.spentByCategory(category) / Math.max(1, limit)) * 100));
  }

  addTransaction(input: Omit<Transaction, 'id'>): void {
    const transaction: Transaction = { ...input, id: `tr-${Date.now()}-${Math.random().toString(16).slice(2)}` };
    this.snapshot.update((state) => ({ ...state, transactions: [transaction, ...state.transactions] }));
  }

  addImported(items: Omit<Transaction, 'id'>[]): void {
    const withIds = items.map((item, index) => ({ ...item, id: `import-${Date.now()}-${index}` }));
    this.snapshot.update((state) => ({ ...state, transactions: [...withIds, ...state.transactions] }));
  }

  deleteTransaction(id: string): void {
    this.snapshot.update((state) => ({ ...state, transactions: state.transactions.filter((item) => item.id !== id) }));
  }

  updateBudget(id: string, limit: number): void {
    this.snapshot.update((state) => ({ ...state, budgets: state.budgets.map((item) => item.id === id ? { ...item, limit } : item) }));
  }

  contribute(goalId: string, amount: number): void {
    this.snapshot.update((state) => ({
      ...state,
      goals: state.goals.map((goal) => goal.id === goalId ? { ...goal, current: Math.min(goal.target, goal.current + amount) } : goal)
    }));
  }

  setQuery(query: string): void { this.filters.update((filters) => ({ ...filters, query })); }
  setType(type: TransactionFilters['type']): void { this.filters.update((filters) => ({ ...filters, type })); }
  setCategory(category: string): void { this.filters.update((filters) => ({ ...filters, category })); }
  resetFilters(): void { this.filters.set({ query: '', type: 'all', category: 'all' }); }
  resetDemo(): void { this.snapshot.set(seed()); this.resetFilters(); this.selectedMonth.set(ACTIVE_MONTH); }

  private sum(items: Transaction[]): number {
    return items.reduce((sum, item) => sum + item.amount, 0);
  }
}
