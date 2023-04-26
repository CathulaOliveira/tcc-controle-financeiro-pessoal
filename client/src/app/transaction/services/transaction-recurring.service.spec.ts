import { TestBed } from '@angular/core/testing';

import { TransactionRecurringService } from './transaction-recurring.service';

describe('TransactionRecurringService', () => {
  let service: TransactionRecurringService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TransactionRecurringService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
