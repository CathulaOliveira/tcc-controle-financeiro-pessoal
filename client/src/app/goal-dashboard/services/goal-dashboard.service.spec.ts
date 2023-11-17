import { TestBed } from '@angular/core/testing';

import { GoalDashboardService } from './goal-dashboard.service';

describe('GoalDashboardService', () => {
  let service: GoalDashboardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GoalDashboardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
