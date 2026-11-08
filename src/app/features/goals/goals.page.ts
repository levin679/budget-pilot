import { CurrencyPipe, DatePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FinanceStore } from '../../core/finance.store';

@Component({
  selector: 'app-goals-page',
  standalone: true,
  imports: [CurrencyPipe, DatePipe, FormsModule],
  templateUrl: './goals.page.html',
  styleUrl: './goals.page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GoalsPage {
  readonly store = inject(FinanceStore);
  readonly selectedGoal = signal<string | null>(null);
  readonly contribution = signal(5000);

  percent(current: number, target: number): number { return Math.round((current / target) * 100); }
  remaining(current: number, target: number): number { return Math.max(0, target-current); }
  add(): void { const id=this.selectedGoal(); if(id&&this.contribution()>0)this.store.contribute(id,this.contribution()); this.selectedGoal.set(null); }
}
