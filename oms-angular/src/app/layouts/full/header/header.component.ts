import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: []
})
export class AppHeaderComponent {

  constructor() {
  }

  changePassword() {
    // Add your change password logic here
    console.log("Change Password");
  }

  logout() {
    // Add your logout logic here
    console.log("Logout");
  }
}
