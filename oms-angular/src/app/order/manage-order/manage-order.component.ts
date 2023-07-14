import { AfterViewInit, OnInit, Component, Output, EventEmitter } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { ManageOrderProductsComponent } from './manage-order-products/manage-order-products.component';
import { ConfirmationDialogComponent } from './confirmation-dialog/confirmation-dialog.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { HttpClient } from '@angular/common/http';
import { GlobalConstants } from 'src/app/shared/global-constants';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-order',
  templateUrl: './manage-order.component.html',
  styleUrls: ['./manage-order.component.scss']
})
export class ManageOrderComponent implements OnInit {
  
  private baseUrl = 'http://localhost:8080/api/v1/management/order';
  cardTitle: string = 'Manage Order';

  displayedColumns: string[] = ['name', 'address', 'contactNumber', 'totalQuantity', 'grandTotal', 'rider', 'action'];
  listOfRiders: string[] = [];
  orders: any[] = [];
  responseMessage: any;
  selectedRiders: Map<number, string> = new Map<number, string>();//

  
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
    this.getRiders();
  }

  getRiders() {
    this.http.get("http://localhost:8080/api/v1/management/user/getAll")
    .subscribe((resultData: any) => {
      this.listOfRiders = resultData;
      this.listOfRiders = this.listOfRiders
        .filter((rider: any) => rider.role === "RIDER")
        .map((rider: any) => rider.lastname + ' ' + rider.firstname);
    });
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

  applyFilter(event: Event): void {

  }
  

  handleViewAction(orders: any) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      data: orders
    }
    dialogConfig.width = "100%";
    const dialogRef = this.dialog.open(ManageOrderProductsComponent, dialogConfig);
    this.router.events.subscribe(()=>{
      dialogRef.close();
    })

  }
  
  handleCancelAction(index: any) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: {
        message: 'Are you sure you want to cancel this order?',
      },
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        const order = index;
        if (order) {
          const orderId = order.id;
          const courierName = this.selectedRiders.get(orderId);
          order.courierName = courierName;
          console.log(order);
          this.orderService.setOrderStatusCancelled(order).subscribe(
            (response) => {
              console.log('Order Cancel');
              this.snackbarService.openSnackBar(GlobalConstants.cancel, 'success');
              this.getOrders();
            },
            (error) => {
              console.log('Error:', error);
            }
          );
        } else {
          console.log('Order ID is undefined');
          this.snackbarService.openSnackBar(GlobalConstants.errorCancel, 'error');
        }
      }
    });
  }

  handleProcessAction(order: any) {
    const orderId = order.id;
    const courierName = this.selectedRiders.get(orderId);

    order.courierName = courierName;

    console.log(order);
    
    if (courierName) {
      this.orderService.setOrderStatusFulfilled(order).subscribe(
        (response) => {
          console.log('Order Fulfilled');
          this.snackbarService.openSnackBar(GlobalConstants.processed, 'success');
          this.updateCourierNameInOrders(orderId, courierName); //
          this.getOrders();
        },
        (error) => {
          console.log('Error:', error);
        }
      );
    } else {
      this.snackbarService.openSnackBar(GlobalConstants.errorCancel, 'error');
    }
  }
  
  updateCourierNameInOrders(orderId: number, courierName: string) {
    const orderToUpdate = this.orders.find((order) => order.id === orderId);
    if (orderToUpdate) {
      orderToUpdate.rider = courierName;
    }
  }
  
  updateSelectedRider(orderId: number, rider: string) {
    this.selectedRiders.set(orderId, rider);
  }
  
  isCheckButtonDisabled(index: number) {
    return !this.selectedRiders.has(index);
  }

}
