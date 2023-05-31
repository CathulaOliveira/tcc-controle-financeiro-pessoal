import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CategoryService } from '../services/category.service';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { Category } from '../models/cotegory';
import { Subject, takeUntil } from 'rxjs';
import { Router } from '@angular/router';
import { Status } from 'src/app/enum/status';

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.css']
})
export class CategoryFormComponent implements OnInit, OnDestroy {

  form: FormGroup;
  private ngUnsubscribe = new Subject(); 
  idRegistro = 'Novo registro';
  statusOptions = [
    { value: Status.ATIVO, label: 'Ativo' },
    { value: Status.INATIVO, label: 'Inativo' },
  ];

  constructor(
    private service: CategoryService,
    private snackBar: SnackbarService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.createForm();
    this.getItemSelected();
  }

  ngOnDestroy(): void {
    this.resetItemSelected();
  }

  createForm() {
    this.form = new FormGroup({
      id: new FormControl(''),
      name: new FormControl(null, [Validators.required, Validators.maxLength(250)]),
      status: new FormControl(Status.ATIVO, Validators.required),
    });
  }

  getItemSelected() {
    this.service.selectedCategory$
    .pipe(takeUntil(this.ngUnsubscribe))
    .subscribe(category => {
      if (category) {
        this.form.patchValue(category);
        this.idRegistro = 'Id ' + category.id;
      }
    }, erro => {
      this.snackBar.open('Erro ao carregar registro. ' + erro.message, 'snackbar-warning');
    });
  }

  resetItemSelected() {
    this.ngUnsubscribe.next(null);
    this.ngUnsubscribe.complete();
    this.service.setSelectedCategory(null);
  }

  saveClick() {
    if (this.form.valid) {
      const category: Category = this.form.value;
      if (category.id) {
        this.update(category);
      } else {
        this.save(category);
      }
    } else {
      this.snackBar.open('Campos obrigatórios não preenchidos. Por favor, verifique.', 'snackbar-warning');
      this.form.markAllAsTouched();
    }
  }

  save(category: Category) {
    this.service.save(category).subscribe(res => {
      this.snackBar.open('Registro salvo com sucesso.', 'snackbar-sucess');
      this.backSearch();
    }, erro => {
      this.snackBar.open('Erro ao salvar registro. ' + erro.message, 'snackbar-warning')
    });
  }

  update(category: Category) {
    this.service.update(category).subscribe(res => {
      this.snackBar.open('Registro atualizado com sucesso.', 'snackbar-sucess');
      this.backSearch();
    }, erro => {
      this.snackBar.open('Erro ao atualizar registro. ' + erro.message, 'snackbar-warning')
    });
  }

  backSearch() {
    this.router.navigate(['category']);
  }

}
