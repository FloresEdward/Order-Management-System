import { DatePipe, formatDate } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, Inject, OnInit, ViewChild } from '@angular/core';
import { OrderStatusComponent } from './widgets/order-status.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  providers: [DatePipe]
})
export class DashboardComponent implements OnInit {
  selectedDate: Date;
  filteredData: any[] = [];

  // WIDGET orderStatus
  orderStatusByDay: any[] = [];

  cardTitle = 'Dashboard';
  orderItems: any[] = [];

  @ViewChild('orderStatusComponent', { static: false }) orderStatusComponent: OrderStatusComponent | undefined;


  constructor(private datePipe: DatePipe, private http: HttpClient, private cdr: ChangeDetectorRef) {
    this.selectedDate = new Date();
  }

  ngOnInit(): void {
    this.getAllOrder();
  }

  getAllOrder(): void {
    this.http.get<any[]>("http://localhost:8080/api/v1/management/order/getAll")
      .subscribe((resultData: any[]) => {
        this.orderItems = resultData;
        this.onDateSelected();
      });
  }

  onDateSelected(): void {
    const formattedDate = formatDate(this.selectedDate, 'yyyy-MM-dd', 'en-US');
    const startDate = new Date(formattedDate + 'T00:00:00.000+00:00');
    const endDate = new Date(formattedDate + 'T23:59:59.999+00:00');

    this.orderStatusByDay = this.filterOrdersByDate(this.orderItems, startDate, endDate);

    // Update filteredData for other components if needed
    this.filteredData = this.orderStatusByDay;

    // Call a function to update the order status component
    this.updateOrderStatusComponent();

  }

  filterOrdersByDate(orders: any[], startDate: Date, endDate: Date): any[] {
    return orders.filter((order) => {
      const createdAt = new Date(order.createdAt);
      return createdAt >= startDate && createdAt <= endDate;
    });
  }

  updateOrderStatusComponent(): void {
    this.cdr.detectChanges();
  }

  dateFilter = (date: Date | null): boolean => {
    const currentDate = new Date();
    return !date || date <= currentDate;
  }

}
