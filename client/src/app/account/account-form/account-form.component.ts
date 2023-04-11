import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Account } from 'src/app/account/models/account';
import { AccountService } from '../services/account.service';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { AccountType } from '../models/account-type';
import { Subject, takeUntil } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-account-add',
  templateUrl: './account-form.component.html',
  styleUrls: ['./account-form.component.css']
})
export class AccountFormComponent implements OnInit, OnDestroy {

  form: FormGroup;
  accountTypeOptions = [
    { value: AccountType.CONTA_CORRENTE, label: 'Conta Corrente' },
    { value: AccountType.CONTA_POUPANCA, label: 'Conta Poupança' },
    { value: AccountType.CARTAO, label: 'Cartão' }
  ];
  private ngUnsubscribe = new Subject(); 
  idRegistro = 'Novo registro';

  constructor(
    private service: AccountService,
    private snackBar: SnackbarService,
    private router: Router,
    ) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      id: new FormControl(''),
      number: new FormControl(null, [Validators.required, 
        Validators.minLength(6), 
        Validators.maxLength(12)]),
      agency: new FormControl(null, [Validators.required, 
        Validators.minLength(4), 
        Validators.maxLength(4)]),
      bank: new FormControl(null, [Validators.required, 
        Validators.minLength(2), 
        Validators.maxLength(255)]),
      type: new FormControl(null, Validators.required)
    });
    
    this.service.selectedAccount$
    .pipe(takeUntil(this.ngUnsubscribe))
    .subscribe(account => {
      if (account) {
        this.form.patchValue(account);
        this.idRegistro = 'Id ' + account.id;
      }
    }, erro => {
      this.snackBar.open('Erro ao carregar registro.', 'snackbar-warning');
    });
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next(null);
    this.ngUnsubscribe.complete();
    this.service.setSelectedAccount(null);
  }

  saveClick() {
    if (this.form.valid) {
      const account: Account = this.form.value;
      if (account.id) {
        this.update(account);
      } else {
        this.save(account);
      }
    } else {
      this.snackBar.open('Campos obrigatórios não preenchidos. Por favor, verifique.', 'snackbar-warning');
      this.form.markAllAsTouched();
    }
  }

  save(account: Account) {
    this.service.save(account).subscribe(res => {
      this.snackBar.open('Registro salvo com sucesso.', 'snackbar-sucess');
      this.resertForm();
    }, erro => {
      this.snackBar.open('Erro ao salvar registro.', 'snackbar-warning')
    });
  }

  update(account: Account) {
    this.service.update(account).subscribe(res => {
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
    this.router.navigate(['account']);
  }

}
