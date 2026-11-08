import { FinanceSnapshot } from './finance.models';

export const FINANCE_SEED: FinanceSnapshot = {
  accounts: [
    { id: 'acc-1', name: 'Основная карта', type: 'card', balance: 84250, mask: '•• 4821', color: '#0f9f86' },
    { id: 'acc-2', name: 'Накопительный счёт', type: 'savings', balance: 236400, mask: '12.5% годовых', color: '#3b82f6' },
    { id: 'acc-3', name: 'Наличные', type: 'cash', balance: 7800, mask: 'Кошелёк', color: '#f59e0b' }
  ],
  budgets: [
    { id: 'b1', category: 'Продукты', limit: 24000, color: '#0f9f86' },
    { id: 'b2', category: 'Транспорт', limit: 9000, color: '#3b82f6' },
    { id: 'b3', category: 'Развлечения', limit: 12000, color: '#8b5cf6' },
    { id: 'b4', category: 'Покупки', limit: 16000, color: '#f97316' },
    { id: 'b5', category: 'Подписки', limit: 3500, color: '#ec4899' }
  ],
  goals: [
    { id: 'g1', title: 'Финансовая подушка', target: 360000, current: 236400, deadline: '2027-05-01', icon: '◒' },
    { id: 'g2', title: 'Новый ноутбук', target: 170000, current: 68000, deadline: '2027-02-15', icon: '▣' },
    { id: 'g3', title: 'Путешествие', target: 120000, current: 43500, deadline: '2027-07-01', icon: '✈' }
  ],
  transactions: [
    { id: 'tr1', date: '2026-11-07', type: 'expense', category: 'Продукты', amount: 2840, note: 'Супермаркет', accountId: 'acc-1' },
    { id: 'tr2', date: '2026-11-06', type: 'income', category: 'Зарплата', amount: 118000, note: 'Зарплата за октябрь', accountId: 'acc-1' },
    { id: 'tr3', date: '2026-11-06', type: 'expense', category: 'Транспорт', amount: 1450, note: 'Проездной', accountId: 'acc-1' },
    { id: 'tr4', date: '2026-11-05', type: 'expense', category: 'Подписки', amount: 799, note: 'Музыкальный сервис', accountId: 'acc-1' },
    { id: 'tr5', date: '2026-11-04', type: 'expense', category: 'Образование', amount: 5900, note: 'Курс по Angular', accountId: 'acc-1' },
    { id: 'tr6', date: '2026-11-03', type: 'income', category: 'Фриланс', amount: 22000, note: 'Лендинг для клиента', accountId: 'acc-1' },
    { id: 'tr7', date: '2026-11-03', type: 'expense', category: 'Продукты', amount: 3650, note: 'Продукты на неделю', accountId: 'acc-1' },
    { id: 'tr8', date: '2026-11-02', type: 'expense', category: 'Развлечения', amount: 3200, note: 'Кино и кафе', accountId: 'acc-1' },
    { id: 'tr9', date: '2026-11-01', type: 'expense', category: 'Жильё', amount: 33000, note: 'Аренда квартиры', accountId: 'acc-1' },
    { id: 'tr10', date: '2026-10-30', type: 'income', category: 'Кэшбэк', amount: 1860, note: 'Кэшбэк за октябрь', accountId: 'acc-1' },
    { id: 'tr11', date: '2026-10-28', type: 'expense', category: 'Покупки', amount: 7480, note: 'Одежда', accountId: 'acc-1' },
    { id: 'tr12', date: '2026-10-25', type: 'expense', category: 'Здоровье', amount: 2900, note: 'Аптека', accountId: 'acc-1' },
    { id: 'tr13', date: '2026-10-20', type: 'expense', category: 'Продукты', amount: 8900, note: 'Покупки за неделю', accountId: 'acc-1' },
    { id: 'tr14', date: '2026-10-15', type: 'income', category: 'Фриланс', amount: 18000, note: 'Поддержка сайта', accountId: 'acc-1' },
    { id: 'tr15', date: '2026-10-06', type: 'income', category: 'Зарплата', amount: 112000, note: 'Зарплата за сентябрь', accountId: 'acc-1' },
    { id: 'tr16', date: '2026-10-01', type: 'expense', category: 'Жильё', amount: 33000, note: 'Аренда квартиры', accountId: 'acc-1' },
    { id: 'tr17', date: '2026-09-28', type: 'expense', category: 'Развлечения', amount: 6100, note: 'Концерт', accountId: 'acc-1' },
    { id: 'tr18', date: '2026-09-22', type: 'expense', category: 'Покупки', amount: 12100, note: 'Наушники', accountId: 'acc-1' },
    { id: 'tr19', date: '2026-09-06', type: 'income', category: 'Зарплата', amount: 108000, note: 'Зарплата за август', accountId: 'acc-1' },
    { id: 'tr20', date: '2026-09-01', type: 'expense', category: 'Жильё', amount: 33000, note: 'Аренда квартиры', accountId: 'acc-1' },
    { id: 'tr21', date: '2026-08-06', type: 'income', category: 'Зарплата', amount: 105000, note: 'Зарплата за июль', accountId: 'acc-1' },
    { id: 'tr22', date: '2026-08-01', type: 'expense', category: 'Жильё', amount: 32000, note: 'Аренда квартиры', accountId: 'acc-1' },
    { id: 'tr23', date: '2026-07-06', type: 'income', category: 'Зарплата', amount: 101000, note: 'Зарплата за июнь', accountId: 'acc-1' },
    { id: 'tr24', date: '2026-07-01', type: 'expense', category: 'Жильё', amount: 32000, note: 'Аренда квартиры', accountId: 'acc-1' },
    { id: 'tr25', date: '2026-06-06', type: 'income', category: 'Зарплата', amount: 98000, note: 'Зарплата за май', accountId: 'acc-1' },
    { id: 'tr26', date: '2026-06-01', type: 'expense', category: 'Жильё', amount: 32000, note: 'Аренда квартиры', accountId: 'acc-1' }
  ]
};
