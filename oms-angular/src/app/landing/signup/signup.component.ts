import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss', '../landing.component.scss']
})
export class SignupComponent {
  firstname: string = "";
  lastname: string = "";
  email: string = "";
  password: string = "";
  
  private returnUrl: string;

  constructor(private authenticationService: AuthenticationService, private router: Router, private http: HttpClient, private route: ActivatedRoute){
    this.returnUrl = this.route.snapshot.queryParams["returnUrl"] || "/";
  }

  public signup(): void {
    console.log(this.email);
    console.log(this.password);

    const userDetails = {
      /* construct the authentication request object */
      email: this.email,
      password: this.password,
      firstname: this.firstname,
      lastame: this.lastname
    };
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
