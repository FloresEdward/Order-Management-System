import { DatePipe } from '@angular/common';
import { Component, AfterViewInit } from '@angular/core';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  providers: [DatePipe]
})
export class DashboardComponent implements AfterViewInit {
  ngAfterViewInit() { }

  selectedDate: Date;

  constructor(private datePipe: DatePipe) {
    this.selectedDate = new Date();
  }

  cardTitle: string = 'Dashboard'; 

  dateFilter = (date: Date | null): boolean => {
    const currentDate = new Date();
    // Disable future dates
    return !date || date <= currentDate;
  }

}
