import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import { AccountListComponent } from './account/account-list/account-list.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { NavComponent } from './components/nav/nav.component';
import { UserComponent } from './user/user.component';

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
    ]
    // path: '', component: NavComponent, children: [
    //   {path: 'home', component: HomeComponent},
    //   {path: 'account', component: AccountListComponent},
    // ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
