import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ManageOrderComponent } from './manage-order.component';
import { ManageOrderRoutes } from './manage-order.routing';
import { MaterialModule } from '../shared/material-module';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    FlexLayoutModule,
    RouterModule.forChild(ManageOrderRoutes)
  ],
  declarations: [ManageOrderComponent]
})
export class ManageOrderModule { }
