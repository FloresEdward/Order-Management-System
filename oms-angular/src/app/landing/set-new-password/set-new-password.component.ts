import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-set-new-password',
  templateUrl: './set-new-password.component.html',
  styleUrls: ['./set-new-password.component.scss', '../landing.component.scss']
})
export class SetNewPasswordComponent implements OnInit {
  passwordForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.passwordForm = this.formBuilder.group({
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    });
  }

  ngOnInit(): void {

  }

  confirmChangePassword() {
    if (this.passwordForm.invalid) {
      this.markFormControlsAsTouched();
      return;
    }

    // Passwords are valid, continue with the change password logic
    console.log(this.passwordForm.value.password);
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
