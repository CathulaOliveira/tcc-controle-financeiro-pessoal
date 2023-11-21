import { Component, OnDestroy, OnInit, AfterViewInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { GoalService } from '../services/goal.service';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { Router } from '@angular/router';
import { Goal } from '../models/goal';
import { Category } from 'src/app/category/models/cotegory';
import { CategoryService } from 'src/app/category/services/category.service';
import { TypeGoal } from 'src/app/type-goal/models/type-goal';
import { TypeGoalService } from 'src/app/type-goal/services/type-goal.service';
import { TransactionType } from 'src/app/transaction/models/transaction-type';

@Component({
  selector: 'app-goal-form',
  templateUrl: './goal-form.component.html',
  styleUrls: ['./goal-form.component.css'],
})
export class GoalFormComponent implements OnInit, OnDestroy {

  form: FormGroup;
  private ngUnsubscribe = new Subject(); 
  idRegistro = 'Novo registro';
  typeGoalOptions: TypeGoal[] = [];
  categoryOptions: Category[] = [];
  typeTransactionOptions = [
    { value: TransactionType.ENTRADA, label: 'Entrada' },
    { value: TransactionType.SAIDA, label: 'Saída' },
  ];
  
  constructor(
    private service: GoalService,
    private categoryService: CategoryService,
    private typeGoalService: TypeGoalService,
    private snackBar: SnackbarService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.createForm();
    this.getCategories();
    this.getTypeGoal();
    this.getItemSelected();
  }

  ngOnDestroy(): void {
    this.resetItemSelected();
  }

  createForm() {
    this.form = new FormGroup({
      id: new FormControl(''),
      description: new FormControl(null, [Validators.required, Validators.maxLength(250)]),
      type: new FormControl(null, Validators.required),
      category: new FormControl(null, Validators.required),
      startDate: new FormControl(null),
      endDate: new FormControl(null),
      price: new FormControl(null),
      progress: new FormControl(null),
      typeTransactionExpected: new FormControl(null, Validators.required),
    });
  }

  getItemSelected() {
    this.service.selectedGoal$
    .pipe(takeUntil(this.ngUnsubscribe))
    .subscribe(goal => {
      if (goal) {
        this.form.patchValue(goal);
        this.idRegistro = 'Id ' + goal.id;
      }
    }, erro => {
      this.snackBar.open('Erro ao carregar registro. ' + erro.message, 'snackbar-warning');
    });
  }

  resetItemSelected() {
    this.ngUnsubscribe.next(null);
    this.ngUnsubscribe.complete();
    this.service.setSelectedGoal(null);
  }

  objectComparisonFunction = function( option, value ) : boolean {
    return option?.id === value?.id;
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
      this.backSearch();
    }, erro => {
      this.snackBar.open('Erro ao salvar registro. ' + erro.message, 'snackbar-warning')
    });
  }

  update(goal: Goal) {
    this.service.update(goal).subscribe(res => {
      this.snackBar.open('Registro atualizado com sucesso.', 'snackbar-sucess');
      this.backSearch();
    }, erro => {
      this.snackBar.open('Erro ao atualizar registro. ' + erro.message, 'snackbar-warning')
    });
  }

  backSearch() {
    this.router.navigate(['goal']);
  }

  getCategories() {
    this.categoryService.findByStatusAtivo().subscribe( res => {
      this.categoryOptions = res;
    }, erro => {
      this.snackBar.open('Erro ao listar Categorias. ' + erro.message, 'snackbar-warning');
    });
  }

  getTypeGoal() {
    this.typeGoalService.findAll().subscribe( res => {
      this.typeGoalOptions = res;
    }, erro => {
      this.snackBar.open('Erro ao listar Tipos de Metas. ' + erro.message, 'snackbar-warning');
    });
  }

}
