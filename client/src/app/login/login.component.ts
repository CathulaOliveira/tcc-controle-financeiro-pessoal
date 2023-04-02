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
    this.form = new FormGroup({
      username: new FormControl(''),
      password: new FormControl(null, Validators.minLength(3)),
    });
  }

  logar() {
    const login: Credential = this.form.value;
    this.service.authenticate(login).subscribe(resposta => {
      this.service.sucessFullLogin(resposta.token);
      this.router.navigate(['']);
      this.snackBar.open('Login realizado com sucesso.', 'snackbar-sucess');
    }, () => {
      this.snackBar.open('Usuário e/ou senha inválidos.', 'snackbar-warning')
    })
  }

  validaCampos(): boolean {
    return this.form.valid;
  }

  cadastrar() {
    this.router.navigate(['user']);
  }

}
