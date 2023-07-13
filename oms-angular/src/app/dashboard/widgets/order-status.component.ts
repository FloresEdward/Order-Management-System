import { Component } from '@angular/core';
import { Chart } from 'angular-highcharts';

@Component({
  selector: 'widget-order-status',
  templateUrl: './order-status.component.html',
  styleUrls: ['./order-status.component.scss']
})
export class OrderStatusComponent {

  chart = new Chart({
    accessibility: {
      enabled: false
    },
  });
}
