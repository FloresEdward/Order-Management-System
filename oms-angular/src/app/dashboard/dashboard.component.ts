import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

interface Order {
  updateDate: string;
  quantity: number;
}

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

  orderItems: Order[] = [];

  constructor(private datePipe: DatePipe, private http: HttpClient) {
    this.selectedDate = new Date();
  }

  ngOnInit(): void {
    this.getAllOrder();
  }

  getAllOrder(): void {
    this.http.get<Order[]>("http://localhost:8080/api/v1/management/order/getAll")
      .subscribe((resultData: Order[]) => {
        this.orderItems = resultData;
      });
  }

  dateFilter = (date: Date | null): boolean => {
    const currentDate = new Date();
    return !date || date <= currentDate;
  }

}
