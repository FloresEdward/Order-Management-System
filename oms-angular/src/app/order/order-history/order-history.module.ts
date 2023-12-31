import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/shared/material-module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RouterModule } from '@angular/router';
import { OrderHistoryRoutes } from './order-history.routing';
import { SharedModule } from 'src/app/shared/shared.module';
import { OrderHistoryComponent } from './order-history.component';
import { OrderHistoryListComponent } from './order-history-list/order-history-list.component';



@NgModule({
  declarations: [OrderHistoryComponent, OrderHistoryListComponent],
  imports: [
    CommonModule,
    MaterialModule,
    FlexLayoutModule,
    RouterModule.forChild(OrderHistoryRoutes),
    SharedModule
  ]
})
export class OrderHistoryModule { }
