import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router, ActivatedRoute } from '@angular/router';
import { CategoryService } from 'src/app/services/category.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-dialog',
  templateUrl: './product-dialog.component.html',
  styleUrls: ['./product-dialog.component.scss']
})
export class ProductDialogComponent implements OnInit {
  dialogTitle: string = "";
  action: string = "";

  productName: string | undefined;
  productCategory: any | undefined;
  productDescription: string | undefined;
  productPrice: number | undefined;
  productStock: number | undefined;

  selectedCategory: any;

  categories: any[] = [];

  constructor(public dialogRef: MatDialogRef<ProductDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private productService: ProductService,
    private router: Router,
    private http: HttpClient,
    private route: ActivatedRoute,
    ) {
    this.action = data.action;
    this.productName = data.product ? data.product.name : '';
    this.productCategory = data.product ? data.product.category : '';
    this.productDescription = data.product ? data.product.description : '';
    this.productPrice = data.product ? data.product.price : '';
    this.productStock = data.product ? data.product.stock : '';


  }
  ngOnInit(): void {
    this.getCategories();
  }

  getCategories(): void {
    const baseUrl = 'http://localhost:8080/api/v1/management/category';
    this.http.get<any[]>(baseUrl + '/').subscribe(
      (response) => {
        this.categories = response;
        this.selectedCategory = this.categories.find(category => category.name === this.productCategory.name);
      },
      (error) => {
        console.log('Error:', error);
      }
    );
  }

  closeDialog(): void {
    this.dialogRef.close({ success: false });
  }

  addProduct(): void {
    const productDetails = {
      name: this.productName,
      description: this.productDescription,
      category: this.productCategory,
      price: this.productPrice,
      stock: this.productStock
    }

    this.productService.addProduct(productDetails).subscribe(
      (response) => {
        console.log(response)
        this.dialogRef.close({ success: true });
      },
      (error) => {
        console.log(error)
      }
    );

    this.dialogRef.close();
  }

  editProduct(): void {
    const productDetails = {
      name: this.productName,
      description: this.productDescription,
      category: this.productCategory,
      price: this.productPrice,
      stock: this.productStock
    }

    this.productService.editProduct(productDetails).subscribe(
      (response) => {
        console.log(response)
        this.dialogRef.close({ success: true });
      },
      (error) => {
        console.log(error)
      }
    );

    this.dialogRef.close();
  }

  deleteProduct(): void {
    this.dialogRef.close();
  }

  cancel(): void {
    // Close the dialog without adding the product
    this.dialogRef.close();
  }
}
