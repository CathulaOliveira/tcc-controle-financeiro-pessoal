import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Account } from '../account/models/account';
import { TransactionType } from '../transaction/models/transaction-type';
import { SnackbarService } from '../services/snackbar.service';
import { AccountService } from '../account/services/account.service';
import { subMonths, addMonths  } from 'date-fns';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MAT_MOMENT_DATE_ADAPTER_OPTIONS, MomentDateAdapter } from '@angular/material-moment-adapter';

export const MY_FORMATS = {
  parse: {
    dateInput: 'MM/YYYY',
  },
  display: {
    dateInput: 'MM/YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS],
    },

    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
  ],
})
export class HomeComponent implements OnInit {

  form: FormGroup;
  accountOptions: Account[] = [];
  typeOptions = [
    { value: TransactionType.ENTRADA, label: 'Entrada' },
    { value: TransactionType.SAIDA, label: 'Saída' },
    { value: TransactionType.TRANSFERENCIA, label: 'Transferência entre contas' }
  ];

  constructor(
    private snackBar: SnackbarService,
    private accountService: AccountService,
  ) { }

  ngOnInit(): void {
    this.createForm();
    this.changeForm();
    this.getAccounts();
  }

  createForm() {
    this.form = new FormGroup({
      date: new FormControl(new Date(), Validators.required),
      account: new FormControl(null),
      type: new FormControl(null),
    });
  }

  changeForm() {
    this.form.valueChanges.subscribe((values) => {
      // this.listAll(values);
    });
  }

  getAccounts() {
    this.accountService.findByUserLogged().subscribe( res => {
      this.accountOptions = res;
    }, erro => {
      this.snackBar.open('Erro ao listar Contas. ' + erro.message, 'snackbar-warning')
    });
  }

  prevMonth() {
    this.form.get('date').setValue(subMonths(this.form.get('date').value, 1));
  }

  nextMonth() {
    this.form.get('date').setValue(addMonths(this.form.get('date').value, 1));
  }

  objectComparisonFunction = function( option, value ) : boolean {
    return option?.id === value?.id;
  }

}
