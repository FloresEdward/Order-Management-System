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
  constructor(private route: Router, private tokenService: TokenService) {
  }

  changePassword() {
    // Add your change password logic here
    console.log("Change Password");
  }

  logout() {
    // this.authService.logout();
    this.tokenService.removeToken();
    this.route.navigateByUrl('/');
  }
}
