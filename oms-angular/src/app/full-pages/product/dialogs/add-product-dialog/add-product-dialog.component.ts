import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-product-dialog',
  templateUrl: './add-product-dialog.component.html',
  styleUrls: ['./add-product-dialog.component.scss']
})
export class AddProductDialogComponent {
  productName: string | undefined;
  productDescription: string | undefined;
  productPrice: number | undefined;
  productStock: number | undefined;

  constructor(public dialogRef: MatDialogRef<AddProductDialogComponent>) { }

  addProduct(): void {
    // Perform validation and add product logic here

    // Close the dialog
    this.dialogRef.close();
  }

  cancel(): void {
    // Close the dialog without adding the product
    this.dialogRef.close();
  }
}
