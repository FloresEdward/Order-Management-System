import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-info-dialog',
  template: `<h2 mat-dialog-title>{{ data.role }}</h2>
  <div mat-dialog-content>
    <ul>
      <li *ngFor="let description of data.description">{{ description }}</li>
    </ul>
  </div>
  <div mat-dialog-actions align="end">
    <button mat-button mat-dialog-close>Close</button>
  </div>
  `
})
export class InfoDialogComponent {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { }

}
