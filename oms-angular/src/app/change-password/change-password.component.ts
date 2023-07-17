import { Component } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../services/authentication.service';
import { TokenService } from '../services/token.service';
import { Router } from '@angular/router';
import { SnackbarService } from '../services/snackbar.service';
@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent {
  passwordForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private authenticationService: AuthenticationService,
              private tokenService: TokenService,
              private router: Router,
              private snackbar: SnackbarService) {
    this.passwordForm = this.formBuilder.group({
      oldPassword: ['', Validators.required],
      newPassword: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    });
  }

  confirmChangePassword() {
    if (this.passwordForm.invalid) {
      this.markFormControlsAsTouched();
      return;
    }

    const oldPassword = this.passwordForm.value.oldPassword;
    const newPassword = this.passwordForm.value.newPassword;
    const email = this.tokenService.getEmailFromToken();

    const request = {
      email,
      oldPassword,
      newPassword
    }

    console.log(request);

    this.authenticationService.changePassword(request).subscribe(
      (response) => {
        this.tokenService.removeToken();
        this.router.navigateByUrl('/change-password-success');
      },
      (error) => {
        this.snackbar.openSnackBar("Your old password is incorrect", "error")
      }
    )
  }

  isFieldInvalid(field: string): boolean {
    const control: any = this.passwordForm.get(field);
    return control.invalid && (control.dirty || control.touched);
  }

  markFormControlsAsTouched(): void {
    Object.values(this.passwordForm.controls).forEach(control => {
      control.markAsTouched();
    });
  }
}

