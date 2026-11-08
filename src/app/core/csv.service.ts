import { Injectable } from '@angular/core';
import { Transaction, TransactionType } from './finance.models';

@Injectable({ providedIn: 'root' })
export class CsvService {
  serialize(transactions: Transaction[]): string {
    const header = ['date', 'type', 'category', 'amount', 'note', 'accountId'];
    const rows = transactions.map((item) => [
      item.date,
      item.type,
      item.category,
      String(item.amount),
      item.note,
      item.accountId
    ]);
    return [header, ...rows]
      .map((row) => row.map((cell) => this.escape(cell)).join(','))
      .join('\n');
  }

  parse(csv: string): Omit<Transaction, 'id'>[] {
    const rows = this.readRows(csv.trim());
    if (rows.length < 2) return [];
    const [header, ...data] = rows;
    const index = Object.fromEntries(header.map((name, position) => [name.trim(), position]));
    const required = ['date', 'type', 'category', 'amount', 'note', 'accountId'];
    if (required.some((field) => index[field] === undefined)) {
      throw new Error('CSV должен содержать колонки: date,type,category,amount,note,accountId');
    }

    return data.filter((row) => row.some(Boolean)).map((row) => {
      const type = row[index['type']] as TransactionType;
      const amount = Number(row[index['amount']]);
      if (!['income', 'expense'].includes(type) || !Number.isFinite(amount) || amount <= 0) {
        throw new Error('CSV содержит некорректный тип или сумму операции');
      }
      return {
        date: row[index['date']],
        type,
        category: row[index['category']],
        amount,
        note: row[index['note']],
        accountId: row[index['accountId']]
      };
    });
  }

  private escape(value: string): string {
    const normalized = value.replaceAll('"', '""');
    return /[",\n]/.test(normalized) ? `"${normalized}"` : normalized;
  }

  private readRows(csv: string): string[][] {
    const rows: string[][] = [];
    let row: string[] = [];
    let cell = '';
    let quoted = false;

    for (let index = 0; index < csv.length; index += 1) {
      const char = csv[index];
      const next = csv[index + 1];
      if (char === '"' && quoted && next === '"') {
        cell += '"';
        index += 1;
      } else if (char === '"') {
        quoted = !quoted;
      } else if (char === ',' && !quoted) {
        row.push(cell);
        cell = '';
      } else if ((char === '\n' || char === '\r') && !quoted) {
        if (char === '\r' && next === '\n') index += 1;
        row.push(cell);
        rows.push(row);
        row = [];
        cell = '';
      } else {
        cell += char;
      }
    }

    row.push(cell);
    rows.push(row);
    return rows;
  }
}
