import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { UserDialogComponent } from './user-dialog/user-dialog.component';
import { MatTableDataSource } from '@angular/material/table';
import { ConfirmationDialogComponent } from '../order/manage-order/confirmation-dialog/confirmation-dialog.component';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit{

  cardTitle: string = 'Manage Accounts';
  dataSource!: MatTableDataSource<any>;

  userArray: any[] = [];

  constructor(private dialog: MatDialog, private http: HttpClient) {
    this.getAllUser();
  }

  getAllUser() {
    this.http.get("http://localhost:8080/api/v1/management/user/getAll")
    .subscribe((resultData: any) => {
      console.log(resultData);
      this.userArray = resultData;
      this.tableData();
    });
  }

  tableData() {
    const roles = [
      { role: 'ADMIN', description: 'All Access' },
      { role: 'CATEGORY', description: 'Access to Category Module, and create order' },
      { role: 'MENU', description: 'Access to Menu Module, and create order' },
      { role: 'ORDER', description: 'Access to Order Module, view order archive, create and update' },
      { role: 'ACCOUNT', description: 'Access to User Management' },
      { role: 'TELLER', description: 'Create order only' },
      { role: 'RIDER', description: 'Update order status only' },
    ];
  
    this.dataSource = new MatTableDataSource(this.userArray);
  }
  
  
  

  
  
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
