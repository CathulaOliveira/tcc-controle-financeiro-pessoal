import { Component, OnInit, ViewChild } from '@angular/core';
import { Goal } from '../models/goal';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { GoalService } from '../services/goal.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { DialogComponent } from 'src/app/components/dialog/dialog.component';

@Component({
  selector: 'app-goal-list',
  templateUrl: './goal-list.component.html',
  styleUrls: ['./goal-list.component.css']
})
export class GoalListComponent implements OnInit {

  ELEMENT_DATA: Goal[] = [];
  displayedColumns: string[] = ['id', 'description', 'type',  'category', 'action'];
  dataSource = new MatTableDataSource<Goal>(this.ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private service: GoalService,
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
      this.dataSource = new MatTableDataSource<Goal>(this.ELEMENT_DATA);
      this.dataSource.paginator = this.paginator;
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  new() {
    this.router.navigate(['goal-form']);
  }

  edit(item: Goal) {
    this.service.setSelectedGoal(item);
    this.router.navigate(['goal-form']);
  }

  deleteClick(item: Goal) {
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
