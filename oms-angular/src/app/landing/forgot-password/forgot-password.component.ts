import { Component } from '@angular/core';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss', '../landing.component.scss']
})
export class ForgotPasswordComponent {
  email: string = "";

  sendResetLink(){
    console.log(this.email);
  }
}
