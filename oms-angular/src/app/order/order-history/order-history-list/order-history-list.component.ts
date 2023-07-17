import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ManageOrderProductsComponent } from '../../manage-order/manage-order-products/manage-order-products.component';

@Component({
  selector: 'app-order-history-list',
  templateUrl: './order-history-list.component.html',
  styleUrls: ['./order-history-list.component.scss']
})
export class OrderHistoryListComponent implements OnInit{
  displayedColumns: string[] = ['category', 'product', 'price', 'quantity',  'total'];
  dataSource: any;
  data: any;

  constructor(@Inject(MAT_DIALOG_DATA) public dialogData:any, 
  public dialogRef: MatDialogRef<ManageOrderProductsComponent>) { }

  ngOnInit() {
    this.data = this.dialogData?.data;
    if (this.data && this.data.orderedItems) {
      this.dataSource = this.data.orderedItems.map((item: any) => {
        return {
          category: item.category,
          product: item.product,
          price: item.price,
          quantity: item.quantity,
          total: item.total
        };
      });
    } else {
      this.dataSource = [];
    } 
  }
}
