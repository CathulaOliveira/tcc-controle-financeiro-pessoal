import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GoalChartsComponent } from './goal-charts.component';

describe('GoalChartsComponent', () => {
  let component: GoalChartsComponent;
  let fixture: ComponentFixture<GoalChartsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GoalChartsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GoalChartsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
