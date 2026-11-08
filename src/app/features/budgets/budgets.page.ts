import { CurrencyPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { FinanceStore } from '../../core/finance.store';

@Component({
  selector: 'app-budgets-page',
  standalone: true,
  imports: [CurrencyPipe, FormsModule, RouterLink],
  templateUrl: './budgets.page.html',
  styleUrl: './budgets.page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BudgetsPage {
  readonly store = inject(FinanceStore);
  readonly editingId = signal<string | null>(null);
  readonly draftLimit = signal(0);

  edit(id: string, limit: number): void { this.editingId.set(id); this.draftLimit.set(limit); }
  save(): void { const id = this.editingId(); if (id && this.draftLimit() > 0) this.store.updateBudget(id, this.draftLimit()); this.editingId.set(null); }

  status(category: string, limit: number): string {
    const percent = this.store.budgetPercent(category, limit);
    if (percent >= 100) return 'Лимит превышен';
    if (percent >= 80) return 'Почти исчерпан';
    return 'В пределах плана';
  }
}
