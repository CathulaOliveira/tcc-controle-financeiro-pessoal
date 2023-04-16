import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TypeGoalListComponent } from './type-goal-list.component';

describe('TypeGoalListComponent', () => {
  let component: TypeGoalListComponent;
  let fixture: ComponentFixture<TypeGoalListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TypeGoalListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TypeGoalListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
