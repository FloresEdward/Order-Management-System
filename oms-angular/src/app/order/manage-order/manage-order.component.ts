import { AfterViewInit, OnInit, Component, Output, EventEmitter } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { ManageOrderProductsComponent } from './manage-order-products/manage-order-products.component';
import { ConfirmationDialogComponent } from './confirmation-dialog/confirmation-dialog.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-order',
  templateUrl: './manage-order.component.html',
  styleUrls: ['./manage-order.component.scss']
})
export class ManageOrderComponent implements OnInit {
  
  private baseUrl = 'http://localhost:8080/api/v1/management/order';
  cardTitle: string = 'Manage Order';

  dropDownList: string[] = ['Edward', 'Emman', 'Troy'];
  displayedColumns: string[] = ['name', 'address', 'contactNumber', 'total', 'rider', 'action'];
  listOfRiders: string[] = [];
  orders: any[] = [];
  responseMessage: any;
  checkButtonDisabled: boolean = false;
  
  constructor(
    private dialog: MatDialog,
    private router: Router,
    private snackBar: SnackbarService, 
    private http: HttpClient, 
    private route: ActivatedRoute){
  }

  ngOnInit(): void {
    this.getOrders();
  }

  getOrders(): void {
    console.log('getOrders() is called should display data now.');

    this.http.get<any[]>(this.baseUrl + '/').subscribe(
      (response) => {
        this.orders = response;
        console.log(this.orders);
      },
      (error) => {
        console.log('Error:', error);
      }
    );

  }

  applyFilter(event: any) {

  }

  handleViewAction(values: any) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      data:values
    }
    dialogConfig.width = "100%";
    const dialogRef = this.dialog.open(ManageOrderProductsComponent, dialogConfig);
    this.router.events.subscribe(()=>{
      dialogRef.close();
    })
  }

  handleDeleteAction(index: number) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: {
        message: 'Are you sure you want to cancel this order?',
      },
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        console.log(`Row Deleted`);
      }
    });

  }

  updateCheckButtonDisabled() {
    this.checkButtonDisabled = false;
  }

}
