import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import { AccountListComponent } from './account/account-list/account-list.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { NavComponent } from './components/nav/nav.component';
import { AccountFormComponent } from './account/account-form/account-form.component';
import { CategoryListComponent } from './category/category-list/category-list.component';
import { CategoryFormComponent } from './category/category-form/category-form.component';
import { GoalListComponent } from './goal/goal-list/goal-list.component';
import { GoalFormComponent } from './goal/goal-form/goal-form.component';
import { TransactionListComponent } from './transaction/transaction-list/transaction-list.component';
import { TransactionFormComponent } from './transaction/transaction-form/transaction-form.component';
import { TransactionRecurringFormComponent } from './transaction/transaction-recurring-form/transaction-recurring-form.component';
import { CashFlowComponent } from './cash-flow/cash-flow.component';
import { TypeGoalListComponent } from './type-goal/type-goal-list/type-goal-list.component';
import { TypeGoalFormComponent } from './type-goal/type-goal-form/type-goal-form.component';
import { UserRegisterComponent } from './user/user-register/user-register.component';
import { UserProfileComponent } from './user/user-profile/user-profile.component';
import { GoalDashboardComponent } from './goal-dashboard/goal-dashboard.component';

const routes: Routes = [
  {
    path: 'login', component: LoginComponent
  },
  {
    path: 'user', component: UserRegisterComponent
  },
  {
    path: '', component: NavComponent, canActivate: [AuthGuard], children: [
      {path: 'home', component: HomeComponent},
      {path: 'account', component: AccountListComponent},
      {path: 'account-form', component: AccountFormComponent},
      {path: 'category', component: CategoryListComponent},
      {path: 'category-form', component: CategoryFormComponent},
      {path: 'goal', component: GoalListComponent},
      {path: 'goal-form', component: GoalFormComponent},
      {path: 'goal-dashboard', component: GoalDashboardComponent},
      {path: 'transaction', component: TransactionListComponent},
      {path: 'transaction-form', component: TransactionFormComponent},
      {path: 'transaction-recurring-form', component: TransactionRecurringFormComponent},
      {path: 'cash-flow', component: CashFlowComponent},
      {path: 'type-goal', component: TypeGoalListComponent},
      {path: 'type-goal-form', component: TypeGoalFormComponent},
      {path: 'user-profile', component: UserProfileComponent},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
