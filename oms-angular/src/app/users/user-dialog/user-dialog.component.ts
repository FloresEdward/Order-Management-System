import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-user-dialog',
  templateUrl: './user-dialog.component.html',
  styles: [`.user-info {
    .info-row {
      display: flex;
      margin-bottom: 10px;
  
      .info-label {
        font-weight: bold;
        margin-right: 5px;
      }
    }
  }
  `]
})
export class UserDialogComponent {
  roles = [
    // { role: 'ADMIN' },
    { role: 'CATEGORY' },
    { role: 'MENU' },
    { role: 'ORDER' },
    { role: 'ACCOUNT' },
    { role: 'TELLER' },
    { role: 'RIDER' },
  ];

  statuses = ['active', 'inactive']
  constructor(
    public dialogRef: MatDialogRef<UserDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  onSave(): void {
    this.dialogRef.close(this.data);
  }

  onCancel(): void {
    this.dialogRef.close();
  }

}
