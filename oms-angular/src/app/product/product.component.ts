import { Component } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ProductDialogComponent } from './dialogs/product-dialog/product-dialog.component';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent {

  cardTitle: string = 'Manage Menu'; //title for card
  
  products: any[] = [
    { name: 'Product 1', category: 'Category 1', price: 10.99, stock: 20 },
    { name: 'Product 2', category: 'Category 2', price: 19.99, stock: 15 },
    { name: 'Product 3', category: 'Category 1', price: 7.99, stock: 8 },
    { name: 'Product 4', category: 'Category 3', price: 24.99, stock: 12 },
  ];

    
  dialogRef: MatDialogRef<ProductDialogComponent> | undefined;

  constructor(private dialog: MatDialog, private http: HttpClient) {}


  addProduct(): void {
    // Add product logic here
  }

  editProduct(product: any): void {
    // Edit product logic here
  }

  deleteProduct(product: any): void {
    // Delete product logic here
  }

  openProductDialog(action: string): void {
    this.dialogRef = this.dialog.open(ProductDialogComponent, { data: action });
    this.dialogRef?.afterClosed().subscribe(result => {
      console.log(result);
    });
  }

  fetchData(): void {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    this.http.get('localhost:4200/api/v1/demo-controller',{headers: headers}).subscribe(
      (response) => {
        console.log('Data:', response);
      },
      (error) => {
        console.log('Error fetching data:', error);
      }
    );
  }
}
