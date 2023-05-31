import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { Status } from 'src/app/enum/status';
import { TypeGoalService } from '../services/type-goal.service';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { Router } from '@angular/router';
import { TypeGoal } from '../models/type-goal';

@Component({
  selector: 'app-type-goal-form',
  templateUrl: './type-goal-form.component.html',
  styleUrls: ['./type-goal-form.component.css']
})
export class TypeGoalFormComponent implements OnInit, OnDestroy {

  form: FormGroup;
  private ngUnsubscribe = new Subject(); 
  idRegistro = 'Novo registro';
  statusOptions = [
    { value: Status.ATIVO, label: 'Ativo' },
    { value: Status.INATIVO, label: 'Inativo' },
  ];

  constructor(
    private service: TypeGoalService,
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
      name: new FormControl(null, [Validators.required, Validators.maxLength(255)]),
      status: new FormControl(Status.ATIVO, Validators.required),
    });
  }

  getItemSelected() {
    this.service.selectedTypeGoal$
    .pipe(takeUntil(this.ngUnsubscribe))
    .subscribe(typeGoal => {
      if (typeGoal) {
        this.form.patchValue(typeGoal);
        this.idRegistro = 'Id ' + typeGoal.id;
      }
    }, erro => {
      this.snackBar.open('Erro ao carregar registro. ' + erro.message, 'snackbar-warning');
    });
  }

  resetItemSelected() {
    this.ngUnsubscribe.next(null);
    this.ngUnsubscribe.complete();
    this.service.setSelectedTypeGoal(null);
  }

  saveClick() {
    if (this.form.valid) {
      const typeGoal: TypeGoal = this.form.value;
      if (typeGoal.id) {
        this.update(typeGoal);
      } else {
        this.save(typeGoal);
      }
    } else {
      this.snackBar.open('Campos obrigatórios não preenchidos. Por favor, verifique.', 'snackbar-warning');
      this.form.markAllAsTouched();
    }
  }

  save(typeGoal: TypeGoal) {
    this.service.save(typeGoal).subscribe(res => {
      this.snackBar.open('Registro salvo com sucesso.', 'snackbar-sucess');
      this.resertForm();
    }, erro => {
      this.snackBar.open('Erro ao salvar registro. ' + erro.message, 'snackbar-warning')
    });
  }

  update(typeGoal: TypeGoal) {
    this.service.update(typeGoal).subscribe(res => {
      this.snackBar.open('Registro atualizado com sucesso.', 'snackbar-sucess');
      this.resertForm();
    }, erro => {
      this.snackBar.open('Erro ao atualizar registro. ' + erro.message, 'snackbar-warning')
    });
  }

  resertForm() {
    this.form.reset();
    this.idRegistro = 'Novo registro';
  }

  backSearch() {
    this.router.navigate(['type-goal']);
  }

}
