import { Component } from '@angular/core';

@Component({
  selector: 'app-set-new-password',
  templateUrl: './set-new-password.component.html',
  styleUrls: ['./set-new-password.component.scss', '../landing.component.scss']
})
export class SetNewPasswordComponent {
  password: string = "";

  confirmChangePassword() {
    console.log(this.password);
  }

}
