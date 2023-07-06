import { Component } from '@angular/core';
import { Chart } from 'angular-highcharts';

@Component({
  selector: 'widget-order-status',
  template: '<div></div>',
})
export class OrderStatusComponent {

  chart = new Chart({
    
  });
}
