import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TypeGoalFormComponent } from './type-goal-form.component';

describe('TypeGoalFormComponent', () => {
  let component: TypeGoalFormComponent;
  let fixture: ComponentFixture<TypeGoalFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TypeGoalFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TypeGoalFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
