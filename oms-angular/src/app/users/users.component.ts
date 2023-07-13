import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UserDialogComponent } from './user-dialog/user-dialog.component';
import { MatTableDataSource } from '@angular/material/table';
import { ConfirmationDialogComponent } from '../order/manage-order/confirmation-dialog/confirmation-dialog.component';
import { HttpClient } from '@angular/common/http';
import { InfoDialogComponent } from './user-dialog/info-dialog.component';
import { SnackbarService } from '../services/snackbar.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  cardTitle: string = 'Manage Accounts';
  dataSource!: MatTableDataSource<any>;

  userArray: any[] = [];

  roles = [
    { role: 'ADMIN', description: ['Category Management', 'Menu Management', 'Order Management', 'Category Management', 'Account Management'] },
    { role: 'CATEGORY', description: ['Category Management', 'Menu (Read)', 'Order (Create)'] },
    { role: 'MENU', description: ['Menu Management', 'Category (Read)', 'Order (Create)'] },
    { role: 'ORDER', description: ['Order Management', 'Category (Read)', 'Menu (Read)', 'Account (Read)'] },
    { role: 'ACCOUNT', description: ['Account Management'] },
    { role: 'TELLER', description: ['Category (Read)', 'Menu (Read)', 'Order (Read)', 'Order (Create)'] },
    { role: 'RIDER', description: ['Order (Read)', 'Order (Update)'] },
  ];

  constructor(private dialog: MatDialog, private http: HttpClient, private snackbarService: SnackbarService,) { }

  ngOnInit(): void {
    this.getAllUser();
  }

  getAllUser() {
    this.http.get("http://localhost:8080/api/v1/management/user/getAll")
      .subscribe((resultData: any) => {
        this.userArray = resultData;
        this.tableData();
      });
  }

  tableData() {
    this.dataSource = new MatTableDataSource(this.userArray);
  }


  editUser(user: any) {
    const originalUser = Object.assign({}, user);

    const dialogRef = this.dialog.open(UserDialogComponent, {
      width: '275px',
      data: user
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        let bodyData = {
          "_id": user.id,
          "firstname": user.firstname,
          "lastname": user.lastname,
          "email": user.email,
          "password": user.password,
          "status": user.status,
          "role": user.role
        };

        this.http.put(`http://localhost:8080/api/v1/management/user/edit/${user.id}`, bodyData, result)
          .subscribe((updatedUser: any) => {
            user.status = updatedUser.status;
            user.role = updatedUser.role;
            this.snackbarService.openSnackBar(`${user.email} updated Successfully`, 'success');
          },
            (error) => {
              this.snackbarService.openSnackBar("You have no authority to update", 'error');
              user.status = originalUser.status;
              user.role = originalUser.role;
            });
      } else {
        user.status = originalUser.status;
        user.role = originalUser.role;
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
        this.http.delete(`http://localhost:8080/api/v1/management/user/delete/${user.id}`)
          .subscribe(() => {
            const index = this.userArray.findIndex(u => u.id === user.id);
            if (index !== -1) {
              this.userArray.splice(index, 1);
              this.tableData();
              this.snackbarService.openSnackBar(`${user.email} deleted Successfully`, 'success');
            }
          },
            (error) => {
              this.snackbarService.openSnackBar("You have no authority to delete", 'error');
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