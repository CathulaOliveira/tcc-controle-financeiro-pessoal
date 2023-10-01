import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ReportService } from './services/report.service';
import { FormControl, FormGroup } from '@angular/forms';
import { Account } from '../account/models/account';
import { SnackbarService } from '../services/snackbar.service';
import { AccountService } from '../account/services/account.service';
import { TransactionType } from '../transaction/models/transaction-type';
import { Category } from '../category/models/cotegory';
import { CategoryService } from '../category/services/category.service';
import { ReportFilter } from './models/report-filter';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {

  employees: any[] = [];
  accountOptions: Account[] = [];
  categoryOptions: Category[] = [];
  form: FormGroup;
  typeOptions = [
    { value: TransactionType.ENTRADA, label: 'Entrada' },
    { value: TransactionType.SAIDA, label: 'Saída' },
    { value: TransactionType.TRANSFERENCIA, label: 'Transferência entre contas' }
  ];

  constructor(
    private reportService: ReportService,
    private snackBar: SnackbarService,
    private accountService: AccountService,
    private categoryService: CategoryService,
  ) {}

  ngOnInit(): void {
    this.createForm();
    this.getAccounts();
    this.getCategories();
  }

  createForm() {
    this.form = new FormGroup({
      dateInit: new FormControl(null),
      dateFinish: new FormControl(null),
      account: new FormControl(null),
      type: new FormControl(null),
      category: new FormControl(null),
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
    this.categoryService.findAll().subscribe( res => {
      this.categoryOptions = res;
    }, erro => {
      this.snackBar.open('Erro ao listar Categorias. ' + erro.message, 'snackbar-warning')
    });
  }

  generateReport() {
    let values = this.form.value;
    let filter: ReportFilter = {
      dateInit: values.dateInit,
      dateFinish: values.dateFinish,
      accounts: values.account,
      categories: values.category,
      type: values.type
    }
    console.log(filter);
    this.reportService.generate(filter).subscribe((data) => {
        const blob = new Blob([data], { type: 'application/pdf' });
        const url = window.URL.createObjectURL(blob);
        window.open(url);
    });
  }

  objectComparisonFunction = function( option, value ) : boolean {
    return option?.id === value?.id;
  }
  
  clearFilter() {
    this.form.reset();
  }

}
