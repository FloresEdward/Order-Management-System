import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-confirmation-dialog',
  templateUrl: './confirmation-dialog.component.html',
  styleUrls: ['./confirmation-dialog.component.css']
})
export class ConfirmationDialogComponent {
  public message: string = "Are you sure?"
  public confirmButtonText = "Yes"
  public cancelButtonText = "Cancel"
  constructor(
    @Inject(MAT_DIALOG_DATA) private data: any,
    private dialogRef: MatDialogRef<ConfirmationDialogComponent>
    ) {
    this.message = data?.message || this.message;
    this.confirmButtonText = data?.buttonText?.ok || this.confirmButtonText;
    this.cancelButtonText = data?.buttonText?.cancel || this.cancelButtonText;
  }
  
  

  onConfirmClick(): void {
    this.dialogRef.close(true);
  }
}
