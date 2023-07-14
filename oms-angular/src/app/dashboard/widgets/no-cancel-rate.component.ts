import { Component, Input, OnInit } from '@angular/core';
import { Chart } from 'angular-highcharts';

@Component({
  selector: 'widget-no-cancel-rate',
  template: '<div [chart]="chart"></div>',
})
export class NoCancelRateComponent implements OnInit {

  @Input() orderCancelRate: any[] = [];

  categoryMonth: string[] = [];
  fulfilledData: number[] = [];
  cancelledData: number[] = [];
  chart: Chart | undefined;

  ngOnInit() {
 
  }

  ngOnChanges() {
    this.updateNoCancelRateComponent();
  }

  createChart() {
    this.chart = new Chart({
      chart: {
        type: 'column',
      },
      accessibility: {
        enabled: false,
      },
      title: {
        text: 'No-Cancel Rate',
      },
      xAxis: {
        categories: this.categoryMonth
      },
      yAxis: {
        title: {
          text: 'Percentage',
        },
      },
      series: [
        {
          name: 'Fulfilled',
          type: 'column',
          data: [...this.getFulfilledDataForChart()],
          color: '#044342',
        },
        {
          name: 'Cancelled',
          type: 'column',
          data: [...this.getCancelledDataForChart()],
          color: '#7e0505',
        },
      ],
      credits: {
        enabled: false,
      },
    });
  }

  getFulfilledDataForChart(): number[] {
    const fulfilledDataForChart: number[] = [];
    for (const month of this.categoryMonth) {
      const monthIndex = this.monthIndexMap[month];
      fulfilledDataForChart.push(this.fulfilledData[monthIndex]);
    }
    return fulfilledDataForChart;
  }

  getCancelledDataForChart(): number[] {
    const cancelledDataForChart: number[] = [];
    for (const month of this.categoryMonth) {
      const monthIndex = this.monthIndexMap[month];
      cancelledDataForChart.push(this.cancelledData[monthIndex]);
    }
    return cancelledDataForChart;
  }

  updateNoCancelRateComponent() {
    this.categoryMonth = this.getCategoryMonth();
    this.calculateData();
    this.createChart();
  }

  getCategoryMonth(): string[] {
    const monthsSet = new Set<string>();
    this.orderCancelRate.forEach((order) => {
      const createdAtDate = new Date(order.createdAt);
      const month = createdAtDate.toLocaleString('default', { month: 'short' });
      monthsSet.add(month);
    });
    const monthsArray = Array.from(monthsSet);
    monthsArray.sort((a, b) => this.monthIndexMap[a] - this.monthIndexMap[b]);
    return monthsArray;
  }

  monthIndexMap: { [key: string]: number } = {
    "Jan": 0,
    "Feb": 1,
    "Mar": 2,
    "Apr": 3,
    "May": 4,
    "Jun": 5,
    "Jul": 6,
    "Aug": 7,
    "Sep": 8,
    "Oct": 9,
    "Nov": 10,
    "Dec": 11,
  };

  calculateData() {
    this.fulfilledData = Array(12).fill(0); 
    this.cancelledData = Array(12).fill(0);

    this.orderCancelRate.forEach((order) => {
      const createdAtDate = new Date(order.createdAt);
      const month = createdAtDate.getMonth(); // Get the month index (0-11)

      if (order.status === 'fulfilled') {
        this.fulfilledData[month]++;
      } else if (order.status === 'cancelled') {
        this.cancelledData[month]++;
      }
    });
    console.log(this.fulfilledData);
    console.log(this.cancelledData);
  }

}
