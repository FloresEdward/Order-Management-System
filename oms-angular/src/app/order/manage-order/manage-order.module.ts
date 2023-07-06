import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ManageOrderComponent } from './manage-order.component';
import { ManageOrderRoutes } from './manage-order.routing';
import { MaterialModule } from '../../shared/material-module';
import { CardTitleComponent } from 'src/app/card-title/card-title.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ConfirmationDialogComponent } from './confirmation-dialog/confirmation-dialog.component';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    FlexLayoutModule,
    RouterModule.forChild(ManageOrderRoutes),
    SharedModule
  ],
  declarations: [ManageOrderComponent, ConfirmationDialogComponent],
  // declarations: [ManageOrderComponent, CardTitleComponent],
  
})
export class ManageOrderModule { }
