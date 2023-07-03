import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: []
})
export class AppHeaderComponent {

  constructor(private authService: AuthService,private route: Router) {
  }

  changePassword() {
    // Add your change password logic here
    console.log("Change Password");
  }

  logout() {
    this.authService.logout();
    this.route.navigateByUrl('/login');
  }
}
