import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../../services/authentication.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { TokenService } from 'src/app/services/token.service';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { GlobalConstants } from 'src/app/shared/global-constants';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss', '../landing.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  private returnUrl: string;
  public authenticationError: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private authenticationService: AuthenticationService,
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router,
    private snackbarService: SnackbarService
  ) {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/app/dashboard';

    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  ngOnInit(): void {

  }

  public login(): void {
    if (this.loginForm.invalid) {
      this.markFormControlsAsTouched();
      return;
    }

    const email = this.loginForm.value.email;
    const password = this.loginForm.value.password;


    this.authenticationService.authenticate({ email, password }).subscribe(
      (response) => {
        this.router.navigateByUrl(this.returnUrl);

      },
      (error) => {
        console.log(error);
        this.authenticationError = true;
      }
    );
  }

  public isFieldInvalid(field: string): boolean {
    const control: any = this.loginForm.get(field);
    return control.invalid && (control.dirty || control.touched);
  }

  private markFormControlsAsTouched(): void {
    Object.values(this.loginForm.controls).forEach(control => {
      control.markAsTouched();
    });
  }
}
