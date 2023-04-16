import { TestBed } from '@angular/core/testing';

import { TypeGoalService } from './type-goal.service';

describe('TypeGoalService', () => {
  let service: TypeGoalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TypeGoalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
