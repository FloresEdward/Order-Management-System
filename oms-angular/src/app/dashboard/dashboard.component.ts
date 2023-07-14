import { DatePipe, formatDate } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, Inject, OnInit, ViewChild } from '@angular/core';
import { OrderStatusComponent } from './widgets/order-status.component';
import { NoCancelRateComponent } from './widgets/no-cancel-rate.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  providers: [DatePipe]
})
export class DashboardComponent implements OnInit {
  selectedDate: Date;

  // WIDGET orderStatus
  orderStatusByDay: any[] = [];

  // WIDGET orderStatus
  orderCancelRate: any[] = [];

  // WIDGET orderStatus
  // orderStatusByDay: any[] = [];

  // WIDGET orderStatus
  // orderStatusByDay: any[] = [];

  cardTitle = 'Dashboard';
  orderItems: any[] = [];

  @ViewChild('orderStatusComponent', { static: false }) orderStatusComponent: OrderStatusComponent | undefined;
  @ViewChild('noCancelRateComponent', { static: false }) noCancelRateComponent: NoCancelRateComponent | undefined;


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

    this.updateOrderStatusComponent();

    const cancelStartDate = new Date(endDate.getFullYear(), endDate.getMonth() - 5, endDate.getDate());
    this.orderCancelRate = this.orderItems;
    this.updateNoCancelRateComponent();

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

  updateNoCancelRateComponent(): void {
    this.cdr.detectChanges();
  }

  dateFilter = (date: Date | null): boolean => {
    const currentDate = new Date();
    return !date || date <= currentDate;
  }

}
