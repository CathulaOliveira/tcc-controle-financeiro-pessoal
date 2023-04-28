import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { TransactionType } from '../models/transaction-type';
import { Transaction } from '../models/transaction';
import { TransactionService } from '../services/transaction.service';
import { CategoryService } from 'src/app/category/services/category.service';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { Router } from '@angular/router';
import { Category } from 'src/app/category/models/cotegory';
import { Account } from 'src/app/account/models/account';
import { AccountService } from 'src/app/account/services/account.service';
import { RecurringTransaction } from '../models/transaction-recurring';
import { Goal } from 'src/app/goal/models/goal';
import { RecurringTransactionService } from '../services/transaction-recurring.service';
import { GoalService } from 'src/app/goal/services/goal.service';

export const MY_DATE_FORMATS = {
  parse: {
    dateInput: 'LL',
  },
  display: {
    dateInput: 'dd/MM/yyyy',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@Component({
  selector: 'app-transaction-form',
  templateUrl: './transaction-form.component.html',
  styleUrls: ['./transaction-form.component.css'],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'en-GB' }
  ],
})
export class TransactionFormComponent implements OnInit, OnDestroy {

  form: FormGroup;
  private ngUnsubscribe = new Subject(); 
  idRegistro = 'Novo registro';
  transactionTypeOptions = [
    { value: TransactionType.ENTRADA, label: 'Entrada' },
    { value: TransactionType.SAIDA, label: 'Saída' },
    { value: TransactionType.TRANSFERENCIA, label: 'Transferência entre contas' }
  ];
  categoryOptions: Category[] = [];
  accountOptions: Account[] = [];
  recurringTransactionOptions: RecurringTransaction[] = [];
  goalOptions: Goal[] = [];

  constructor(
    private service: TransactionService,
    private categoryService: CategoryService,
    private accountService: AccountService,
    private recurringTransactionService: RecurringTransactionService,
    private goalService: GoalService,
    private snackBar: SnackbarService,
    private router: Router,
    ) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      id: new FormControl(''),
      description: new FormControl(null, [Validators.required, Validators.maxLength(250)]),
      type: new FormControl(null, Validators.required),
      category: new FormControl(null, Validators.required),
      accountOrigin: new FormControl(null),
      accountDestination: new FormControl(null),
      date: new FormControl(null, Validators.required),
      price: new FormControl(null, Validators.required),
      isRecurringTransaction: new FormControl(false, Validators.required),
      recurringTransaction: new FormControl(null),
      isGoal: new FormControl(false, Validators.required),
      goal: new FormControl(null)
    });

    
    this.getCategoryes();
    this.getAccounts();
    this.getRecurringTransactions();
    this.getGoals();

    this.service.selectedTransaction$
    .pipe(takeUntil(this.ngUnsubscribe))
    .subscribe(transaction => {
      if (transaction) {
        this.form.patchValue(transaction);
        this.idRegistro = 'Id ' + transaction.id;
      }
    }, erro => {
      this.snackBar.open('Erro ao carregar registro.', 'snackbar-warning');
    });
  }

  public objectComparisonFunction = function( option, value ) : boolean {
    return option?.id === value?.id;
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next(null);
    this.ngUnsubscribe.complete();
    this.service.setSelectedTransaction(null);
  }

  onSelectionChangeType(event) {
    switch(event.value) {
      case TransactionType.ENTRADA:
        this.form.get('accountDestination').addValidators(Validators.required);
        this.form.get('accountDestination').updateValueAndValidity();
        this.form.get('accountOrigin').clearValidators();
        this.form.get('accountOrigin').reset();
        this.form.get('accountOrigin').updateValueAndValidity();
        break;
      case TransactionType.SAIDA:
        this.form.get('accountOrigin').addValidators(Validators.required);
        this.form.get('accountOrigin').updateValueAndValidity();
        this.form.get('accountDestination').clearValidators();
        this.form.get('accountDestination').reset();
        this.form.get('accountDestination').updateValueAndValidity();
        break;
      case TransactionType.TRANSFERENCIA:
        this.form.get('accountOrigin').addValidators(Validators.required);
        this.form.get('accountOrigin').updateValueAndValidity();
        this.form.get('accountDestination').addValidators(Validators.required);
        this.form.get('accountDestination').updateValueAndValidity();
        break;
    }
  }

  onSelectionChangeIsRecurringTransaction(event) {
    if(event.value) {
      this.form.get('recurringTransaction').addValidators(Validators.required);
      this.form.get('recurringTransaction').updateValueAndValidity();
    } else {
      this.form.get('recurringTransaction').clearValidators();
      this.form.get('recurringTransaction').reset();
      this.form.get('recurringTransaction').updateValueAndValidity();
    }
  }

  onSelectionChangeIsGoal(event) {
    if(event.value) {
      this.form.get('goal').addValidators(Validators.required);
      this.form.get('goal').updateValueAndValidity();
    } else {
      this.form.get('goal').clearValidators();
      this.form.get('goal').reset();
      this.form.get('goal').updateValueAndValidity();
    }
  }

  disableOptionSelectedAccountOrigin(option: Account): boolean {
    const optionSelected = this.form.get('accountOrigin').value;
    return option?.id === optionSelected?.id;
  }

  disableOptionSelectedAccountDestination(option: Account): boolean {
    const optionSelected = this.form.get('accountDestination').value;
    return option?.id === optionSelected?.id;
  }

  saveClick() {
    if (this.form.valid) {
      const transaction: Transaction = this.form.value;
      if (transaction.id) {
        this.update(transaction);
      } else {
        this.save(transaction);
      }
    } else {
      this.snackBar.open('Campos obrigatórios não preenchidos. Por favor, verifique.', 'snackbar-warning');
      this.form.markAllAsTouched();
    }
  }

  save(transaction: Transaction) {
    this.service.save(transaction).subscribe(res => {
      this.snackBar.open('Registro salvo com sucesso.', 'snackbar-sucess');
      this.resertForm();
    }, erro => {
      this.snackBar.open('Erro ao salvar registro.', 'snackbar-warning')
    });
  }

  update(transaction: Transaction) {
    this.service.update(transaction).subscribe(res => {
      this.snackBar.open('Registro atualizado com sucesso.', 'snackbar-sucess');
      this.resertForm();
    }, erro => {
      this.snackBar.open('Erro ao atualizar registro.', 'snackbar-warning')
    });
  }

  resertForm() {
    this.form.reset();
    this.idRegistro = 'Novo registro';
  }

  backSearch() {
    this.router.navigate(['transaction']);
  }

  getCategoryes() {
    this.categoryService.findAll().subscribe( res => {
      this.categoryOptions = res;
    });
  }

  getAccounts() {
    this.accountService.findByUserLogged().subscribe( res => {
      this.accountOptions = res;
    });
  }

  getRecurringTransactions() {
    this.recurringTransactionService.findByUserLogged().subscribe( res => {
      this.recurringTransactionOptions = res;
    });
  }

  getGoals() {
    this.goalService.findByUserLogged().subscribe( res => {
      this.goalOptions = res;
    });
  }

}
