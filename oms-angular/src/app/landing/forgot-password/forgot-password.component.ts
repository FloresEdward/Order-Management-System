import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss', '../landing.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
  resetPasswordForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {
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

    // Send reset link logic
    console.log(this.resetPasswordForm.value.email);
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
