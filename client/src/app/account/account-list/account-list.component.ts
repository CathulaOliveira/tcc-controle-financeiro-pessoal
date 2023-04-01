import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Account } from 'src/app/account/models/account';
import { AccountService } from '../services/account.service';
import { Router } from '@angular/router';
import { AccountType } from '../models/account-type';

@Component({
  selector: 'app-account-list',
  templateUrl: './account-list.component.html',
  styleUrls: ['./account-list.component.css']
})
export class AccountListComponent implements OnInit {
  
  ELEMENT_DATA: Account[] = [];
  displayedColumns: string[] = ['id', 'bank', 'type', 'action'];
  dataSource = new MatTableDataSource<Account>(this.ELEMENT_DATA);
  
  accountTypeOptions = [
    { value: AccountType.CONTA_CORRENTE, label: 'Conta Corrente' },
    { value: AccountType.CONTA_POUPANCA, label: 'Conta Poupança' },
    { value: AccountType.CARTAO, label: 'Cartão' }
  ];

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private service: AccountService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.findAll();
  }

  findAll() {
    this.service.findAll().subscribe( res => {
      this.ELEMENT_DATA = res;
      this.dataSource = new MatTableDataSource<Account>(this.ELEMENT_DATA);
      this.dataSource.paginator = this.paginator;
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  newAccount() {
    this.router.navigate(['account-form']);
  }

}
