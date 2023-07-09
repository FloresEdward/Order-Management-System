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
    { name: 'Product 1', category: 'Category 1', price: 10.99, stock: 20, description: 'This is product 1' },
    { name: 'Product 2', category: 'Category 2', price: 19.99, stock: 15, description: 'This is product 2' },
    { name: 'Product 3', category: 'Category 1', price: 7.99, stock: 8, description: 'This is product 3' },
    { name: 'Product 4', category: 'Category 3', price: 24.99, stock: 12, description: 'This is product 4' },
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

  openProductDialog(action: string, product: any): void {
    let dialogData = {
      action: action,
      product: product
    }
    this.dialogRef = this.dialog.open(ProductDialogComponent, { data: dialogData });
    this.dialogRef?.afterClosed().subscribe(result => {
      console.log(result);
    });
  }

  fetchData(): void {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    // headers.set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbkBtYWlsLmNvbSIsImlhdCI6MTY4ODkwOTAzOSwiZXhwIjoxNjg4OTk1NDM5fQ.0jTF8bIFiWJymeYG6ChauJZJ3aSgN-AUhDlL5aCeRAM')
    
    this.http.get('http://localhost:8080/api/v1/demo-controller',{headers: {'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJtYW5hZ2VyQG1haWwuY29tIiwiaWF0IjoxNjg4OTA5ODg3LCJleHAiOjE2ODg5OTYyODd9.1BcreB6OZTzJwyv8k00NKmQ9pF5ddUyidKCGI4lph-w'}}).subscribe(
      (response) => {
        console.log('Data:', response);
      },
      (error) => {
        console.log('Error fetching data:', error);
      }
    );
  }
}
