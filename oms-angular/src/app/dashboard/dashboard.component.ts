import { DatePipe, formatDate } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  providers: [DatePipe]
})
export class DashboardComponent implements OnInit {
  selectedDate: Date;
  filteredData: any[] = [];
  cardTitle = 'Dashboard';

  orderItems: any[] = [];

  constructor(private datePipe: DatePipe, private http: HttpClient) {
    this.selectedDate = new Date();
  }

  ngOnInit(): void {
    this.getAllOrder();
  }

  getAllOrder(): void {
    this.http.get<any[]>("http://localhost:8080/api/v1/management/order/getAll")
      .subscribe((resultData: any[]) => {
        this.orderItems = resultData;
      });
      
      
  }
  
  onDateSelected(): void {
    const formattedDate = formatDate(this.selectedDate, 'yyyy-MM-dd', 'en-US');
    const startDate = new Date(formattedDate + 'T00:00:00.000+00:00');
    const endDate = new Date(formattedDate + 'T23:59:59.999+00:00');

    const filteredOrders = this.filterOrdersByDate(this.orderItems, startDate, endDate);
    console.log(filteredOrders);
    
  }
  
  filterOrdersByDate(orders: any[], startDate: Date, endDate: Date): any[] {
    return orders.filter((order) => {
      const createdAt = new Date(order.createdAt);
      return createdAt >= startDate && createdAt <= endDate;
    });
  }
  
  
  dateFilter = (date: Date | null): boolean => {
    const currentDate = new Date();
    return !date || date <= currentDate;
  }

}
