import { Component } from '@angular/core';
import { Chart } from 'angular-highcharts';

@Component({
  selector: 'widget-top-meal',
  template: '<div [chart]="chart"></div>'
})
export class TopMealComponent {

  data = [
    {
    name: 'PM1',
    y: 969,
    color: '#044342',
  },
  {
    name: 'PM2',
    y: 891,
    color: '#7e0505',
  },
  {
    name: 'PM3',
    y: 670,
    color: '#ed9e20',
  },
  {
    name: 'PM4',
    y: 572,
    color: '#6920fb',
  },
  {
    name: 'PM5',
    y: 245,
    color: '#121212',
  }];

  chart = new Chart({
    chart: {
      type: 'pie',
      height: 250,
    },
    accessibility: {
      enabled: false
    },
    title: {
      text: 'Top Meal Ordered'
    },
    plotOptions: {
      pie: {
        showInLegend: true,
      }
    },
    legend: {
      align: 'right',
      verticalAlign: 'middle',
      layout: 'vertical'
    },
    series: [
     {
      type: 'pie',
      data: this.data
     }
    ],
    credits: {
      enabled: false
    }
  })

  

}
