import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
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

@Component({
  selector: 'app-transaction-form',
  templateUrl: './transaction-form.component.html',
  styleUrls: ['./transaction-form.component.css'],
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
    this.createForm();
    this.getCategories();
    this.getAccounts();
    this.getRecurringTransactions();
    this.getGoals();
    this.getItemSelected();
  }

  ngOnDestroy(): void {
    this.resetItemSelected();
  }

  createForm() {
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
  }

  getItemSelected() {
    this.service.selectedTransaction$
    .pipe(takeUntil(this.ngUnsubscribe))
    .subscribe(transaction => {
      if (transaction) {
        this.form.patchValue(transaction);
        this.idRegistro = 'Id ' + transaction.id;
      }
    }, erro => {
      this.snackBar.open('Erro ao carregar registro. ' + erro.message, 'snackbar-warning');
    });
  }

  resetItemSelected() {
    this.ngUnsubscribe.next(null);
    this.ngUnsubscribe.complete();
    this.service.setSelectedTransaction(null);
  }

  objectComparisonFunction = function( option, value ) : boolean {
    return option?.id === value?.id;
  }

  onSelectionChangeType(event) {
    switch(event.value) {
      case TransactionType.ENTRADA:
        this.addValidatorsField('accountDestination');
        this.resetField('accountOrigin');
        break;
      case TransactionType.SAIDA:
        this.addValidatorsField('accountOrigin');
        this.resetField('accountDestination');
        break;
      case TransactionType.TRANSFERENCIA:
        this.addValidatorsField('accountOrigin');
        this.addValidatorsField('accountDestination');
        break;
    }
  }

  onSelectionChangeIsRecurringTransaction(event) {
    if(event.checked) {
      this.addValidatorsField('recurringTransaction');
    } else {
      this.resetField('recurringTransaction');
    }
  }

  onSelectionChangeIsGoal(event) {
    if(event.checked) {
      this.addValidatorsField('goal');
    } else {
      this.resetField('goal');
    }
  }

  onSelectionChangeTrasactionRecurring(event) {
    if (event.value) {
      const recurringTransaction: RecurringTransaction = event.value
      this.form.get('description').setValue(recurringTransaction.description);
      this.form.get('type').setValue(recurringTransaction.type);
      this.form.get('category').setValue(recurringTransaction.category);
      this.form.get('accountOrigin').setValue(recurringTransaction.accountOrigin);
      this.form.get('accountDestination').setValue(recurringTransaction.accountDestination);
      this.form.get('date').setValue(recurringTransaction.dueDate);
      this.form.get('price').setValue(recurringTransaction.price);
    }
  }

  resetField(fieldName: string) {
    this.form.get(fieldName).clearValidators();
    this.form.get(fieldName).reset();
    this.form.get(fieldName).updateValueAndValidity();
  }

  addValidatorsField(fieldName: string) {
    this.form.get(fieldName).addValidators(Validators.required);
    this.form.get(fieldName).updateValueAndValidity();
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
      this.backSearch();
    }, erro => {
      this.snackBar.open('Erro ao salvar registro. ' + erro.message, 'snackbar-warning')
    });
  }

  update(transaction: Transaction) {
    this.service.update(transaction).subscribe(res => {
      this.snackBar.open('Registro atualizado com sucesso.', 'snackbar-sucess');
      this.backSearch();
    }, erro => {
      this.snackBar.open('Erro ao atualizar registro. ' + erro.message, 'snackbar-warning')
    });
  }

  backSearch() {
    this.router.navigate(['transaction']);
  }

  getCategories() {
    this.categoryService.findAll().subscribe( res => {
      this.categoryOptions = res;
    }, erro => {
      this.snackBar.open('Erro ao listar Categorias. ' + erro.message, 'snackbar-warning')
    });
  }

  getAccounts() {
    this.accountService.findByUserLogged().subscribe( res => {
      this.accountOptions = res;
    }, erro => {
      this.snackBar.open('Erro ao listar Contas Bancárias. ' + erro.message, 'snackbar-warning')
    });
  }

  getRecurringTransactions() {
    this.recurringTransactionService.findByUserLogged().subscribe( res => {
      this.recurringTransactionOptions = res;
    }, erro => {
      this.snackBar.open('Erro ao listar Transações Recorrentes. ' + erro.message, 'snackbar-warning')
    });
  }

  getGoals() {
    this.goalService.findByUserLogged().subscribe( res => {
      this.goalOptions = res;
    }, erro => {
      this.snackBar.open('Erro ao listar Metas. ' + erro.message, 'snackbar-warning')
    });
  }

}
