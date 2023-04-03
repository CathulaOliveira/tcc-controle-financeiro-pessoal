import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from './models/user';
import { SnackbarService } from '../services/snackbar.service';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  form: FormGroup;

  constructor(
    private snackBar: SnackbarService,
    private service: UserService,
    private router: Router
    ) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      username: new FormControl('', [Validators.required, 
        Validators.minLength(4), 
        Validators.maxLength(255)]),
      password: new FormControl(null, [Validators.required, 
        Validators.minLength(6), 
        Validators.maxLength(255), 
        Validators.pattern("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d).*$")]),
      displayName: new FormControl('', [Validators.required,
        Validators.minLength(4), 
        Validators.maxLength(255)]),
      telephone: new FormControl('', [Validators.required,
        Validators.pattern("^[0-9]+$")]),
      email: new FormControl(null, Validators.email),
    });
  }

  cadastrar() {
    const user: User = this.form.value;
    this.service.save(user).subscribe(resposta => {
      this.router.navigate(['/login']);
      this.snackBar.open('Usuário cadastrado com sucesso. Por favor acesse com suas credencias', 'snackbar-sucess');
    }, () => {
      this.snackBar.open('Usuário e/ou senha inválidos', 'snackbar-warning')
    })
  }

  validaCampos(): boolean {
    return this.form.valid;
  }

}
