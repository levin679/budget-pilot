import { CurrencyPipe, DatePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CsvService } from '../../core/csv.service';
import { EXPENSE_CATEGORIES, INCOME_CATEGORIES, TransactionType } from '../../core/finance.models';
import { FinanceStore } from '../../core/finance.store';
import { EmptyStateComponent } from '../../shared/empty-state.component';

@Component({
  selector: 'app-transactions-page',
  standalone: true,
  imports: [CurrencyPipe, DatePipe, ReactiveFormsModule, EmptyStateComponent],
  templateUrl: './transactions.page.html',
  styleUrl: './transactions.page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TransactionsPage {
  readonly store = inject(FinanceStore);
  private readonly csv = inject(CsvService);
  private readonly fb = inject(FormBuilder);
  readonly modalOpen = signal(false);
  readonly importMessage = signal('');
  readonly expenseCategories = EXPENSE_CATEGORIES;
  readonly incomeCategories = INCOME_CATEGORIES;

  readonly form = this.fb.nonNullable.group({
    date: ['2026-11-07', Validators.required],
    type: ['expense' as TransactionType, Validators.required],
    category: ['Продукты', Validators.required],
    amount: [1000, [Validators.required, Validators.min(1)]],
    note: ['', [Validators.required, Validators.minLength(3)]],
    accountId: ['acc-1', Validators.required]
  });

  categoriesForForm(): string[] { return this.form.controls.type.value === 'income' ? this.incomeCategories : this.expenseCategories; }

  setType(value: string): void { this.store.setType(value as 'income' | 'expense' | 'all'); }

  onFormTypeChange(): void {
    this.form.controls.category.setValue(this.categoriesForForm()[0]);
  }

  submit(): void {
    if (this.form.invalid) { this.form.markAllAsTouched(); return; }
    this.store.addTransaction(this.form.getRawValue());
    this.modalOpen.set(false);
    this.form.controls.note.setValue('');
  }

  exportCsv(): void {
    const blob = new Blob([this.csv.serialize(this.store.filteredTransactions())], { type: 'text/csv;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url; link.download = `budget-pilot-${this.store.selectedMonth()}.csv`; link.click();
    URL.revokeObjectURL(url);
  }

  async importFile(event: Event): Promise<void> {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (!file) return;
    try {
      const items = this.csv.parse(await file.text());
      this.store.addImported(items);
      this.importMessage.set(`Импортировано операций: ${items.length}`);
    } catch (error) {
      this.importMessage.set(error instanceof Error ? error.message : 'Не удалось прочитать CSV');
    }
    input.value = '';
  }
}
