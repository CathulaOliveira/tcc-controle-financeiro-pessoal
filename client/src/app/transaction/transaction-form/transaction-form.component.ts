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
    { value: TransactionType.TRANSFERENCIA, label: 'Processo' }
  ];
  categoryOptions: Category[] = [];
  accountOptions: Account[] = [];

  constructor(
    private service: TransactionService,
    private categoryService: CategoryService,
    private accountService: AccountService,
    private snackBar: SnackbarService,
    private router: Router,
    ) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      id: new FormControl(''),
      description: new FormControl(null, [Validators.required, 
        Validators.minLength(2), 
        Validators.maxLength(255)]),
      type: new FormControl(null, Validators.required),
      category: new FormControl(null, Validators.required),
      accountOrigin: new FormControl(null, Validators.required),
      accountDestination: new FormControl(''),
      date: new FormControl(''),
      price: new FormControl('')
    });

    
    this.getCategoryes();
    this.getAccounts();

    this.service.selectedTransaction$
    .pipe(takeUntil(this.ngUnsubscribe))
    .subscribe(goal => {
      if (goal) {
        console.log(goal);
        this.form.patchValue(goal);
        this.idRegistro = 'Id ' + goal.id;
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

}
