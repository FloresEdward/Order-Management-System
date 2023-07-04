import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-best-seller',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthenticationService
  ) {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  ngOnInit(): void {}

  public login(): void {
    const credentials = {
      /* construct the authentication request object */
    };
    this.authService.authenticate(credentials).subscribe(
      (response) => {
        // Handle successful authentication
      },
      (error) => {
        // Handle authentication error
      }
    );
  }

  // Other methods and component logic
}

// export class LoginComponent implements OnInit{
//   private returnUrl: string;
//   constructor(private authService: AuthService,
//     private route: ActivatedRoute,
//     private router: Router) {
//       this.returnUrl =
//       this.route.snapshot.queryParams["returnUrl"] || "/app/dashboard";
//     }

//   ngOnInit(): void {

//   }

//   login() {
//     this.authService.login("jdoe", "pass123");
//     this.router.navigateByUrl(this.returnUrl);
//   }
// }
