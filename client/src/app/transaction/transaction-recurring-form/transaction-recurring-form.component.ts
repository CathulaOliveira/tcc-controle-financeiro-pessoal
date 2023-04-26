import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { TransactionType } from '../models/transaction-type';
import { Category } from 'src/app/category/models/cotegory';
import { Account } from 'src/app/account/models/account';
import { TransactionService } from '../services/transaction.service';
import { CategoryService } from 'src/app/category/services/category.service';
import { AccountService } from 'src/app/account/services/account.service';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { Router } from '@angular/router';
import { RecurringTransaction } from '../models/transaction-recurring';
import { RecurringTransactionService } from '../services/transaction-recurring.service';

@Component({
  selector: 'app-transaction-recurring-form',
  templateUrl: './transaction-recurring-form.component.html',
  styleUrls: ['./transaction-recurring-form.component.css']
})
export class TransactionRecurringFormComponent implements OnInit, OnDestroy {

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

  constructor(
    private service: RecurringTransactionService,
    private categoryService: CategoryService,
    private accountService: AccountService,
    private snackBar: SnackbarService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      id: new FormControl(''),
      description: new FormControl(null, [Validators.required, Validators.maxLength(250)]),
      type: new FormControl(null, Validators.required),
      category: new FormControl(null, Validators.required),
      accountOrigin: new FormControl(''),
      accountDestination: new FormControl(''),
      dueDate: new FormControl(null, Validators.required),
      price: new FormControl(null, Validators.required),
      paymentStatus: new FormControl(null),
    });

    
    this.getCategoryes();
    this.getAccounts();

    this.service.selectedRecurringTransaction$
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
    this.service.setSelectedRecurringTransaction(null);
  }

  onSelectionChangeType(event) {
    switch(event.value) {
      case TransactionType.ENTRADA:
        this.form.get('accountDestination').addValidators(Validators.required);
        this.form.get('accountDestination').updateValueAndValidity();
        this.form.get('accountOrigin').reset();
        this.form.get('accountOrigin').clearValidators();
        this.form.get('accountOrigin').updateValueAndValidity();
        break;
      case TransactionType.SAIDA:
        this.form.get('accountOrigin').addValidators(Validators.required);
        this.form.get('accountOrigin').updateValueAndValidity();
        this.form.get('accountDestination').reset();
        this.form.get('accountDestination').clearValidators();
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

  saveClick() {
    if (this.form.valid) {
      const transaction: RecurringTransaction = this.form.value;
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

  save(transaction: RecurringTransaction) {
    this.service.save(transaction).subscribe(res => {
      this.snackBar.open('Registro salvo com sucesso.', 'snackbar-sucess');
      this.resertForm();
    }, erro => {
      this.snackBar.open('Erro ao salvar registro.', 'snackbar-warning')
    });
  }

  update(transaction: RecurringTransaction) {
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

}
