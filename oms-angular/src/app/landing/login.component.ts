import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit{
  private returnUrl: string;
  constructor(private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router) { 
      this.returnUrl =
      this.route.snapshot.queryParams["returnUrl"] || "/app/dashboard";
    }

  ngOnInit(): void {

  }

  login() {
    this.authService.login("jdoe", "pass123");
    this.router.navigateByUrl(this.returnUrl);
  }
}
