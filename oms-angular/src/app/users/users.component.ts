import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { UserDialogComponent } from './user-dialog/user-dialog.component';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit{

  cardTitle: string = 'Manage Users';
  dataSource!: MatTableDataSource<any>;

  tableData() {
    const users = [
        { user: 'John Doe', role: 'Admin', module: [ 'm_Category', 'm_Product', 'm_Order', 'm_User', 'm_Role' ] },
        { user: 'Jane Smith', role: 'Order Reviewer', module: [ 'm_Order' ] },
        { user: 'User3', role: 'Order Manager', module: [ 'm_Order' ] },
        { user: 'User4', role: 'Rider', module: [ 'm_OrderStatus' ] },
        { user: 'User5', role: 'Category Manager', module: [ 'm_Category' ] },
        { user: 'User6', role: 'Product Manager', module: [ 'm_Product' ] },
        { user: 'User7', role: 'Account Manager', module: [ 'm_User' ] },
        { user: 'User8', role: 'Role Manager (could have)', module: [ 'm_Role' ] },
        { user: 'User9', role: 'Teller (create order only)', module: [ 'c_Order' ] }
      ];
      this.dataSource = new MatTableDataSource(users);
  }
  
  

  constructor(private dialog: MatDialog) {}
  ngOnInit(): void {
    this.tableData();
  }

  manageRole() {
    // Open the UserDialogComponent as a MatDialog
    const dialogRef = this.dialog.open(UserDialogComponent, {
      width: '400px',
      data: { user: '', role: '', module: '' } // Optional initial data for the form fields
    });

    dialogRef.afterClosed().subscribe(result => {
      // Handle the result after the dialog is closed, if needed
      console.log('The dialog was closed', result);
    });
  }

  editUser(user: any) {
    // Open the UserDialogComponent as a MatDialog with the selected user data
    const dialogRef = this.dialog.open(UserDialogComponent, {
      width: '400px',
      data: user
    });

    dialogRef.afterClosed().subscribe(result => {
      // Handle the result after the dialog is closed, if needed
      console.log('The dialog was closed', result);
    });
  }

  deleteUser(user: any) {
    // Implement the logic to delete the user
    console.log('Deleting user:', user);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
