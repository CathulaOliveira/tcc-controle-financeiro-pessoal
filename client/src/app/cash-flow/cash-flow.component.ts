import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { RecurringTransaction } from '../transaction/models/transaction-recurring';
import { RecurringTransactionService } from '../transaction/services/transaction-recurring.service';
import { SnackbarService } from '../services/snackbar.service';
import { FormControl, FormGroup } from '@angular/forms';
import * as moment from 'moment';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MAT_MOMENT_DATE_ADAPTER_OPTIONS, MomentDateAdapter } from '@angular/material-moment-adapter';
import { MatDatepicker } from '@angular/material/datepicker';
import { Account } from '../account/models/account';
import { AccountService } from '../account/services/account.service';
import { TransactionType } from '../transaction/models/transaction-type';
import { CashFlowService } from './services/cash-flow.service';
import { CashFlowFilter } from './models/cash-flow-filter';
import { Transaction } from '../transaction/models/transaction';

// See the Moment.js docs for the meaning of these formats:
// https://momentjs.com/docs/#/displaying/format/
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
  selector: 'app-cash-flow',
  templateUrl: './cash-flow.component.html',
  styleUrls: ['./cash-flow.component.css'],
  providers: [
    // `MomentDateAdapter` can be automatically provided by importing `MomentDateModule` in your
    // application's root module. We provide it at the component level here, due to limitations of
    // our example generation script.
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS],
    },

    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
  ],
})
export class CashFlowComponent implements OnInit {

  form: FormGroup;
  ELEMENT_DATA: RecurringTransaction[] = [];
  displayedColumns: string[] = ['id', 'date', 'description', 'type', 'category', 'price', 'status'];
  dataSource = new MatTableDataSource<RecurringTransaction>(this.ELEMENT_DATA);
  date = new FormControl(moment());
  account = new FormControl(null);
  TYPE = new FormControl(null);
  accountOptions: Account[] = [];
  typeOptions = [
    { value: TransactionType.ENTRADA, label: 'Entrada' },
    { value: TransactionType.SAIDA, label: 'Saída' },
    { value: TransactionType.TRANSFERENCIA, label: 'Transferência entre contas' }
  ];

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private service: RecurringTransactionService,
    public dialog: MatDialog,
    private snackBar: SnackbarService,
    private accountService: AccountService,
    private cashFlow: CashFlowService
  ) { }

  ngOnInit(): void {
    this.createForm();
    this.changeForm();
    this.listAll(null);
    this.getAccounts();
  }

  createForm() {
    this.form = new FormGroup({
      date: new FormControl(''),
      account: new FormControl(null),
      type: new FormControl(null),
    });
  }

  changeForm() {
    this.form.valueChanges.subscribe((values) => {
      this.listAll(values);
    });
  }

  listAll(values) {
    let filter: CashFlowFilter = {
      month: null,
      year: null,
      account: null,
      type: null
    };
    if (values != null) {
      filter.month = values.date?._i?.month;
      filter.year = values.date?._i?.year;
      filter.account = values.account;
      filter.type = values.type;
    }
    this.cashFlow.findFilter(filter).subscribe( res => {
      console.log(res);
      this.ELEMENT_DATA = res.transactions;
      this.dataSource = new MatTableDataSource<RecurringTransaction>(this.ELEMENT_DATA);
      this.dataSource.paginator = this.paginator;
    }, erro => {
      this.snackBar.open('Erro ao listar registros. ' + erro.message, 'snackbar-warning');
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  setMonthAndYear(normalizedMonthAndYear: moment.Moment, datepicker: MatDatepicker<moment.Moment>) {
    const ctrlValue = this.date.value!;
    ctrlValue.month(normalizedMonthAndYear.month());
    ctrlValue.year(normalizedMonthAndYear.year());
    this.date.setValue(ctrlValue);
    datepicker.close();
  }
  
  getAccounts() {
    this.accountService.findByUserLogged().subscribe( res => {
      this.accountOptions = res;
    }, erro => {
      this.snackBar.open('Erro ao listar Contas. ' + erro.message, 'snackbar-warning')
    });
  }

  objectComparisonFunction = function( option, value ) : boolean {
    return option?.id === value?.id;
  }
}
