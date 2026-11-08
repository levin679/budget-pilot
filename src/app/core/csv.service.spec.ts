import { TestBed } from '@angular/core/testing';
import { CsvService } from './csv.service';

describe('CsvService', () => {
  const transaction = {
    id: '1',
    date: '2026-11-07',
    type: 'expense' as const,
    category: 'Продукты',
    amount: 1250,
    note: 'Магазин, рядом',
    accountId: 'acc-1'
  };

  beforeEach(() => TestBed.configureTestingModule({}));

  it('round-trips a transaction with commas', () => {
    const service = TestBed.inject(CsvService);
    const parsed = service.parse(service.serialize([transaction]));
    expect(parsed[0].note).toBe(transaction.note);
    expect(parsed[0].amount).toBe(1250);
  });

  it('rejects invalid headers', () => {
    const service = TestBed.inject(CsvService);
    expect(() => service.parse('foo,bar\n1,2')).toThrow();
  });
});
