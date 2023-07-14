import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TokenService } from 'src/app/services/token.service';
//import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: []
})
export class AppHeaderComponent {

  // constructor(private authService: AuthService,private route: Router) {
  // }
  constructor(private router: Router, private tokenService: TokenService) {
  }

  changePassword() {
    this.router.navigateByUrl("/app/change-password");
  }

  logout() {
    this.tokenService.removeToken();
    this.router.navigateByUrl('/');
  }
}
