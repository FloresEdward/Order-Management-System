import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { OrderHistoryListComponent } from './order-history-list/order-history-list.component';

@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.component.html',
  styleUrls: ['./order-history.component.css']
})
export class OrderHistoryComponent implements OnInit{

  cardTitle: string = 'Order History';

  selectedValue: string | null = null;

  displayedColumns: string[] = ['id', 'name', 'address', 'contactNumber', 'total', 'rider', 'status', 'view'];
  listOfRiders: string[] = [];
  dataSource!: MatTableDataSource<any>;
  responseMessage: any;
  checkButtonDisabled: boolean = false;
  
  constructor(
    private dialog: MatDialog,
    private router: Router,
    private snackBar: MatSnackBar){
  }

  ngOnInit(): void {
    this.tableData();
  }

  tableData() {
  
    const data = [
      { id: 1, name: 'John Doe', address: 'Sa tabi-tabi', contactNumber: '1234567890', rider: "Rider 1", status: 'Delivered', total: '$100'},
      { id: 2, name: 'Jane Smith', address: 'Sa Bahay', contactNumber: '9876543210', rider: " ", status: 'Canceled', total: '$150'},
      { id: 3, name: 'Joe Smith', address: '123 Street', contactNumber: '9024865210', rider: "Rider 3", status: 'Delivered', total: '$250'},
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
    const dialogRef = this.dialog.open(OrderHistoryListComponent, dialogConfig);
    this.router.events.subscribe(()=>{
      dialogRef.close();
    })
  }


  downloadReportAction(values:any) {

  }

  deleteBill() {

  }

  updateCheckButtonDisabled() {
    this.checkButtonDisabled = false;
  }
}
