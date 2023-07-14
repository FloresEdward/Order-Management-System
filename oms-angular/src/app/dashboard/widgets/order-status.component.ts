import { Component, Input } from '@angular/core';

@Component({
  selector: 'widget-order-status',
  templateUrl: './order-status.component.html',
  styleUrls: ['./order-status.component.scss']
})
export class OrderStatusComponent {
  @Input() orderStatusByDay: any[] = [];

  cancel: number | undefined;
  fulfilled: number | undefined;
  pending: number | undefined;

  ngOnInit() {
    this.updateStatusCounts();
  }

  ngOnChanges() {
    this.updateStatusCounts();
  }

  updateStatusCounts() {
    const statusCounts = this.orderStatusByDay.reduce((counts, order) => {
      const status = order.status;
      counts[status] = (counts[status] || 0) + 1;
      return counts;
    }, {});

    this.cancel = statusCounts['cancelled'] || 0;
    this.fulfilled = statusCounts['fulfilled'] || 0;
    this.pending = statusCounts['pending'] || 0;
  }
}
