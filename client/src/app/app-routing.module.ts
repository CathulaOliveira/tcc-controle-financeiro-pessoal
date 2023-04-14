import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import { AccountListComponent } from './account/account-list/account-list.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { NavComponent } from './components/nav/nav.component';
import { UserComponent } from './user/user.component';
import { AccountFormComponent } from './account/account-form/account-form.component';
import { CategoryListComponent } from './category/category-list/category-list.component';
import { CategoryFormComponent } from './category/category-form/category-form.component';
import { GoalListComponent } from './goal/goal-list/goal-list.component';
import { GoalFormComponent } from './goal/goal-form/goal-form.component';
import { TransactionListComponent } from './transaction/transaction-list/transaction-list.component';
import { TransactionFormComponent } from './transaction/transaction-form/transaction-form.component';
import { TransactionRecurringFormComponent } from './transaction/transaction-recurring-form/transaction-recurring-form.component';
import { CashFlowComponent } from './cash-flow/cash-flow.component';

const routes: Routes = [
  {
    path: 'login', component: LoginComponent
  },
  {
    path: 'user', component: UserComponent
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
      {path: 'transaction', component: TransactionListComponent},
      {path: 'transaction-form', component: TransactionFormComponent},
      {path: 'transaction-recurring-form', component: TransactionRecurringFormComponent},
      {path: 'cash-flow', component: CashFlowComponent},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
