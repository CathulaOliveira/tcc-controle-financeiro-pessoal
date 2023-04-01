import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Account } from 'src/app/account/models/account';
import { User } from 'src/app/user/models/user';
import { AccountService } from '../services/account.service';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { AccountType } from '../models/account-type';

@Component({
  selector: 'app-account-add',
  templateUrl: './account-form.component.html',
  styleUrls: ['./account-form.component.css']
})
export class AccountFormComponent implements OnInit {

  form: FormGroup;
  accountTypeOptions = [
    { value: AccountType.CONTA_CORRENTE, label: 'Conta Corrente' },
    { value: AccountType.CONTA_POUPANCA, label: 'Conta Poupança' },
    { value: AccountType.CARTAO, label: 'Cartão' }
  ];

  constructor(
    private service: AccountService,
    private snackBar: SnackbarService,
    ) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      number: new FormControl(''),
      agency: new FormControl(''),
      bank: new FormControl(''),
      type: new FormControl('')
    });
  }

  save() {
    const account: Account = this.form.value;
    console.log(account);
    this.service.save(account).subscribe(res => {
      this.snackBar.open('Registro salvo com sucesso');
      this.form.reset();
    }, erro => {
      this.snackBar.open('Erro ao salvar registro.')
    })
  }

}
