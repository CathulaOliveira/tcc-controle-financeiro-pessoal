import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { RecurringTransaction } from '../transaction/models/transaction-recurring';
import { RecurringTransactionService } from '../transaction/services/transaction-recurring.service';
import { SnackbarService } from '../services/snackbar.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import * as moment from 'moment';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MAT_MOMENT_DATE_ADAPTER_OPTIONS, MomentDateAdapter } from '@angular/material-moment-adapter';
import { MatDatepicker } from '@angular/material/datepicker';
import { Account } from '../account/models/account';
import { AccountService } from '../account/services/account.service';
import { TransactionType } from '../transaction/models/transaction-type';
import { CashFlowService } from './services/cash-flow.service';
import { CashFlowFilter } from './models/cash-flow-filter';
import { CashFlow } from './models/cash-flow';
import { subMonths, addMonths, monthsInYear  } from 'date-fns';

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
  cashFlow: CashFlow = null;
  ELEMENT_DATA: RecurringTransaction[] = [];
  displayedColumns: string[] = ['type', 'category',  'description', 'date', 'price', 'pricePaid', 'status'];
  dataSource = new MatTableDataSource<RecurringTransaction>(this.ELEMENT_DATA);
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
    private cashFlowService: CashFlowService
  ) { }

  ngOnInit(): void {
    this.createForm();
    this.changeForm();
    this.listAll(null);
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
      if (moment.isMoment(values.date)) {
        this.form.get('date').setValue(values.date.toDate());
        values.date = values.date.toDate();
      }
      this.listAll(values);
    });
  }

  listAll(values) {
    let filter: CashFlowFilter = {
      month: null,
      year: null,
      accounts: null,
      type: null,
    };
    if (values != null) {
      filter.month = values.date?.getMonth() + 1;
      filter.year = values.date?.getFullYear();
      filter.accounts = values.account ? [values.account?.id] : null;
      filter.type = values.type;
    }
    this.cashFlowService.findFilter(filter).subscribe( res => {
      this.cashFlow = res;
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

  prevMonth() {
    const teste: Date = subMonths(this.form.get('date').value, 1);
    this.form.get('date').setValue(subMonths(this.form.get('date').value, 1));
  }

  nextMonth() {
    this.form.get('date').setValue(addMonths(this.form.get('date').value, 1));
  }

  formatter(value: number): string {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
  }
}
