import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { DashboardComponent } from './dashboard.component';
import { DashboardRoutes } from './dashboard.routing';
import { MaterialModule } from '../shared/material-module';
import { SharedModule } from '../shared/shared.module';
import { TopMealComponent } from './widgets/top-meal.component';
import { OrderStatusComponent } from './widgets/order-status.component';
import { NoCancelRateComponent } from './widgets/no-cancel-rate.component';
import { CategoryPerformanceComponent } from './widgets/category-performance.component';
import { FormsModule } from '@angular/forms';
import { ChartModule } from 'angular-highcharts';
import { CategoryYearComponent } from './widgets/category-yearly.component';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    FlexLayoutModule,
    RouterModule.forChild(DashboardRoutes),
    SharedModule, //newly added,
    ChartModule,
    FormsModule
  ],
  declarations: [DashboardComponent, TopMealComponent, OrderStatusComponent, NoCancelRateComponent, CategoryPerformanceComponent, CategoryYearComponent]
})
export class DashboardModule { }
