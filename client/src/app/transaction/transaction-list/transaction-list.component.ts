import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

import { DialogComponent } from 'src/app/components/dialog/dialog.component';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { TransactionService } from '../services/transaction.service';
import { Transaction } from '../models/transaction';

@Component({
  selector: 'app-transaction-list',
  templateUrl: './transaction-list.component.html',
  styleUrls: ['./transaction-list.component.css']
})
export class TransactionListComponent implements OnInit {

  ELEMENT_DATA: Transaction[] = [];
  displayedColumns: string[] = ['id', 'date', 'description', 'type',  'category', 'action'];
  dataSource = new MatTableDataSource<Transaction>(this.ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private service: TransactionService,
    private router: Router,
    public dialog: MatDialog,
    private snackBar: SnackbarService,
  ) { }

  ngOnInit(): void {
    this.listAll();
  }

  listAll() {
    this.service.findAll().subscribe( res => {
      this.ELEMENT_DATA = res;
      this.dataSource = new MatTableDataSource<Transaction>(this.ELEMENT_DATA);
      this.dataSource.paginator = this.paginator;
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  new() {
    this.router.navigate(['transaction-form']);
  }

  edit(item: Transaction) {
    this.service.setSelectedTransaction(item);
    this.router.navigate(['transaction-form']);
  }

  deleteClick(item: Transaction) {
    const dialogRef = this.dialog.open(DialogComponent);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.delete(item.id);
      }
    });
  }

  delete(id) {
    this.service.delete(id).subscribe( res => {
      this.snackBar.open('Registro excluído com sucesso.', 'snackbar-sucess');
      this.listAll();
    }, erro => {
      this.snackBar.open('Erro ao excluir registro.', 'snackbar-warning')
    })
  }

}
