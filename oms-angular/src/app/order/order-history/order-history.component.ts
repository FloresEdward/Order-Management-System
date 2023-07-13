import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderHistoryListComponent } from './order-history-list/order-history-list.component';
import { HttpClient } from '@angular/common/http';
import { OrderService } from 'src/app/services/order.service';
import { SnackbarService } from 'src/app/services/snackbar.service';

@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.component.html',
  styleUrls: ['./order-history.component.css']
})
export class OrderHistoryComponent implements OnInit{
  private baseUrl = 'http://localhost:8080/api/v1/management/order';
  cardTitle: string = 'Order History';

  selectedValue: string | null = null;

  displayedColumns: string[] = ['name', 'address', 'contactNumber', 'total', 'rider', 'state', 'view'];
  orders: any[] = [];
  dataSource!: MatTableDataSource<any>;
  responseMessage: any;
  checkButtonDisabled: boolean = false;
  
  constructor(
    private dialog: MatDialog,
    private router: Router,
    private orderService: OrderService,
    private snackbarService: SnackbarService, 
    private http: HttpClient, 
    private route: ActivatedRoute){
  }

  ngOnInit(): void {
    this.getOrders();
  }

  getOrders(): void {
    this.http.get<any[]>(this.baseUrl + '/').subscribe(
      (response) => {
        this.orders = response;
        console.log(this.orders)
      },
      (error) => {
        console.log('Error:', error);
      }
    );
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
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
