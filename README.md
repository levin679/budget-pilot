# BudgetPilot

Angular-приложение для личных финансов: счета, операции, бюджеты, накопительные цели, CSV-обмен и аналитические отчёты без внешних chart-библиотек.

## Возможности

- дашборд капитала, доходов, расходов и нормы сбережений;
- таблица операций с поиском и фильтрами;
- добавление, удаление, импорт и экспорт операций в CSV;
- месячные лимиты по категориям с inline-редактированием;
- цели накоплений и пополнение прогресса;
- отчёты: структура расходов, сравнение категорий и автоматические выводы;
- Signals/computed/effect, Reactive Forms, lazy routes, localStorage, dark mode;
- unit-тест собственного CSV-парсера.

## Запуск

Требуется Node.js 22.12+ в ветке 22.x.

```bash
nvm use
npm install
npm start
```

## Проверки

```bash
npm run verify
```

Workflow `.github/workflows/ci.yml` выполняет typecheck, unit-тесты и production build для push и pull request.

CSV ожидает заголовок:

```text
date,type,category,amount,note,accountId
```

См. [`PORTFOLIO.md`](PORTFOLIO.md) и [`docs/architecture.md`](docs/architecture.md).
