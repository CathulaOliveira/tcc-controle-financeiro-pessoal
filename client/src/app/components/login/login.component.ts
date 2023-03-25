import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  login: User = {
    email: '',
    password: '',
  }

  email = new FormControl(null, Validators.email);
  password = new FormControl(null, Validators.minLength(3));

  constructor(
    private snackBar: MatSnackBar,
    private service: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  logar() {
    // const config = new MatSnackBarConfig();
    // config.verticalPosition = 'top';
    // config.horizontalPosition = 'right';
    // config.duration = 3000;

    // this.snackBar.open('Login sucess', 'Fechar', config);
    this.service.authenticate(this.login).subscribe(resposta => {
      this.service.sucessFullLogin(resposta.headers.get('Authorization').substring(7));
      this.router.navigate(['']);
    }, () => {
      this.snackBar.open('Usuário e/ou senha inválidos')
    })
  }

  validaCampos(): boolean {
    return this.email.valid && this.password.valid;
  }

}
