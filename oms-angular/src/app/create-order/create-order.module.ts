import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../shared/material-module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RouterModule } from '@angular/router';
import { CreateOrderComponent } from './create-order.component';
import { CreateOrderRoutes } from './create-order.routing';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    FlexLayoutModule,
    RouterModule.forChild(CreateOrderRoutes)
  ],
  declarations: [CreateOrderComponent],
})
export class CreateOrderModule { }
