import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Account } from 'src/app/account/models/account';
import { AccountService } from '../services/account.service';
import { Router } from '@angular/router';
import { AccountType } from '../models/account-type';
import { MatDialog } from '@angular/material/dialog';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { DialogComponent } from 'src/app/components/dialog/dialog.component';

@Component({
  selector: 'app-account-list',
  templateUrl: './account-list.component.html',
  styleUrls: ['./account-list.component.css']
})
export class AccountListComponent implements OnInit {
  
  ELEMENT_DATA: Account[] = [];
  displayedColumns: string[] = ['id', 'bank', 'type', 'action'];
  dataSource = new MatTableDataSource<Account>(this.ELEMENT_DATA);
  
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private service: AccountService,
    private router: Router,
    public dialog: MatDialog,
    private snackBar: SnackbarService,
  ) { }

  ngOnInit(): void {
    this.listAll();
  }

  listAll() {
    this.service.findByUserLogged().subscribe( res => {
      this.ELEMENT_DATA = res;
      this.dataSource = new MatTableDataSource<Account>(this.ELEMENT_DATA);
      this.dataSource.paginator = this.paginator;
    }, erro => {
      this.snackBar.open('Erro ao listar registros. ' + erro.message, 'snackbar-warning');
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  new() {
    this.router.navigate(['account-form']);
  }

  edit(item: Account) {
    this.service.setSelectedAccount(item);
    this.router.navigate(['account-form']);
  }

  deleteClick(item) {
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
      this.snackBar.open('Erro ao excluir registro. ' + erro.message, 'snackbar-warning')
    })
  }

}
