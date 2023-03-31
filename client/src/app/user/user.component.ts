import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { User } from '../models/user';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  login: User = {
    displayName: '',
    telephone: '',
    username: '',
    password: '',
    email: ''
  }

  password = new FormControl(null, Validators.minLength(3));
  email = new FormControl(null, Validators.email);

  constructor(
    private snackBar: MatSnackBar,
    private service: UserService,
    private router: Router
    ) { }

  ngOnInit(): void {
  }

  cadastrar() {
    // const config = new MatSnackBarConfig();
    // config.verticalPosition = 'top';
    // config.horizontalPosition = 'right';
    // config.duration = 3000;

    // this.snackBar.open('Login sucess', 'Fechar', config);
    this.service.save(this.login).subscribe(resposta => {
      this.router.navigate(['/login']);
      this.snackBar.open('Usuário cadastrado com sucesso. Por favor acesse com suas credencias');
    }, () => {
      this.snackBar.open('Usuário e/ou senha inválidos')
    })
  }

  validaCampos(): boolean {
    return this.email.valid && this.password.valid;
  }

}
