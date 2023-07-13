import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { SnackbarService } from 'src/app/services/snackbar.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss', '../landing.component.scss']
})
export class SignupComponent {

  signupForm: FormGroup;
  
  firstname: string = "";
  lastname: string = "";
  email: string = "";
  password: string = "";
  
  private returnUrl: string;
  userArray: any[] = [];

  constructor(private authenticationService: AuthenticationService, private router: Router, private http: HttpClient, private route: ActivatedRoute,
    private formBuilder: FormBuilder, private snackbarService: SnackbarService){
    this.returnUrl = this.route.snapshot.queryParams["returnUrl"] || "/";

    this.signupForm = this.formBuilder.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8), Validators.pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[^\w\s]).{8,}$/)]],
      confirmPassword: ['', [Validators.required, this.matchPasswordValidator()]],
    });
  }

  isFieldInvalid(field: string): boolean {
    const control: any = this.signupForm.get(field);
    return control.invalid && (control.dirty || control.touched);
  }

  markFormControlsAsTouched(): void {
    Object.values(this.signupForm.controls).forEach(control => {
      control.markAsTouched();
    });
  }

  matchPasswordValidator() {
    return (control: AbstractControl) => {
      const password = this.signupForm?.get('password')?.value;
      const confirmPassword = control.value;
      return password === confirmPassword ? null : { mismatch: true };
    };
  }

  public signup(): void {

    if (this.signupForm.invalid) {
      this.markFormControlsAsTouched();
      return;
    }

    const userDetails = {
      email: this.signupForm.value.email,
      password: this.signupForm.value.password,
      firstname: this.signupForm.value.firstname,
      lastname: this.signupForm.value.lastname
    };
    // check if email is unique
    this.http.get('http://localhost:8080/api/v1/management/user/getAll')
    .subscribe((resultData: any) => {
      this.userArray = resultData
          .filter((user: any) => user.email === userDetails.email);
      if (this.userArray.length === 0) {
        this.authenticationService.register(userDetails).subscribe(
          (response) => {
            this.snackbarService.openSnackBar('Registered Successfully', 'success');
            this.router.navigateByUrl(this.returnUrl);
          }
        );
      } else {
        this.snackbarService.openSnackBar("Error: Email has existing account.", 'error');
      }
    })
    //
    
  }
}
