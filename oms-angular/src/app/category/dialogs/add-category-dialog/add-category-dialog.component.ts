import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';


@Component({
  selector: 'app-add-category-dialog',
  templateUrl: './add-category-dialog.component.html',
  styleUrls: ['./add-category-dialog.component.scss']
})
export class AddCategoryDialogComponent {
  categoryName: string = "";
  constructor(public dialogRef: MatDialogRef<AddCategoryDialogComponent>) {}

  closeDialog(): void {
    this.dialogRef.close();
  }

  addCategory(): void {
    // Add category logic here
    // You can access the category form data using the component's properties
  }
}
