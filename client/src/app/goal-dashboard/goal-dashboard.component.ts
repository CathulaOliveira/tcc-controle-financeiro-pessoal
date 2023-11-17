import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Goal } from '../goal/models/goal';
import { GoalService } from '../goal/services/goal.service';
import { SnackbarService } from '../services/snackbar.service';
import { GoalDashboardService } from './services/goal-dashboard.service';
import { GoalDashboard } from './models/goal-dashboard';

@Component({
  selector: 'app-goal-dashboard',
  templateUrl: './goal-dashboard.component.html',
  styleUrls: ['./goal-dashboard.component.css']
})
export class GoalDashboardComponent implements OnInit {

  form: FormGroup;
  goalOptions: Goal[] = [];
  progressValue = null;
  dashboard: GoalDashboard;

  constructor(
    private snackBar: SnackbarService,
    private goalService: GoalService,
    private goalDashboardService: GoalDashboardService
  ) { }

  ngOnInit(): void {
    this.createForm();
    this.changeForm();
    this.listAll(null);
    this.getGoals();
  }

  createForm() {
    this.form = new FormGroup({
      goal: new FormControl(null, Validators.required),
    });
  }

  changeForm() {
    this.form.valueChanges.subscribe((values) => {
      this.listAll(values);
    });
  }

  getGoals() {
    this.goalService.findByUserLogged().subscribe( res => {
      this.goalOptions = res;
    }, erro => {
      this.snackBar.open('Erro ao listar Contas Bancárias. ' + erro.message, 'snackbar-warning')
    });
  }

  objectComparisonFunction = function( option, value ) : boolean {
    return option?.id === value?.id;
  }

  listAll(values) {
    if (values != null && values.goal != null) {
      this.goalDashboardService.findFilter(values.goal.id).subscribe( res => {
        this.dashboard = res;
        this.progressValue = res.percentage;
      }, erro => {
        this.snackBar.open('Erro ao listar registros. ' + erro.message, 'snackbar-warning');
      });
    }
  }


}
