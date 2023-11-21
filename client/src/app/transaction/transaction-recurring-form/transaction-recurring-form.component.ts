import { Component, OnDestroy, OnInit, AfterViewInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { TransactionType } from '../models/transaction-type';
import { Category } from 'src/app/category/models/cotegory';
import { Account } from 'src/app/account/models/account';
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
    this.createForm();
    this.getCategories();
    this.getAccounts();
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
      dueDate: new FormControl(null, Validators.required),
      price: new FormControl(null, Validators.required),
      paymentStatus: new FormControl(null),
    });
  }
  
  getItemSelected() {
    this.service.selectedRecurringTransaction$
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
    this.service.setSelectedRecurringTransaction(null);
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
  
  resetField(fieldName: string) {
    this.form.get(fieldName).clearValidators();
    this.form.get(fieldName).reset();
    this.form.get(fieldName).updateValueAndValidity();
  }

  addValidatorsField(fieldName: string) {
    this.form.get(fieldName).addValidators(Validators.required);
    this.form.get(fieldName).updateValueAndValidity();
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
      this.backSearch();
    }, erro => {
      this.snackBar.open('Erro ao salvar registro. ' + erro.message, 'snackbar-warning');
    });
  }

  update(transaction: RecurringTransaction) {
    this.service.update(transaction).subscribe(res => {
      this.snackBar.open('Registro atualizado com sucesso.', 'snackbar-sucess');
      this.backSearch();
    }, erro => {
      this.snackBar.open('Erro ao atualizar registro. ' + erro.message, 'snackbar-warning');
    });
  }

  backSearch() {
    this.router.navigate(['transaction']);
  }

  getCategories() {
    this.categoryService.findByStatusAtivo().subscribe( res => {
      this.categoryOptions = res;
    }, erro => {
      this.snackBar.open('Erro ao listar Categorias. ' + erro.message, 'snackbar-warning');
    });
  }

  getAccounts() {
    this.accountService.findByUserLogged().subscribe( res => {
      this.accountOptions = res;
    }, erro => {
      this.snackBar.open('Erro ao listar Contas Bancárias. ' + erro.message, 'snackbar-warning');
    });
  }

}
