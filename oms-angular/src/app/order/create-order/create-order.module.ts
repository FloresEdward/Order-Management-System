import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../shared/material-module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RouterModule } from '@angular/router';
import { CreateOrderComponent } from './create-order.component';
import { CreateOrderRoutes } from './create-order.routing';
import { CardTitleComponent } from 'src/app/card-title/card-title.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ConfirmationDialogComponent } from './confirmation-dialog/confirmation-dialog.component';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    FlexLayoutModule,
    RouterModule.forChild(CreateOrderRoutes),
    SharedModule,
  ],
  declarations: [CreateOrderComponent, ConfirmationDialogComponent],
})
export class CreateOrderModule { }
