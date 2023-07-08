import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-product-dialog',
  templateUrl: './product-dialog.component.html',
  styleUrls: ['./product-dialog.component.scss']
})
export class ProductDialogComponent {
  dialogTitle: string = "";
  action: string = "";

  productName: string | undefined;
  productDescription: string | undefined;
  productPrice: number | undefined;
  productStock: number | undefined;

  constructor(public dialogRef: MatDialogRef<ProductDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: string) {
                this.action = data;
              }

  addProduct(): void {
    // Perform validation and add product logic here
    // Close the dialog
    this.dialogRef.close();
  }

  editProduct(product: any): void {
    console.log('Product is succesfully editted');
    this.dialogRef.close();
  }

  deleteProduct(product: any): void {
    this.dialogRef.close();
  }

  cancel(): void {
    // Close the dialog without adding the product
    this.dialogRef.close();
  }
}
