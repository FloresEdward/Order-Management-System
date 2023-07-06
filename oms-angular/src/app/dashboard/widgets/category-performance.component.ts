import { Component } from '@angular/core';
import { Chart } from 'angular-highcharts';

@Component({
  selector: 'widget-category-performance',
  template: '<div [chart]="chart"></div>'
})
export class CategoryPerformanceComponent {
  data = {
    
  };

  chart = new Chart({
    chart: {
      type: 'bar',
    },
    title: {
      text: 'Category Performance'
    },
    xAxis: {
      categories: [
        'Dessert', 
        'Solo Meal', 
        'Family Package', 
        'Super Savers', 
        'Mix n Match', 
      ]
    },
    yAxis: {
      title: {
        text: 'Percentage'
      }
    },
    series: [
      {
        name: 'June',
        type: 'bar',
        data: [
          {
            y: 50,
            color: '#044342' //  Category 1
          },
          {
            y: 70,
            color: '#7e0505' //  Category 2
          },
          {
            y: 40,
            color: '#ed9e20' //  Category 3
          },
          {
            y: 60,
            color: '#6920fb' //  Category 4
          },
          {
            y: 37,
            color: '#121212' //  Category 5
          }
        ]
      }
    ],
    credits: {
      enabled: false
    }
  });
}
