import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-manage-order-products',
  templateUrl: './manage-order-products.component.html',
  styleUrls: ['./manage-order-products.component.scss']
})
export class ManageOrderProductsComponent implements OnInit {

  displayedColumns: string[] = ['name', 'category', 'price', 'quantity', 'total'];
  dataSource: any;
  data: any;

  constructor(@Inject(MAT_DIALOG_DATA) public dialogData:any, public dialogRef: MatDialogRef<ManageOrderProductsComponent>) { }

  ngOnInit() {
  }
}

