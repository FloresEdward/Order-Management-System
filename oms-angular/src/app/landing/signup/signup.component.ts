import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';

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

  constructor(private authenticationService: AuthenticationService, private router: Router, private http: HttpClient, private route: ActivatedRoute,
    private formBuilder: FormBuilder){
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

    console.log(this.signupForm.value);
    
    console.log(this.email);
    console.log(this.password);

    const userDetails = {
      /* construct the authentication request object */
      email: this.email,
      password: this.password,
      firstname: this.firstname,
      lastame: this.lastname
      // Add default Role to this object before insert to database
    };
    // check if email is unique
    this.authenticationService.register(userDetails).subscribe(
      (response) => {
        console.log(response)
        this.router.navigateByUrl(this.returnUrl);
      },
      (error) => {
        console.log(error)
      }
    );
  }
}
