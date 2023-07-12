import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { UserDialogComponent } from './user-dialog/user-dialog.component';
import { MatTableDataSource } from '@angular/material/table';
import { ConfirmationDialogComponent } from '../order/manage-order/confirmation-dialog/confirmation-dialog.component';
import { HttpClient } from '@angular/common/http';
import { InfoDialogComponent } from './user-dialog/info-dialog.component';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit{

  cardTitle: string = 'Manage Accounts';
  dataSource!: MatTableDataSource<any>;

  userArray: any[] = [];

  roles = [
    { role: 'ADMIN', description: ['Category Management', 'Menu Management', 'Order Management', 'Category Management', 'Account Management'] },
    { role: 'CATEGORY', description: ['Category Management', 'Menu (Read)', 'Order (Create)'] },
    { role: 'MENU', description: ['Menu Management', 'Category (Read)', 'Order (Create)'] },
    { role: 'ORDER', description: ['Order Management', 'Category (Read)', 'Menu (Read)'] },
    { role: 'ACCOUNT', description: ['Account Management'] },
    { role: 'TELLER', description: ['Category (Read)', 'Menu (Read)', 'Order (Read)', 'Order (Create)' ] },
    { role: 'RIDER', description: ['Order (Read)', 'Order (Update)' ] },
  ];

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
      width: '275px',
      data: user
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.http.put("http://localhost:8080/api/v1/management/user/update", result)
          .subscribe((updatedUser: any) => {
            // Update the user in the frontend
            user.firstname = updatedUser.firstname;
            user.lastname = updatedUser.lastname;
            user.email = updatedUser.email;
            // Update any other properties as needed
          });
      } else {
        // User closed the dialog or clicked the "Cancel" button, revert back to the original data
        user.firstname = originalUser.firstname;
        user.lastname = originalUser.lastname;
        user.email = originalUser.email;
        // Revert any other properties as needed
      }
    });
  }

  deleteUser(user: any) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: {
        message: 'Are you sure you want to delete this account?',
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Send an HTTP request to delete the user on the backend
        this.http.delete(`http://localhost:8080/api/v1/management/user/delete/${user.id}`)
          .subscribe(() => {
            // Remove the user from the userArray in the frontend
            const index = this.userArray.findIndex(u => u.id === user.id);
            if (index !== -1) {
              this.userArray.splice(index, 1);
              this.tableData();
            }
          });
      }
    });
  }

  openInfoDialog(role: string) {
    const selectedRole = this.roles.find(r => r.role === role);
    if (selectedRole) {
      const dialogRef = this.dialog.open(InfoDialogComponent, {
        width: '400px',
        data: selectedRole
      });
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
