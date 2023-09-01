import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Goal } from '../goal/models/goal';
import { GoalService } from '../goal/services/goal.service';
import { SnackbarService } from '../services/snackbar.service';

@Component({
  selector: 'app-goal-dashboard',
  templateUrl: './goal-dashboard.component.html',
  styleUrls: ['./goal-dashboard.component.css']
})
export class GoalDashboardComponent implements OnInit {

  form: FormGroup;
  goalOptions: Goal[] = [];

  constructor(
    private snackBar: SnackbarService,
    private goalService: GoalService
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
    // let filter: DashboardFilter = {
    //   month: null,
    //   year: null,
    //   accounts: null,
    //   categories: null,
    //   type: null,
    // };
    // if (values != null) {
    //   filter.month = values.date?.getMonth() + 1;
    //   filter.year = values.date?.getFullYear();
    //   filter.accounts = values.account ? [values.account?.id] : null;
    //   filter.categories = values.category ? [values.category?.id] : null;
    //   filter.type = values.type;
    // }
    // this.dashboardService.findFilter(filter).subscribe( res => {
    //   this.dashboard = res;
    // }, erro => {
    //   this.snackBar.open('Erro ao listar registros. ' + erro.message, 'snackbar-warning');
    // });
  }


}
