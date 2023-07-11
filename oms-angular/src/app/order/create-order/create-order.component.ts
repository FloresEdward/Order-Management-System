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

  displayedColumns: string[] = ['category', 'product', 'price', 'quantity', 'total', 'edit'];
  dataSource: any = [];
  productOrderForm: any = FormGroup;
  customerOrderForm: any = FormGroup;
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
      this.productOrderForm = this.formBuilder.group({
        category: ['', Validators.required],
        product: ['', Validators.required],
        price: [null, Validators.required],
        total: [''],
        quantity: [0, [Validators.required, Validators.min(1)], Validators.pattern(GlobalConstants.quantityError)]
      });

    this.customerOrderForm = this.formBuilder.group({
      name: [''],
      email: [''],
      contactNumber: [''],
      address: [''],
      paymentMethod: [''],
    })

  }

  ngOnInit(): void {
    this.getCategories();
  }

  calculateTotal() {
    const price = this.productOrderForm.get('price').value;
    console.log(price);
    let quantity = this.productOrderForm.get('quantity').value;
    console.log(quantity);
    if(quantity < 1) {
      quantity = 1;
    }
    const total = price * quantity;
    this.productOrderForm.get('total').setValue(total);
  }

  update() {

  }

  getCategories() {

  }

  getFilteredCategories() {

  }

  getProductsByCategory(value: any) {

  }


  getProductDetails(value: any) {
    if (value && value.price) {
      this.productOrderForm.get('price').setValue(value.price);

    }
  }


  validateProductAdd() {

  }

  validateSubmit() {

  }

  add() {
    console.log("added to the db")
    if (this.productOrderForm.invalid) {
      return;
    }

    const customerDetails = this.productOrderForm.value;

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
