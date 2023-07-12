import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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

  productId: string | undefined;
  productName: string | undefined;
  productCategory: any | undefined;
  productDescription: string | undefined;
  productPrice: number | undefined;
  productStock: number | undefined;

  selectedCategory: any;

  categories: any[] = [];

  productForm: FormGroup;

  constructor(public dialogRef: MatDialogRef<ProductDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private productService: ProductService,
    private router: Router,
    private http: HttpClient,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder
  ) {
    this.action = data.action;
    this.productId = data.product ? data.product.id : '';
    this.productName = data.product ? data.product.name : '';
    this.productCategory = data.product ? data.product.category : '';
    this.productDescription = data.product ? data.product.description : '';
    this.productPrice = data.product ? data.product.price : '';
    this.productStock = data.product ? data.product.stock : '';

    this.productForm = this.formBuilder.group({
      name: [this.productName, [Validators.required, Validators.pattern(/^[a-zA-Z\s]+$/)]],
      category: [this.productCategory, Validators.required],
      description: [this.productDescription, Validators.required],
      price: [this.productPrice, [Validators.required, Validators.min(0)]],
      stock: [this.productStock, [Validators.required, Validators.min(0)]]
    });

    console.log(data.product)
  }
  ngOnInit(): void {
    this.getCategories();
  }

  compareCategories(category1: any, category2: any): boolean {
    return category1 && category2 ? category1.id === category2.id : category1 === category2;
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

  handleSubmit(action: string) {
    if (this.productForm.invalid) {
      return;
    }

    switch (this.action) {
      case 'Add':
        this.addProduct();
        break;
      case 'Edit':
        this.editProduct();
        break;
      default:
        break;
    }
  }

  addProduct(): void {
    if (this.productForm.valid) {
      const productDetails = {
        name: this.productForm.get('name')?.value,
        description: this.productForm.get('description')?.value,
        category: this.productForm.get('category')?.value,
        price: this.productForm.get('price')?.value,
        stock: this.productForm.get('stock')?.value
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
  }

  editProduct(): void {
    if (this.productForm.valid) {
      const productDetails = {
        id: this.productId,
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
  }

  deleteProduct(): void {
    if (this.productForm.valid) {
      const productDetails = {
        id: this.productId,
      }

      this.productService.deleteProduct(productDetails).subscribe(
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
  }

  cancel(): void {
    // Close the dialog without adding the product
    this.dialogRef.close();
  }
}
