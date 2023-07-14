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
import { MatTableDataSource } from '@angular/material/table';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-order-status',
  templateUrl: './create-order.component.html',
  styleUrls: ['./create-order.component.scss']
})
export class CreateOrderComponent implements OnInit {

  cardTitle: string = 'Create Order';
  displayedColumns: string[] = ['category', 'product', 'price', 'quantity', 'total', 'edit'];
  categories: any[] = [];
  products: any[] = [];
  dataSource: MatTableDataSource<any>;

  productOrderForm: any = FormGroup;
  customerOrderForm: any = FormGroup;
  
  price: any;
  totalAmount: number = 0;
  responseMessage: any;
  hasTableData: boolean = false; 

  constructor(private formBuilder: FormBuilder,
    private dialog: MatDialog,
    private snackbarService: SnackbarService,
    private orderService: OrderService,
    private customerService: CustomerService,
    private router: Router,
    private http: HttpClient,
    private route: ActivatedRoute) {
      this.productOrderForm = this.formBuilder.group({
        category: ['', Validators.required],
        product: ['', Validators.required],
        price: [null],
        total: [''],
        quantity: [0, [Validators.required, Validators.min(1)]]
      });

    this.customerOrderForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      contactNumber: ['', Validators.required],
      address: ['', Validators.required],
      paymentMethod: ['', Validators.required],
    });

    this.dataSource = new MatTableDataSource<any>();

  }

  ngOnInit(): void {
    this.getCategories();
  }

  getCategories(): void {
    const baseUrl = 'http://localhost:8080/api/v1/management/category';
    this.http.get<any[]>(baseUrl + '/').subscribe(
      (response) => {
        this.categories = response;
      },
      (error) => {
        console.log('Error:', error);
      }
    );
  }

  calculateTotal() {
    const price = this.productOrderForm.get('price').value;
    let quantity = this.productOrderForm.get('quantity').value;
    console.log(`price: ${price} quantity: ${quantity}`);
    if(quantity < 1) {
      quantity = 1;
    }
    const total = price * quantity;
    this.productOrderForm.get('total').setValue(total);
  }

  isFormValid(): boolean {
    return this.customerOrderForm.valid && this.productOrderForm.valid;
  }

  getProductsByCategory(category: any) {
    const baseUrl = 'http://localhost:8080/api/v1/management/menu/category';
    console.log(category)
    this.http.get<any[]>(`${baseUrl}/${category.id}`).subscribe(
      (response) => {
        this.products = response;
        console.log(response)
      },
      (error) => {
        console.log('Error:', error);
      }
    );
  }

  getProductDetails(value: any) {
    if (value && value.price) {
      this.productOrderForm.get('price').setValue(value.price);
    }
  }

  add() {
    const category = this.productOrderForm.get('category').value;
    const product = this.productOrderForm.get('product').value;
    const price = this.productOrderForm.get('price').value;
    const quantity = this.productOrderForm.get('quantity').value;
    const total = this.productOrderForm.get('total').value;

    const element = {
      category: category,
      product: product,
      price: price,
      quantity: quantity,
      total: total
    };

    this.dataSource.data.push(element);
    this.dataSource._updateChangeSubscription();
    this.updateTableDataStatus();
    this.productOrderForm.reset();
    this.snackbarService.openSnackBar(GlobalConstants.productAdded, 'success');
  }

  handleDeleteAction(index: number) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: {
        message: 'Are you sure you want to delete?',
      },
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.dataSource.data.splice(index, 1);
        this.dataSource._updateChangeSubscription();
  
        this.dataSource = new MatTableDataSource<any>(this.dataSource.data);
        this.snackbarService.openSnackBar(GlobalConstants.delete, 'success');
        console.log(`Row Deleted`);
      }
    });
  }
  
  submitAction() {
    
    const orderedItems = this.dataSource.data.map((item: any) => ({
      category: item.category.name,
      product: item.product.name,
      price: item.price,
      quantity: parseInt(item.quantity),
      total: item.total
    }));

    const customerDetails = {
      name: this.customerOrderForm.get('name').value,
      email: this.customerOrderForm.get('email').value,
      contactNumber: this.customerOrderForm.get('contactNumber').value,
      address: this.customerOrderForm.get('address').value,
      paymentMethod: this.customerOrderForm.get('paymentMethod').value,
    }

    const orderDetails = {
      orderedItems: orderedItems, 
      customer: customerDetails, 
      courierName: 'none',
      status: 'pending',
      addressId: customerDetails.address,
      createdAt: new Date(),
      totalQuantity: orderedItems.reduce((totalQuantity, item) => totalQuantity + item.quantity, 0),
      grandTotal: orderedItems.reduce((total, item) => total + item.total, 0)
    }

    console.log('orderDetails: ', orderDetails);
  
    const addOrderRequest = this.orderService.addOrder(orderDetails);
    const addCustomerRequest = this.customerService.addCustomer(customerDetails);

    forkJoin([addOrderRequest, addCustomerRequest]).subscribe(
      ([orderResponse, customerResponse]) => {
        this.snackbarService.openSnackBar(GlobalConstants.orderAdded, 'success');
        this.dataSource.data = [];
        this.customerOrderForm.reset();
        this.updateTableDataStatus();
      },
      (error) => {
        this.snackbarService.openSnackBar(GlobalConstants.genericError, 'error');
        console.log('Error', error);
      }
    )
  }

  updateTableDataStatus() {
    this.hasTableData = this.dataSource.data.length > 0;
  }
  
}
