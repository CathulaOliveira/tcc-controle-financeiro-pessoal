import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { GoalService } from '../services/goal.service';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { Router } from '@angular/router';
import { Goal } from '../models/goal';
import { GoalType } from '../models/goal-type';
import { Category } from 'src/app/category/models/cotegory';
import { CategoryService } from 'src/app/category/services/category.service';
import { MAT_DATE_FORMATS } from '@angular/material/core';

export const MY_DATE_FORMATS = {
  parse: {
    dateInput: 'LL',
  },
  display: {
    dateInput: 'DD/MM/YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@Component({
  selector: 'app-goal-form',
  templateUrl: './goal-form.component.html',
  styleUrls: ['./goal-form.component.css'],
  providers: [
    { provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS },
  ],
})
export class GoalFormComponent implements OnInit, OnDestroy {

  form: FormGroup;
  private ngUnsubscribe = new Subject(); 
  idRegistro = 'Novo registro';
  goalTypeOptions = [
    { value: GoalType.RESULTADO, label: 'Resultado' },
    { value: GoalType.DESEMPENHO, label: 'Desempenho' },
    { value: GoalType.PROCESSO, label: 'Processo' }
  ];
  categoryOptions: Category[] = [];

  constructor(
    private service: GoalService,
    private categoryService: CategoryService,
    private snackBar: SnackbarService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      id: new FormControl(''),
      description: new FormControl(null, [Validators.required, 
        Validators.minLength(2), 
        Validators.maxLength(255)]),
      type: new FormControl(null, Validators.required),
      category: new FormControl(null, Validators.required),
      startDate: new FormControl(''),
      endDate: new FormControl(''),
      price: new FormControl('')
    });

    this.getCategoryes();

    this.service.selectedGoal$
    .pipe(takeUntil(this.ngUnsubscribe))
    .subscribe(goal => {
      if (goal) {
        this.form.patchValue(goal);
        this.idRegistro = 'Id ' + goal.id;
      }
    }, erro => {
      this.snackBar.open('Erro ao carregar registro.', 'snackbar-warning');
    });
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next(null);
    this.ngUnsubscribe.complete();
    this.service.setSelectedGoal(null);
  }

  saveClick() {
    if (this.form.valid) {
      const goal: Goal = this.form.value;
      if (goal.id) {
        this.update(goal);
      } else {
        this.save(goal);
      }
    } else {
      this.snackBar.open('Campos obrigatórios não preenchidos. Por favor, verifique.', 'snackbar-warning');
      this.form.markAllAsTouched();
    }
  }

  save(goal: Goal) {
    this.service.save(goal).subscribe(res => {
      this.snackBar.open('Registro salvo com sucesso.', 'snackbar-sucess');
      this.resertForm();
    }, erro => {
      this.snackBar.open('Erro ao salvar registro.', 'snackbar-warning')
    });
  }

  update(goal: Goal) {
    this.service.update(goal).subscribe(res => {
      this.snackBar.open('Registro atualizado com sucesso.', 'snackbar-sucess');
      this.resertForm();
    }, erro => {
      this.snackBar.open('Erro ao atualizar registro.', 'snackbar-warning')
    });
  }

  resertForm() {
    this.form.reset();
    this.idRegistro = 'Novo registro';
  }

  backSearch() {
    this.router.navigate(['goal']);
  }

  getCategoryes() {
    this.categoryService.findAll().subscribe( res => {
      this.categoryOptions = res;
    });
  }

}
