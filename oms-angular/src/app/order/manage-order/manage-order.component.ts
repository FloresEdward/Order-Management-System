import { AfterViewInit, OnInit, Component, Output, EventEmitter } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { Route, Router } from '@angular/router';
import { ManageOrderProductsComponent } from '../../material-component/dialog/manage-order-products/manage-order-products.component';
import { ConfirmationDialogComponent } from './confirmation-dialog/confirmation-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-order',
  templateUrl: './manage-order.component.html',
  styleUrls: ['./manage-order.component.scss']
})
export class ManageOrderComponent implements OnInit {
  
  cardTitle: string = 'Manage Order';
  selectedValue: string | null = null;

  displayedColumns: string[] = ['id', 'name', 'address', 'contactNumber', 'total', 'rider', 'action'];
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
    const dropDownList: string[] = ['Edward', 'Emman', 'Troy'];
  
    const data = [
      { id: 1, name: 'John Doe', address: 'Sa tabi-tabi', contactNumber: '1234567890', status: this.listOfRiders, total: '$100', isSelected: false },
      { id: 2, name: 'Jane Smith', address: 'Sa Bahay', contactNumber: '9876543210', status: this.listOfRiders, total: '$150', isSelected: false },
      { id: 3, name: 'Joe Smith', address: '123 Street', contactNumber: '9024865210',status: this.listOfRiders, total: '$250', isSelected: false },
    ];
    this.dataSource = new MatTableDataSource(data);
    this.listOfRiders = dropDownList;
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
    const dialogRef = this.dialog.open(ConfirmationDialogComponent,{
      data:{
        message: 'Are you sure want to delete?',
      }
    });
  }

  downloadReportAction(values:any) {

  }

  deleteBill() {

  }

  updateCheckButtonDisabled() {
    this.checkButtonDisabled = false;
  }
  
}
