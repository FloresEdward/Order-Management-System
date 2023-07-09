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
              @Inject(MAT_DIALOG_DATA) public data: any) {
                this.action = data.action;
                this.productName = data.product ? data.product.name : '';
                this.productDescription = data.product ? data.product.description : '';
                this.productPrice = data.product ? data.product.price : '';
                this.productStock = data.product ? data.product.stock : '';
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
