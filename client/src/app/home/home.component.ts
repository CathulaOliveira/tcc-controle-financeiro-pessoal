import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Account } from '../account/models/account';
import { TransactionType } from '../transaction/models/transaction-type';
import { SnackbarService } from '../services/snackbar.service';
import { AccountService } from '../account/services/account.service';
import { subMonths, addMonths  } from 'date-fns';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MAT_MOMENT_DATE_ADAPTER_OPTIONS, MomentDateAdapter } from '@angular/material-moment-adapter';
import * as moment from 'moment';
import { CashFlowFilter } from '../cash-flow/models/cash-flow-filter';
import { Category } from '../category/models/cotegory';
import { CategoryService } from '../category/services/category.service';
import { DashboardService } from './services/dashboard.service';
import { DashboardFilter } from './models/dashboard-filter';
import { Dashboard } from './models/dashboard';

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
  categoryOptions: Category[] = [];
  typeOptions = [
    { value: TransactionType.ENTRADA, label: 'Entrada' },
    { value: TransactionType.SAIDA, label: 'Saída' },
    { value: TransactionType.TRANSFERENCIA, label: 'Transferência entre contas' }
  ];
  dashboard: Dashboard;

  total1: number = 10;
  total2: number = 20;
  total3: number = 30;
  total4: number = 40;

  constructor(
    private snackBar: SnackbarService,
    private accountService: AccountService,
    private categoryService: CategoryService,
    private dashboardService: DashboardService
  ) { }

  ngOnInit(): void {
    this.createForm();
    this.changeForm();
    this.listAll(null);
    this.getAccounts();
    this.getCategories();
  }

  createForm() {
    this.form = new FormGroup({
      date: new FormControl(new Date(), Validators.required),
      account: new FormControl(null),
      type: new FormControl(null),
      category: new FormControl(null),
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

  getAccounts() {
    this.accountService.findByUserLogged().subscribe( res => {
      this.accountOptions = res;
    }, erro => {
      this.snackBar.open('Erro ao listar Contas Bancárias. ' + erro.message, 'snackbar-warning')
    });
  }

  getCategories() {
    this.categoryService.findByStatusAtivo().subscribe( res => {
      this.categoryOptions = res;
    }, erro => {
      this.snackBar.open('Erro ao listar Categorias. ' + erro.message, 'snackbar-warning');
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

  listAll(values) {
    let filter: DashboardFilter = {
      month: null,
      year: null,
      accounts: null,
      categories: null,
      type: null,
    };
    if (values != null) {
      filter.month = values.date?.getMonth() + 1;
      filter.year = values.date?.getFullYear();
      filter.accounts = values.account ? [values.account?.id] : null;
      filter.categories = values.category ? [values.category?.id] : null;
      filter.type = values.type;
    }
    this.dashboardService.findFilter(filter).subscribe( res => {
      this.dashboard = res;
    }, erro => {
      this.snackBar.open('Erro ao listar registros. ' + erro.message, 'snackbar-warning');
    });
  }

}
