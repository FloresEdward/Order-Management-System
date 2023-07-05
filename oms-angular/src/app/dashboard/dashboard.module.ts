import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { DashboardComponent } from './dashboard.component';
import { DashboardRoutes } from './dashboard.routing';
import { MaterialModule } from '../shared/material-module';
import { SharedModule } from '../shared/shared.module';
import { TopMealComponent } from './top-meal/top-meal.component';
import { OrderStatusComponent } from './order-status/order-status.component';
import { NoCancelRateComponent } from './no-cancel-rate/no-cancel-rate.component';
import { CategoryPerformanceComponent } from './category-performance/category-performance.component';
import { FormsModule } from '@angular/forms';
import { ChartModule } from 'angular-highcharts';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    FlexLayoutModule,
    RouterModule.forChild(DashboardRoutes),
    SharedModule, //newly added,
    ChartModule
  ],
  declarations: [DashboardComponent, TopMealComponent, OrderStatusComponent, NoCancelRateComponent, CategoryPerformanceComponent]
})
export class DashboardModule { }
