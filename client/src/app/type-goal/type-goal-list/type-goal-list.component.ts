import { Component, OnInit, ViewChild } from '@angular/core';
import { TypeGoal } from '../models/type-goal';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { TypeGoalService } from '../services/type-goal.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { DialogComponent } from 'src/app/components/dialog/dialog.component';

@Component({
  selector: 'app-type-goal-list',
  templateUrl: './type-goal-list.component.html',
  styleUrls: ['./type-goal-list.component.css']
})
export class TypeGoalListComponent implements OnInit {

  ELEMENT_DATA: TypeGoal[] = [];
  displayedColumns: string[] = ['id', 'name', 'status', 'action'];
  dataSource = new MatTableDataSource<TypeGoal>(this.ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private service: TypeGoalService,
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
      this.dataSource = new MatTableDataSource<TypeGoal>(this.ELEMENT_DATA);
      this.dataSource.paginator = this.paginator;
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  new() {
    this.router.navigate(['type-goal-form']);
  }

  edit(item: TypeGoal) {
    this.service.setSelectedTypeGoal(item);
    this.router.navigate(['type-goal-form']);
  }

  deleteClick(item: TypeGoal) {
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
