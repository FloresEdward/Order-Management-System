import { AfterViewInit, OnInit, Component } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { Route, Router } from '@angular/router';
import { ManageOrderProductsComponent } from '../../material-component/dialog/manage-order-products/manage-order-products.component';

@Component({
  selector: 'app-order',
  templateUrl: './manage-order.component.html',
  styleUrls: ['./manage-order.component.scss']
})
export class ManageOrderComponent implements OnInit {
  
  cardTitle: string = 'Manage Order'; // title for card

  displayedColumns: string[] = ['name', 'email', 'contactNumber', 'paymentMethod', 'total', 'view'];
  // dataSource: any[] = [];
  dataSource!: MatTableDataSource<any>;
  responseMessage: any;

  // ngAfterViewInit(): void { }
  
  constructor(
    private dialog: MatDialog,
    private router: Router){
      // this.dataSource = new MatTableDataSource<any>([]);
  }

  ngOnInit(): void {
    this.tableData();
  }

  tableData() {
    const data = [
      { name: 'John Doe', email: 'john.doe@example.com', contactNumber: '1234567890', paymentMethod: 'Credit Card', total: '$100' },
      { name: 'Jane Smith', email: 'jane.smith@example.com', contactNumber: '9876543210', paymentMethod: 'PayPal', total: '$150' },
      { name: 'Joe Smith', email: 'joe.smith@example.com', contactNumber: '9024865210', paymentMethod: 'Libre', total: '$250' },
    ];
    this.dataSource = new MatTableDataSource(data);
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
    const dialogRef = this.dialog.open(ManageOrderProductsComponent, dialogConfig);
    this.router.events.subscribe(()=>{
      dialogRef.close();
    })
  }

  handleDeleteAction(values:any) {

  }

  downloadReportAction(values:any) {

  }

  deleteBill() {

  }
}
