import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-reset-form',
  templateUrl: './reset-form.component.html',
  styleUrls: ['./reset-form.component.scss', '../../landing.component.scss']
})
export class ResetFormComponent implements OnInit {
  resetPasswordForm: FormGroup;

  constructor(private formBuilder: FormBuilder, 
              private authenticationService: AuthenticationService,
              private http: HttpClient,
              private router: Router) {
    this.resetPasswordForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  ngOnInit(): void {

  }

  sendResetLink() {
    if (this.resetPasswordForm.invalid) {
      this.markFormControlsAsTouched();
      return;
    }

    const email: string = this.resetPasswordForm.value.email
    const request = {
      "email": email
    }

    this.authenticationService.forgotPassword(request).subscribe(
      (response) => {
        console.log('Sent temporary password');
        this.router.navigateByUrl("/forgot-password/success");
        console.log(response)
      },
      (error) => {
        console.log(error);
      }
    );
  }

  isFieldInvalid(field: string): boolean {
    const control: any = this.resetPasswordForm.get(field);
    return control.invalid && (control.dirty || control.touched);
  }

  markFormControlsAsTouched(): void {
    Object.values(this.resetPasswordForm.controls).forEach(control => {
      control.markAsTouched();
    });
  }
}
