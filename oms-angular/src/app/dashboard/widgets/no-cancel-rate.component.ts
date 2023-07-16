import { Component, Input, OnInit, OnChanges } from '@angular/core';
import { Chart } from 'angular-highcharts';

@Component({
  selector: 'widget-no-cancel-rate',
  template: '<div [chart]="chart"></div>',
})
export class NoCancelRateComponent implements  OnChanges {
  @Input() orderCancelRate: any[] = [];

  categoryMonth: string[] = [];
  fulfilledData: number[] = [];
  cancelledData: number[] = [];
  chart: Chart | undefined;

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
        text: 'Order Status',
      },
      xAxis: {
        categories: this.categoryMonth
      },
      yAxis: {
        title: {
          text: 'No. of Orders',
        },
      },
      series: [
        {
          name: 'Fulfilled',
          type: 'column',
          data: this.getFulfilledDataForChart(),
          color: '#044342',
        },
        {
          name: 'Cancelled',
          type: 'column',
          data: this.getCancelledDataForChart(),
          color: '#7e0505',
        },
      ],
      credits: {
        enabled: false,
      },
    });
  }

  getFulfilledDataForChart(): number[] {
    return this.categoryMonth.map(month => this.fulfilledData[this.monthIndexMap[month]]);
  }

  getCancelledDataForChart(): number[] {
    return this.categoryMonth.map(month => this.cancelledData[this.monthIndexMap[month]]);
  }

  updateNoCancelRateComponent() {
    this.categoryMonth = this.getCategoryMonth();
    this.calculateData();
    this.createChart();
  }

  getCategoryMonth(): string[] {
    const monthsSet = new Set<string>();
    for (const order of this.orderCancelRate) {
      const createdAtDate = new Date(order.createdAt);
      const month = createdAtDate.toLocaleString('default', { month: 'short' });
      monthsSet.add(month);
    }
    return Array.from(monthsSet).sort((a, b) => this.monthIndexMap[a] - this.monthIndexMap[b]);
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

    for (const order of this.orderCancelRate) {
      const createdAtDate = new Date(order.createdAt);
      const month = createdAtDate.getMonth();

      if (order.status === 'fulfilled') {
        this.fulfilledData[month]++;
      } else if (order.status === 'cancelled') {
        this.cancelledData[month]++;
      }
    }
  }
}
