import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FinanceStore } from '../../core/finance.store';
import { ThemeService } from '../../core/theme.service';

@Component({
  selector: 'app-settings-page',
  standalone: true,
  templateUrl: './settings.page.html',
  styleUrl: './settings.page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SettingsPage {
  readonly store=inject(FinanceStore); readonly theme=inject(ThemeService); readonly message=signal('');
  reset():void{this.store.resetDemo();this.message.set('Демо-данные восстановлены');window.setTimeout(()=>this.message.set(''),2200);}
}
