import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-user-dialog',
  templateUrl: './user-dialog.component.html',
  styleUrls: ['./user-dialog.component.scss']
})
export class UserDialogComponent {
  roles = [
    // { role: 'Admin', description: 'All Access' },
    { role: 'Category Manager', description: 'Access to Category Module, and create order' },
    { role: 'Menu Manager', description: 'Access to Menu Module, and create order' },
    { role: 'Order Manager', description: 'Access to Order Module, view order archive, create and update' },
    { role: 'Account Manager', description: 'Access to User Management' },
    { role: 'Teller', description: 'Create order only' },
    { role: 'Rider', description: 'Update order status only' },
  ];

  statuses = ['active', 'inactive', 'locked']

  constructor(
    public dialogRef: MatDialogRef<UserDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }
  

  saveUser(): void {
    // Perform any necessary save operations or data validation here
    const modifiedData = Object.assign({}, this.data);
    this.dialogRef.close(modifiedData);
  }
  

  closeDialog(): void {
    this.dialogRef.close();
  }

}
