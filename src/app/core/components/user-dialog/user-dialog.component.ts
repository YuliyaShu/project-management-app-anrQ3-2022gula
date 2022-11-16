import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { SignUpBody, User } from '@core/models';
import { HttpResponseService, ModalWindowService, UserService } from '@core/services';
import { take } from 'rxjs';
import { config } from './user.constants';

@Component({
  selector: 'app-user-dialog',
  templateUrl: './user-dialog.component.html',
  styleUrls: ['./user-dialog.component.scss'],
})
export class UserDialogComponent implements OnInit {
  userUpdateForm = new FormGroup({
    name: new FormControl('', [
      Validators.required,
      Validators.minLength(config.MIN_LENGTH),
      Validators.maxLength(config.MAX_LENGTH),
      Validators.pattern(config.PATTERN_NAME),
    ]),
    login: new FormControl('', [
      Validators.required,
      Validators.email,
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(config.MIN_LENGTH),
      Validators.maxLength(config.MAX_LENGTH),
      Validators.pattern(config.PATTERN_PASSWORD),
    ]),
  });

  controlName = this.userUpdateForm.get('name') as FormControl;

  controlLogin = this.userUpdateForm.get('login') as FormControl;

  controlPassword = this.userUpdateForm.get('password') as FormControl;

  userData: User = {
    name: '',
    login: '',
    _id: '',
  };

  constructor(
    private userService: UserService,
    private modalService: ModalWindowService,
    private apiService: HttpResponseService
  ) {}

  ngOnInit(): void {
    const userId = localStorage.getItem('userId') as string;
    this.apiService.getUser(userId).subscribe(value => {
      if ('_id' in value) {
        this.userData = value;
      }
      return value;
    });
  }

  changeUserData(): void {
    if (this.userUpdateForm.invalid) {
      return;
    }
    const data = this.userUpdateForm.value as SignUpBody;
    const userId = localStorage.getItem('userId') as string;
    this.userService.updateUser(userId, data);
  }

  deleteUser(): void {
    this.modalService.modalHandler$.next({
      type: 'confirm',
      emitter: 'User',
      action: 'delete',
      payload: '',
    });
    this.modalService.modalEmitter$.pipe(take(1)).subscribe(result => {
      if (result === 'confirm') {
        const userId = localStorage.getItem('userId') as string;
        this.userService.deleteUser(userId);
      }
      return;
    });
  }
}
