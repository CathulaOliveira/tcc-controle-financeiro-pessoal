import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../services/user.service';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { User } from '../models/user';
import { PhoneMaskDirective } from 'src/app/utils/phone-mask.directive';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  form: FormGroup;

  @ViewChild(PhoneMaskDirective) phoneMaskDirective: PhoneMaskDirective;

  constructor(
    private service: UserService,
    private snackBar: SnackbarService,
  ) { }

  ngOnInit(): void {
    this.createForm();
    this.getUser(); 
  }

  createForm() {
    this.form = new FormGroup({
      id: new FormControl(null),
      username: new FormControl('', [Validators.required, 
        Validators.minLength(4), 
        Validators.maxLength(255)]),
      password: new FormControl(null, [Validators.minLength(6), 
        Validators.maxLength(255), 
        Validators.pattern("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d).*$")]),
      displayName: new FormControl('', [Validators.required,
        Validators.minLength(4), 
        Validators.maxLength(255)]),
      telephone: new FormControl('', [Validators.required]),
      email: new FormControl(null, Validators.email),
    });
  }

  getUser() {
    this.service.getUserLogged().subscribe(res => {
      if (res) {
        this.form.patchValue(res);
        this.form.get('telephone').setValue(this.phoneMaskDirective.format(res.telephone));
        this.form.get('password').setValue(null);
      }
    });
  }

  save() {
    const user: User = this.form.value;
    let telephone = this.form.get('telephone').value.replace(/[)(-\s]/g, '');
    user.telephone = telephone;
    this.service.update(user).subscribe(resposta => {
      this.setDisplayName(user.displayName);
      this.snackBar.open('Usuário atualizado com sucesso', 'snackbar-sucess');
    }, erro => {
      this.snackBar.open('Erro ao atualizar registro' + erro.message, 'snackbar-warning')
    })
  }

  validate(): boolean {
    return this.form.valid;
  }

  setDisplayName(displayName) {
    this.service.displayName = displayName;
  }
}
