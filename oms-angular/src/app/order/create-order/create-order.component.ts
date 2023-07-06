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
  dataSource: any = [
    { name: 'Product 1', category: 'Category 1', price: 100, quantity: 1, total: 100 },
    { name: 'Product 2', category: 'Category 2', price: 200, quantity: 2, total: 400 },
    { name: 'Product 3', category: 'Category 3', price: 300, quantity: 3, total: 900 }
  ];
  // manageOrderForm:any = FormGroup;
  categories: any = [
    {name: 'Dessert',},
    {name: 'Launch',},
    {name: 'Basta',},
  ]; //not final dapat nasa products kukunin
  products: any = [{name: 'Product 1'},{name: 'Product 2'},{name: 'Product 3'}];
  price: any = [
    {price: 100}, 
    {price: 200}, 
    {price: 300}
  ];
  totalAmount: number = 0;
  responseMessage: any;

  constructor(private formBuilder: FormBuilder) {

  }

  ngOnInit(): void {
    this.getCategories();
    // this.manageOrderForm = this.formBuilder.group({
    //   name:[null],
    //   email:[null],
    //   contactNumber:[null],
    //   paymentMethod:[null],
    //   product:[null],
    //   category:[null],
    //   quantity:[null],
    //   price:[null],
    //   total:[0]
    // })
  }

  update() {

  }

  getCategories(){

  }

  getFilteredCategories() {

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

}
