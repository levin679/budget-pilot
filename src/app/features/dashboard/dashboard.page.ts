import { CurrencyPipe, DatePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FinanceStore } from '../../core/finance.store';

@Component({
  selector: 'app-dashboard-page',
  standalone: true,
  imports: [CurrencyPipe, DatePipe, RouterLink],
  templateUrl: './dashboard.page.html',
  styleUrl: './dashboard.page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardPage {
  readonly store = inject(FinanceStore);
  readonly maxSeries = computed(() => Math.max(1, ...this.store.monthlySeries().flatMap((item) => [item.income, item.expense])));
  readonly recent = computed(() => [...this.store.monthTransactions()].slice().sort((a, b) => b.date.localeCompare(a.date)).slice(0, 6));

  monthLabel(month: string): string {
    return ({ '2026-06': 'Июн', '2026-07': 'Июл', '2026-08': 'Авг', '2026-09': 'Сен', '2026-10': 'Окт', '2026-11': 'Ноя' } as Record<string, string>)[month] ?? month;
  }

  bar(value: number): number { return Math.round((value / this.maxSeries()) * 100); }
  accountIcon(type: string): string { return ({ card: '▰', savings: '◒', cash: '₽' } as Record<string, string>)[type] ?? '•'; }
}
