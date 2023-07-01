import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../shared/material-module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RouterModule } from '@angular/router';
import { OrderStatusComponent } from './order-status.component';
import { OrderStatusRoutes } from './order-status.routing';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    FlexLayoutModule,
    RouterModule.forChild(OrderStatusRoutes)
  ],
  declarations: [OrderStatusComponent],
})
export class OrderStatusModule { }
