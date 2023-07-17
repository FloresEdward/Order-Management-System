import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { GlobalConstants } from '../shared/global-constants';

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {

  constructor(private snackBar: MatSnackBar) { }

  openSnackBar(message: string, action: string) {
    let panelClass = '';
    if (action === 'message') {
      panelClass = 'blue-snackbar';
    } else if (action === 'error') {
      panelClass = 'red-snackbar';
    } else {
      panelClass = 'green-snackbar';
    }

    console.log(panelClass);

    this.snackBar.open(message, '',{
      horizontalPosition: 'center',
      verticalPosition: 'top',
      duration: 2000,
      panelClass: [panelClass]
    });
  }
}
