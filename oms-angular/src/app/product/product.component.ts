import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { ProductDialogComponent } from './dialogs/product-dialog/product-dialog.component';
import { Observable } from 'rxjs';
import { PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

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

  totalElements: number = 0;
  pageSize: number = 10;
  currentPage: number = 0;

  dataSource!: MatTableDataSource<any>;
  
  constructor(private dialog: MatDialog, private http: HttpClient) {}

  ngOnInit(): void {
    //this.getProducts();

    this.getProductsPaginated()
  }

  onPageChange(event: PageEvent): void {
    this.pageSize = event.pageSize;
    this.currentPage = event.pageIndex;
    this.getProductsPaginated();
  }

  truncateDescription(description: string, length: number): string {
    return (description.length > length) ? description.substr(0, length) + '...' : description;
  }


  setProductsArray(response: any) {
    this.products = response.content;
    this.totalElements = response.totalElements;
  }

  public getProductsPaginated(): void {
    let page = this.currentPage;
    let size = this.pageSize;
    let params = new HttpParams().set('page', page.toString()).set('size', size.toString());

    this.http.get<any[]>(this.baseUrl + '/paginated', { params }).subscribe(
      (response) => {
        this.setProductsArray(response);
        this.dataSource = new MatTableDataSource<any>(this.products);
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
      this.getProductsPaginated();
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }  
}
