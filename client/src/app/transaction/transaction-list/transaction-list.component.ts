import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

import { DialogComponent } from 'src/app/components/dialog/dialog.component';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { TransactionService } from '../services/transaction.service';
import { Transaction } from '../models/transaction';
import { RecurringTransaction } from '../models/transaction-recurring';
import { RecurringTransactionService } from '../services/transaction-recurring.service';

@Component({
  selector: 'app-transaction-list',
  templateUrl: './transaction-list.component.html',
  styleUrls: ['./transaction-list.component.css']
})
export class TransactionListComponent implements OnInit {

  transactions: Transaction[] = [];
  columnsTransactions: string[] = ['id', 'date', 'description', 'type',  'category', 'accountOrigin', 'accountDestination', 'price', 'action'];
  dataSourceTransactions = new MatTableDataSource<Transaction>(this.transactions);
  
  recurringTransactions: RecurringTransaction[] = [];
  columnsRecurringTransactions: string[] = ['id', 'description', 'type',  'category', 'accountOrigin', 'accountDestination', 'price', 'action'];
  dataSourceRecurringTransactions = new MatTableDataSource<RecurringTransaction>(this.recurringTransactions);

  @ViewChild(MatPaginator) paginatorTransactions: MatPaginator;
  @ViewChild(MatPaginator) paginatorRecurringTransactions: MatPaginator;

  constructor(
    private serviceTransaction: TransactionService,
    private serviceRecurringTransaction: RecurringTransactionService,
    private router: Router,
    public dialog: MatDialog,
    private snackBar: SnackbarService,
  ) { }

  ngOnInit(): void {
    this.listAll();
  }

  listAll() {
    this.serviceTransaction.findByUserLogged().subscribe( res => {
      this.transactions = res;
      this.dataSourceTransactions = new MatTableDataSource<Transaction>(this.transactions);
      this.dataSourceTransactions.paginator = this.paginatorTransactions;
    }, erro => {
      this.snackBar.open('Erro ao listar registros. ' + erro.message, 'snackbar-warning')
    });
    this.serviceRecurringTransaction.findByUserLogged().subscribe( res => {
      this.recurringTransactions = res;
      this.dataSourceRecurringTransactions = new MatTableDataSource<RecurringTransaction>(this.recurringTransactions);
      this.dataSourceRecurringTransactions.paginator = this.paginatorRecurringTransactions;
    }, erro => {
      this.snackBar.open('Erro ao listar registros. ' + erro.message, 'snackbar-warning')
    });
  }

  applyFilterTransaction(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSourceTransactions.filter = filterValue.trim().toLowerCase();
  }

  applyFilterRecurringTransaction(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSourceRecurringTransactions.filter = filterValue.trim().toLowerCase();
  }

  newTransaction() {
    this.router.navigate(['transaction-form']);
  }

  newRecurringTransaction() {
    this.router.navigate(['transaction-recurring-form']);
  }

  editTransaction(item: Transaction) {
    this.serviceTransaction.setSelectedTransaction(item);
    this.router.navigate(['transaction-form']);
  }

  editRecurringTransaction(item: RecurringTransaction) {
    this.serviceRecurringTransaction.setSelectedRecurringTransaction(item);
    this.router.navigate(['transaction-recurring-form']);
  }

  deleteClickTransaction(item: Transaction) {
    const dialogRef = this.dialog.open(DialogComponent);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleteTransaction(item.id);
      }
    });
  }

  deleteTransaction(id) {
    this.serviceTransaction.delete(id).subscribe( res => {
      this.snackBar.open('Registro excluído com sucesso.', 'snackbar-sucess');
      this.listAll();
    }, erro => {
      this.snackBar.open('Erro ao excluir registro. ' + erro.message, 'snackbar-warning')
    })
  }

  deleteClickRecurringTransaction(item: RecurringTransaction) {
    const dialogRef = this.dialog.open(DialogComponent);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleteRecurringTransaction(item.id);
      }
    });
  }

  deleteRecurringTransaction(id) {
    this.serviceRecurringTransaction.delete(id).subscribe( res => {
      this.snackBar.open('Registro excluído com sucesso.', 'snackbar-sucess');
      this.listAll();
    }, erro => {
      this.snackBar.open('Erro ao excluir registro. ' + erro.message, 'snackbar-warning')
    })
  }

}
