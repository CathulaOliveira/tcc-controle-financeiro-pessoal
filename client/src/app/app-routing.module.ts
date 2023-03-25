import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import { AccountListComponent } from './components/account/account-list/account-list.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { NavComponent } from './components/nav/nav.component';

const routes: Routes = [
  {
    path: 'login', component: LoginComponent
  },
  {
    // path: '', component: NavComponent, canActivate: [AuthGuard], children: [
    //   {path: 'home', component: HomeComponent},
    //   {path: 'account', component: AccountListComponent},
    // ]
    path: '', component: NavComponent, children: [
      {path: 'home', component: HomeComponent},
      {path: 'account', component: AccountListComponent},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
