import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';

import {MatFormFieldModule} from '@angular/material/form-field';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatButtonModule} from '@angular/material/button';
import {MatSelectModule} from '@angular/material/select';
import {MatTableModule} from '@angular/material/table';
import {MatRadioModule} from '@angular/material/radio';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import {MatListModule} from '@angular/material/list';
import {MatCardModule} from '@angular/material/card';
import {MatDialogModule } from '@angular/material/dialog';
import { MatDatepickerModule } from '@angular/material/datepicker';
import {MatTabsModule} from '@angular/material/tabs';
import {MatGridListModule} from '@angular/material/grid-list';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavComponent } from './components/nav/nav.component';
import { HomeComponent } from './home/home.component';
import { AccountListComponent } from './account/account-list/account-list.component';
import { LoginComponent } from './login/login.component';
import { AuthInterceptorProvider } from './interceptors/auth.interceptor';
import { UserComponent } from './user/user.component';
import { AccountFormComponent } from './account/account-form/account-form.component';
import { AccountTypeOptionsPipe } from './account/models/account-type-pipe.pipe';
import { CategoryListComponent } from './category/category-list/category-list.component';
import { CategoryFormComponent } from './category/category-form/category-form.component';
import { DialogComponent } from './components/dialog/dialog.component';
import { GoalFormComponent } from './goal/goal-form/goal-form.component';
import { GoalListComponent } from './goal/goal-list/goal-list.component';
import { GoalTypeOptionsPipe } from './goal/models/goal-type-pipe.pipe';
import { MatNativeDateModule } from '@angular/material/core';
import { TransactionListComponent } from './transaction/transaction-list/transaction-list.component';
import { TransactionTypeOptionsPipe } from './transaction/models/transaction-type-pipe.pipe';
import { TransactionFormComponent } from './transaction/transaction-form/transaction-form.component';
import { TransactionRecurringFormComponent } from './transaction/transaction-recurring-form/transaction-recurring-form.component';
import { CommonModule } from '@angular/common';
import { CashFlowComponent } from './cash-flow/cash-flow.component';
import { EnumStatusOptionsPipe } from './pipe/enum-status.pipe';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    HomeComponent,
    AccountListComponent,
    LoginComponent,
    UserComponent,
    AccountFormComponent,
    AccountTypeOptionsPipe,
    CategoryListComponent,
    CategoryFormComponent,
    DialogComponent,
    GoalFormComponent,
    GoalListComponent,
    GoalTypeOptionsPipe,
    TransactionListComponent,
    TransactionTypeOptionsPipe,
    TransactionFormComponent,
    TransactionRecurringFormComponent,
    CashFlowComponent,
    EnumStatusOptionsPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    CommonModule,
    MatFormFieldModule,
    MatPaginatorModule,
    MatSnackBarModule,
    MatCheckboxModule,
    MatToolbarModule,
    MatSidenavModule,
    MatButtonModule,
    MatSelectModule,
    MatTableModule,
    MatRadioModule,
    MatInputModule,
    MatIconModule,
    MatListModule,
    MatCardModule,
    MatDialogModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatTabsModule,
    MatGridListModule
  ],
  providers: [AuthInterceptorProvider],
  bootstrap: [AppComponent]
})
export class AppModule { }
