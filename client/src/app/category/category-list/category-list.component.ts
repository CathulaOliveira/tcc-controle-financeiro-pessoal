import { Component, OnInit, ViewChild } from '@angular/core';
import { Category } from '../models/cotegory';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { CategoryService } from '../services/category.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from 'src/app/components/dialog/dialog.component';
import { SnackbarService } from 'src/app/services/snackbar.service';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent implements OnInit {

  ELEMENT_DATA: Category[] = [];
  displayedColumns: string[] = ['id', 'name', 'status', 'action'];
  dataSource = new MatTableDataSource<Category>(this.ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private service: CategoryService,
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
      this.dataSource = new MatTableDataSource<Category>(this.ELEMENT_DATA);
      this.dataSource.paginator = this.paginator;
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  new() {
    this.router.navigate(['category-form']);
  }

  edit(item: Category) {
    this.service.setSelectedCategory(item);
    this.router.navigate(['category-form']);
  }

  deleteClick(item: Category) {
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
