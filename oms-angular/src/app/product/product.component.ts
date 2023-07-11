import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ProductDialogComponent } from './dialogs/product-dialog/product-dialog.component';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit{

  private baseUrl = 'http://localhost:8080/api/v1/management/menu';
  cardTitle: string = 'Manage Menu';
  products: any[] = [];
  dialogRef: MatDialogRef<ProductDialogComponent> | undefined;

  constructor(private dialog: MatDialog, private http: HttpClient) {}

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts(): void {
    this.http.get<any[]>(this.baseUrl + '/').subscribe(
      (response) => {
        this.products = response;
      },
      (error) => {
        console.log('Error:', error);
      }
    );
  }

  openProductDialog(action: string, product: any): void {
    let dialogData = {
      action: action,
      product: product
    }
    this.dialogRef = this.dialog.open(ProductDialogComponent, { data: dialogData });
    this.dialogRef?.afterClosed().subscribe(result => {
      console.log(result);
      this.getProducts();
    });
  }
}
