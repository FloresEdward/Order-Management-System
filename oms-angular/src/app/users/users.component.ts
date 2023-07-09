import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { UserDialogComponent } from './user-dialog/user-dialog.component';
import { MatTableDataSource } from '@angular/material/table';
import { ConfirmationDialogComponent } from '../order/manage-order/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit{

  cardTitle: string = 'Manage Accounts';
  dataSource!: MatTableDataSource<any>;

  tableData() {
    const roles = [
      { role: 'Admin', description: 'All Access' },
      { role: 'Category Manager', description: 'Access to Category Module, and create order' },
      { role: 'Menu Manager', description: 'Access to Menu Module, and create order' },
      { role: 'Order Manager', description: 'Access to Order Module, view order archive, create and update' },
      { role: 'Account Manager', description: 'Access to User Management' },
      { role: 'Teller', description: 'Create order only' },
      { role: 'Rider', description: 'Update order status only' },
    ];
  
    const users = [
      { user: 'John Doe', role: roles[0], status: 'active' },
      { user: 'Jane Smith', role: roles[1], status: 'active' },
      { user: 'User3', role: roles[2], status: 'active' },
      { user: 'User4', role: roles[3], status: 'active' },
      { user: 'User5', role: roles[4], status: 'locked' },
      { user: 'User6', role: roles[5], status: 'active' },
      { user: 'User7', role: roles[5], status: 'inactive' },
      { user: 'User8', role: roles[6], status: 'active' },
      { user: 'User9', role: roles[6], status: 'locked' },
    ];
  
    this.dataSource = new MatTableDataSource(users);
  }
  
  
  

  constructor(private dialog: MatDialog) {}
  ngOnInit(): void {
    this.tableData();
  }

  editUser(user: any) {
    // Create a copy of the original user data
    const originalUser = Object.assign({}, user);
  
    // Open the UserDialogComponent as a MatDialog with the selected user data
    const dialogRef = this.dialog.open(UserDialogComponent, {
      width: '400px',
      data: user
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // User clicked the "Save" button, apply the changes
        user.user = result.user;
        user.role = result.role;
        user.status = result.status;
      } else {
        // User closed the dialog or clicked the "Cancel" button, revert back to the original data
        user.user = originalUser.user;
        user.role = originalUser.role;
        user.status = originalUser.status;
      }
    });
  }
  
  

  deleteUser(user: any) {
    // Implement the logic to delete the user
    console.log('Deleting user:', user);
  }

  handleDeleteAction(values:any) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent,{
      data:{
        message: 'Are you sure want to delete this account?',
      }
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
