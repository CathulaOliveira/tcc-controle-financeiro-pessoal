import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionRecurringFormComponent } from './transaction-recurring-form.component';

describe('TransactionRecurringFormComponent', () => {
  let component: TransactionRecurringFormComponent;
  let fixture: ComponentFixture<TransactionRecurringFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TransactionRecurringFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TransactionRecurringFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
