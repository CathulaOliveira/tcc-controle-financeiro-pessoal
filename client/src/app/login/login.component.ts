import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { Router } from '@angular/router';

import { AuthService } from 'src/app/login/services/auth.service';
import { SnackbarService } from '../services/snackbar.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form: FormGroup;

  constructor(
    private snackBar: SnackbarService,
    private service: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.form = new FormGroup({
      username: new FormControl(null, [Validators.required, 
        Validators.minLength(4), 
        Validators.maxLength(255)]),
      password: new FormControl(null, [Validators.required, 
        Validators.minLength(6), 
        Validators.maxLength(255)]),
    });
  }

  login() {
    const login: Credential = this.form.value;
    this.service.authenticate(login).subscribe(resposta => {
      this.service.sucessFullLogin(resposta.token);
      this.router.navigate(['']);
      this.snackBar.open('Login realizado com sucesso.', 'snackbar-sucess');
    }, erro => {
      this.snackBar.open('Erro ao realizar login, verifique suas credenciais.', 'snackbar-warning')
    })
  }

  validate(): boolean {
    return this.form.valid;
  }

  new() {
    this.router.navigate(['user']);
  }

}
