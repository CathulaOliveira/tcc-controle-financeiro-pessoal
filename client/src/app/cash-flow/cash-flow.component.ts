import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { RecurringTransaction } from '../transaction/models/transaction-recurring';
import { RecurringTransactionService } from '../transaction/services/transaction-recurring.service';

@Component({
  selector: 'app-cash-flow',
  templateUrl: './cash-flow.component.html',
  styleUrls: ['./cash-flow.component.css']
})
export class CashFlowComponent implements OnInit {

  ELEMENT_DATA: RecurringTransaction[] = [];
  displayedColumns: string[] = ['id', 'date', 'description', 'type', 'category', 'price', 'status'];
  dataSource = new MatTableDataSource<RecurringTransaction>(this.ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private service: RecurringTransactionService,
    public dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.listAll();
  }

  listAll() {
    this.service.findAll().subscribe( res => {
      this.ELEMENT_DATA = res;
      this.dataSource = new MatTableDataSource<RecurringTransaction>(this.ELEMENT_DATA);
      this.dataSource.paginator = this.paginator;
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
