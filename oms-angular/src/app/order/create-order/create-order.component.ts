import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConfirmationDialogComponent } from './confirmation-dialog/confirmation-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { GlobalConstants } from 'src/app/shared/global-constants';
import { OrderService } from 'src/app/services/order.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CustomerService } from 'src/app/services/customer.service';

@Component({
  selector: 'app-order-status',
  templateUrl: './create-order.component.html',
  styleUrls: ['./create-order.component.scss']
})
export class CreateOrderComponent implements OnInit {

  cardTitle: string = 'Create Order';

  displayedColumns: string[] = ['name', 'category', 'price', 'quantity', 'total', 'edit'];
  dataSource: any = [];
  manageOrderForm: any = FormGroup;
  categories: any = [{ name: 'Dessert' }, { name: 'Drinks' }, { name: 'Rice Meals' }];
  products: any = [{
    "id": "menu1",
    "name": "Pizza",
    "price": 10.99
  },
  {
    "id": "menu2",
    "name": "Burger",
    "price": 8.99
  }];
  price: any;
  totalAmount: number = 0;
  responseMessage: any;
  // quantity: any = null;



  constructor(private formBuilder: FormBuilder,
    private dialog: MatDialog,
    private snackbarService: SnackbarService,
    private orderService: OrderService,
    private customerService: CustomerService,
    private router: Router,
    private httpClient: HttpClient,
    private route: ActivatedRoute) {
    this.manageOrderForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      contactNumber: ['', Validators.required],
      address: ['', Validators.required],
      paymentMethod: ['', Validators.required],
      price: [null],
      total: [''],
      quantity: ['']
    });

  }

  ngOnInit(): void {
    this.getCategories();
    
  }

  // calculateTotal() {
   
  //   const price = this.manageOrderForm.get('price')?.value;
  //   const quantity = this.manageOrderForm.get('quantity')?.value;
  //   var temp = this.manageOrderForm.controls['quantity'].value;
  //   console.log(`Quantity ${temp}`)
  //   if (price !== null && quantity !== null) {
  //     let total = price * quantity;
  //     this.manageOrderForm.get('total').setValue(total);
      
  //   } else {
  //     this.manageOrderForm.get('total').setValue(null);
  //   }

    
    
  // }
  


  update() {

  }

  getCategories() {

  }

  getFilteredCategories() {

  }

  getProductsByCategory(value: any) {

  }

  // getProductDetails(value: any) {
  //   if (value && value.price) {
  //     this.manageOrderForm.get('price').setValue(value.price);
  //     this.calculateTotal();
  //   }
  // }

  getProductDetails(value: any) {
    if (value && value.price) {
      this.manageOrderForm.get('price').setValue(value.price);
      // const quantity = this.manageOrderForm.get('quantity').value;
      // if (quantity !== null) { // Check if quantity is not null
      //   const total = value.price * quantity;
      //   this.manageOrderForm.get('total').setValue(total);
      // }
    }
  }
  
  setQuantity() {
    var temp = this.manageOrderForm.controls['quantity'].value;
    console.log('setQuantity() is called', temp)
    if (temp > 0) {
      this.manageOrderForm.controls['total'].setValue(this.manageOrderForm.controls['quantity'].value * this.manageOrderForm.controls['price'].value);
    } else if (temp != '') {
      this.manageOrderForm.controls['quantity'].setValue('1');
      this.manageOrderForm.controls['total'].setValue(this.manageOrderForm.controls['quantity'].value * this.manageOrderForm.controls['price'].value);
    }
  }

  validateProductAdd() {

  }

  validateSubmit() {

  }

  add() {
    console.log("added to the db")
    if (this.manageOrderForm.invalid) {
      return;
    }

    const customerDetails = this.manageOrderForm.value;

    this.customerService.addCustomer(customerDetails).subscribe(
      (response) => {
        console.log(response);
        const orderDetails = {
        };

        this.orderService.addOrder(orderDetails).subscribe(
          (response) => {
            console.log(response);
          },
          (error) => {
            console.log(error);
          }
        );
      },
      (error) => {
        console.log(error);
      }
    );
  }

  handleDeleteAction() {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: {
        message: 'Are you sure want to delete?',
      }
    });
  }

  submitAction() {

  }

}
