import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss', '../landing.component.scss'],
})
export class LoginComponent {
  email: string = "";
  password: string = "";
  private returnUrl: string;


  constructor(private authenticationService: AuthenticationService,
     private http: HttpClient,
      private route: ActivatedRoute,
       private router: Router,
       ) {
    this.returnUrl = this.route.snapshot.queryParams["returnUrl"] || "/app/dashboard";
  }

  ngOnInit(): void { }

  public login(): void {
    console.log(this.email);
    console.log(this.password);

    const credentials = {
      /* construct the authentication request object */
      email: this.email,
      password: this.password
    };
    this.authenticationService.authenticate(credentials).subscribe(
      (response) => {
        this.router.navigateByUrl(this.returnUrl);
        console.log('Token from service:', this.authenticationService.getTokenFromService());
      },
      (error) => {
        console.log(error)
      }
    );
  }
}
