import { CurrencyPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { FinanceStore } from '../../core/finance.store';

@Component({
  selector: 'app-reports-page',
  standalone: true,
  imports: [CurrencyPipe],
  templateUrl: './reports.page.html',
  styleUrl: './reports.page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ReportsPage {
  readonly store = inject(FinanceStore);
  readonly maxExpense = computed(() => Math.max(1, ...this.store.categoryExpenses().map((item) => item.amount)));
  readonly donut = computed(() => {
    const palette = ['#0f9f86','#3b82f6','#8b5cf6','#f97316','#ec4899','#f59e0b','#ef4444','#64748b'];
    const total = this.store.expenses() || 1;
    let cursor = 0;
    const stops = this.store.categoryExpenses().map((item,index) => {
      const start=cursor; cursor += item.amount/total*100; return `${palette[index%palette.length]} ${start}% ${cursor}%`;
    });
    return `conic-gradient(${stops.join(',')})`;
  });
  print():void{window.print();}
  categoryBar(amount:number):number{return Math.round(amount/this.maxExpense()*100);}
}
