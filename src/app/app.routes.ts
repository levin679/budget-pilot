import { Routes } from '@angular/router';
import { ShellComponent } from './layout/shell.component';

export const routes: Routes = [
  { path:'', component:ShellComponent, children:[
    { path:'dashboard', title:'Обзор — BudgetPilot', loadComponent:()=>import('./features/dashboard/dashboard.page').then(m=>m.DashboardPage) },
    { path:'transactions', title:'Операции — BudgetPilot', loadComponent:()=>import('./features/transactions/transactions.page').then(m=>m.TransactionsPage) },
    { path:'budgets', title:'Бюджеты — BudgetPilot', loadComponent:()=>import('./features/budgets/budgets.page').then(m=>m.BudgetsPage) },
    { path:'goals', title:'Цели — BudgetPilot', loadComponent:()=>import('./features/goals/goals.page').then(m=>m.GoalsPage) },
    { path:'reports', title:'Отчёты — BudgetPilot', loadComponent:()=>import('./features/reports/reports.page').then(m=>m.ReportsPage) },
    { path:'settings', title:'Настройки — BudgetPilot', loadComponent:()=>import('./features/settings/settings.page').then(m=>m.SettingsPage) },
    { path:'', pathMatch:'full', redirectTo:'dashboard' }
  ]},
  { path:'**', redirectTo:'dashboard' }
];
