import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { CategoryService } from '../services/category.service';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { Category } from '../models/cotegory';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.css']
})
export class CategoryFormComponent implements OnInit, OnDestroy {

  form: FormGroup;
  private ngUnsubscribe = new Subject(); 

  constructor(
    private service: CategoryService,
    private snackBar: SnackbarService,
  ) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      id: new FormControl(''),
      name: new FormControl(''),
    });

    this.service.selectedCategory$
    .pipe(takeUntil(this.ngUnsubscribe))
    .subscribe(category => {
      if (category) {
        this.form.patchValue(category);
      }
    }, erro => {
      this.snackBar.open('Erro ao carregar registro');
    });
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next(null);
    this.ngUnsubscribe.complete();
    this.service.setSelectedCategory(null);
  }

  saveClick() {
    const category: Category = this.form.value;
    if (category.id) {
      this.update(category);
    } else {
      this.save(category);
    }
    
  }

  save(category: Category) {
    this.service.save(category).subscribe(res => {
      this.snackBar.open('Registro salvo com sucesso');
      this.form.reset();
    }, erro => {
      this.snackBar.open('Erro ao salvar registro.')
    });
  }

  update(category: Category) {
    this.service.update(category).subscribe(res => {
      this.snackBar.open('Registro atualizado com sucesso');
      this.form.reset();
    }, erro => {
      this.snackBar.open('Erro ao atualizar registro.')
    });
  }

}
