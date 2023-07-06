import { Component, OnInit } from '@angular/core';
import { Chart } from 'angular-highcharts';

@Component({
  selector: 'widget-no-cancel-rate',
  template: '<div [chart]="chart"></div>',
})
export class NoCancelRateComponent implements OnInit {

  data = {
    
  };

  chart = new Chart({
    chart: {
      type: 'column',
    },
    title: {
      text: 'No-Cancel Rate'
    },
    xAxis: {
    categories: [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun'
      ]
    },
    yAxis: {
      title: {
        text: 'Percentage'
      }
    },
    series: [
      {
        name: "Fulfilled",
        type: "column",
        data: [85, 69, 95, 73, 82, 83],
        color: '#044342'
      },
      {
        name: 'Ongoing ? ? ?',
        type: 'column',
        data: [0, 0, 0, 0, 0, 12],
        color: '#ed9e20'
      },
      {
        name: 'Cancelled',
        type: 'column',
        data: [15, 31, 5, 27, 18, 5],
        color: '#7e0505'
      },
    ],
    credits: {
      enabled: false
    }
    
    
  })

  ngOnInit() {
    
  }

 
}
