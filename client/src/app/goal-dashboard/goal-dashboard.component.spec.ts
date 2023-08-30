import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GoalDashboardComponent } from './goal-dashboard.component';

describe('GoalDashboardComponent', () => {
  let component: GoalDashboardComponent;
  let fixture: ComponentFixture<GoalDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GoalDashboardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GoalDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
