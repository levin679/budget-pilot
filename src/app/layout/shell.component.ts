import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { ThemeService } from '../core/theme.service';

@Component({
  selector: 'app-shell',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, RouterOutlet],
  templateUrl: './shell.component.html',
  styleUrl: './shell.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ShellComponent {
  readonly theme = inject(ThemeService);
  readonly menuOpen = signal(false);
  readonly navigation = [
    { path: '/dashboard', label: 'Обзор', icon: '⌂' },
    { path: '/transactions', label: 'Операции', icon: '⇄' },
    { path: '/budgets', label: 'Бюджеты', icon: '◎' },
    { path: '/goals', label: 'Цели', icon: '◇' },
    { path: '/reports', label: 'Отчёты', icon: '▥' },
    { path: '/settings', label: 'Настройки', icon: '⚙' }
  ];
  close(): void { this.menuOpen.set(false); }
}
