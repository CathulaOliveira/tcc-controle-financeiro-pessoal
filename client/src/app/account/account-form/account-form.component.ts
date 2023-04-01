import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Account } from 'src/app/account/models/account';
import { AccountService } from '../services/account.service';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { AccountType } from '../models/account-type';
import { Subject, takeUntil } from 'rxjs';

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

  constructor(
    private service: AccountService,
    private snackBar: SnackbarService,
    ) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      id: new FormControl(''),
      number: new FormControl(''),
      agency: new FormControl(''),
      bank: new FormControl(''),
      type: new FormControl('')
    });
    
    this.service.selectedAccount$
    .pipe(takeUntil(this.ngUnsubscribe))
    .subscribe(account => {
      if (account) {
        this.form.patchValue(account);
      }
    }, erro => {
      this.snackBar.open('Erro ao carregar registro');
    });
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next(null);
    this.ngUnsubscribe.complete();
    this.service.setSelectedAccount(null);
  }

  saveClick() {
    const account: Account = this.form.value;
    if (account.id) {
      this.update(account);
    } else {
      this.save(account);
    }
    
  }

  save(account: Account) {
    this.service.save(account).subscribe(res => {
      this.snackBar.open('Registro salvo com sucesso');
      this.form.reset();
    }, erro => {
      this.snackBar.open('Erro ao salvar registro.')
    });
  }

  update(account: Account) {
    this.service.update(account).subscribe(res => {
      this.snackBar.open('Registro atualizado com sucesso');
      this.form.reset();
    }, erro => {
      this.snackBar.open('Erro ao atualizar registro.')
    });
  }

}
