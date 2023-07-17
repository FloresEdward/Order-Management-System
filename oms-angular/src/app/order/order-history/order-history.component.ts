import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { OrderHistoryListComponent } from './order-history-list/order-history-list.component';
import { HttpClient, HttpParams } from '@angular/common/http';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.component.html',
  styleUrls: ['./order-history.component.scss']
})
export class OrderHistoryComponent implements OnInit{
  private baseUrl = 'http://localhost:8080/api/v1/management/order';
  cardTitle: string = 'Order History';

  selectedValue: string | null = null;

  displayedColumns: string[] = ['name', 'address', 'contactNumber','totalQuantity', 'grandTotal', 'rider', 'status', 'view'];
  orders: any[] = [];
  dataSource!: MatTableDataSource<any>;
  responseMessage: any;
  checkButtonDisabled: boolean = false;
  
  totalElements: number = 0;
  pageSize: number = 10;
  currentPage: number = 0;

  constructor(
    private dialog: MatDialog,
    private router: Router,
    private http: HttpClient){
  }

  ngOnInit(): void {
    this.getOrdersPaginated();
  }

  onPageChange(event: PageEvent): void {
    this.pageSize = event.pageSize;
    this.currentPage = event.pageIndex;
    this.getOrdersPaginated();
  }

  setOrdersArray(response: any) {
    this.orders = response.content;
    this.totalElements = response.totalElements;
    this.dataSource = new MatTableDataSource<any>(this.orders);
  }

  public getOrdersPaginated(): void {
    let page = this.currentPage;
    let size = this.pageSize;
    let params = new HttpParams().set('page', page.toString()).set('size', size.toString());

    this.http.get<any[]>(this.baseUrl + '/paginated', { params }).subscribe(
      (response) => {
        this.setOrdersArray(response);
      },
      (error) => {
        console.log('Error:', error);
      }
    )
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  handleViewAction(values: any) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      data:values
    }
    dialogConfig.width = "100%";
    const dialogRef = this.dialog.open(OrderHistoryListComponent, dialogConfig);
    this.router.events.subscribe(()=>{
      dialogRef.close();
    })
  }


  updateCheckButtonDisabled() {
    this.checkButtonDisabled = false;
  }
}
