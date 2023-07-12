import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-manage-order-products',
  templateUrl: './manage-order-products.component.html',
  styleUrls: ['./manage-order-products.component.scss']
})
export class ManageOrderProductsComponent implements OnInit {

  displayedColumns: string[] = ['category', 'product', 'price', 'quantity', 'total'];
  dataSource: any;
  data: any;

  constructor(@Inject(MAT_DIALOG_DATA) public dialogData:any, 
  public dialogRef: MatDialogRef<ManageOrderProductsComponent>) { }

  ngOnInit() {
    this.data = this.dialogData.data;
    this.dataSource = this.dialogData.data.productDetail;
    console.log(this.dialogData.data);
  }
}

