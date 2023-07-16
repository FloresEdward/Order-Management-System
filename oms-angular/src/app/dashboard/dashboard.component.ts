import { DatePipe, formatDate } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, Inject, OnInit, ViewChild } from '@angular/core';
import { OrderStatusComponent } from './widgets/order-status.component';
import { NoCancelRateComponent } from './widgets/no-cancel-rate.component';
import { CategoryPerformanceComponent } from './widgets/category-performance.component';
import { TopMealComponent } from './widgets/top-meal.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  selectedDate: Date;

  // WIDGET orderStatus
  orderStatusByDay: any[] = [];

  // WIDGET orderStatus
  orderCancelRate: any[] = [];

  // WIDGET orderStatus
  orderCategoryPerformance: any[] = [];

  // WIDGET orderStatus
  orderTopMeal: any[] = [];

  cardTitle = 'Dashboard';
  orderItems: any[] = [];

  @ViewChild('orderStatusComponent', { static: false }) orderStatusComponent: OrderStatusComponent | undefined;
  @ViewChild('noCancelRateComponent', { static: false }) noCancelRateComponent: NoCancelRateComponent | undefined;
  @ViewChild('categoryPerformanceComponent', { static: false }) categoryPerformanceComponent: CategoryPerformanceComponent | undefined;
  @ViewChild('topMealComponent', { static: false }) topMealComponent: TopMealComponent | undefined;


  constructor(private http: HttpClient, private cdr: ChangeDetectorRef) {
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

    const startYear = new Date(startDate.getFullYear(), 0, 1);
    this.orderCancelRate = this.filterOrdersByYear(this.orderItems, startYear);
    this.updateNoCancelRateComponent();

    const endMonth = new Date(startDate.getFullYear(), startDate.getMonth());
    this.orderCategoryPerformance = this.filterOrdersByMonth(this.orderItems, startDate, endMonth);
    // this.orderCategoryPerformance = this.filterOrdersByYear(this.orderItems, startYear);
    this.updateCategoryPerformanceComponent();

    this.orderTopMeal = this.filterOrdersByMonth(this.orderItems, startDate, endMonth);
    this.updateTopMealComponent();

  }

  filterOrdersByDate(orders: any[], startDate: Date, endDate: Date): any[] {
    return orders.filter((order) => {
      const createdAt = new Date(order.createdAt);
      return createdAt >= startDate && createdAt <= endDate;
    });
  }

  filterOrdersByYear(orders: any[], year: Date): any[] {
    const startYear = new Date(year.getFullYear(), 0, 1);
    const endYear = new Date(year.getFullYear(), 11, 31, 23, 59, 59, 999);

    return orders.filter((order) => {
      const createdAt = new Date(order.createdAt);
      return createdAt >= startYear && createdAt <= endYear;
    });
  }

  filterOrdersByMonth(orders: any[], year: Date, month: Date): any[] {
    const startDate = new Date(year.getFullYear(), month.getMonth(), 1);
    const endDate = new Date(year.getFullYear(), month.getMonth() + 1, 0, 23, 59, 59, 999);
  
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

  updateCategoryPerformanceComponent(): void {
    this.cdr.detectChanges();
  }

  updateTopMealComponent(): void {
    this.cdr.detectChanges();
  }

  dateFilter = (date: Date | null): boolean => {
    const currentDate = new Date();
    return !date || date <= currentDate;
  }

}
