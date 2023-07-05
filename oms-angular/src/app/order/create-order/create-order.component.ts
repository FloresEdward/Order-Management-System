import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-order-status',
  templateUrl: './create-order.component.html',
  styleUrls: ['./create-order.component.scss']
})
export class CreateOrderComponent implements OnInit{
  // standard = 'standard';
  cardTitle: string = 'Create Order'; //title for card

  displayedColumns: string[] = ['name', 'category', 'price', 'quantity', 'total', 'edit'];
  dataSource: any = [];
  manageOrderForm:any = FormGroup;
  categorys: any = [
    {name: 'Dessert',},
    {name: 'Launch',},
    {name: 'Basta',},
  ]; //not final dapat nasa products kukunin
  products: any = [{name: 'Product 1'},{name: 'Product 2'},{name: 'Product 3'}];
  price: any = [];
  totalAmount: number = 0;
  responseMessage: any;

  constructor(private formBuilder: FormBuilder) {

  }

  ngOnInit(): void {
    this.manageOrderForm = this.formBuilder.group({
      name:[null],
      email:[null],
      contactNumber:[null],
      paymentMethod:[null],
      product:[null],
      category:[null],
      quantity:[null],
      price:[null],
      total:[0]
    })
  }

  update() {

  }

  getCategorys(){

  }

  getFilteredCategorys() {

  }

  getProductsByCategory(value: any) {

  }

  getProductDetails(value: any) {

  }

  setQuantity() {

  }

  validateProductAdd() {

  }

  validateSubmit() {

  }

  add() {

  }

  handleDeleteAction() {

  }

  submitAction() {

  }

  downloadFile() {

  }
}
