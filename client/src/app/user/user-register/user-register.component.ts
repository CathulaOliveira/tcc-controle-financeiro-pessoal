import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { UserService } from '../services/user.service';
import { User } from '../models/user';

@Component({
  selector: 'app-user',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.css']
})
export class UserRegisterComponent implements OnInit {

  form: FormGroup;

  constructor(
    private snackBar: SnackbarService,
    private service: UserService,
    private router: Router
    ) { }

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
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
      telephone: new FormControl('', [Validators.required]),
      email: new FormControl(null, Validators.email),
    });
  }

  save() {
    const user: User = this.form.value;
    this.service.save(user).subscribe(resposta => {
      this.router.navigate(['/login']);
      this.snackBar.open('Usuário cadastrado com sucesso. Por favor acesse com suas credencias', 'snackbar-sucess');
    }, erro => {
      this.snackBar.open('Erro ao salvar registro. ' + erro.error, 'snackbar-warning')
    })
  }

  validate(): boolean {
    return this.form.valid;
  }

  backLogin() {
    this.router.navigate(['/login']);
  }

}
