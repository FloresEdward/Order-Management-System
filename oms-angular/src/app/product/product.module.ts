import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../shared/material-module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RouterModule } from '@angular/router';
import { ProductRoutes } from './product.routing';
import { ProductComponent } from './product.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { ProductDialogComponent } from './dialogs/product-dialog/product-dialog.component';


@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    FlexLayoutModule,
    RouterModule.forChild(ProductRoutes),
    FormsModule,
    SharedModule,
    ReactiveFormsModule
  ],
  declarations: [ProductComponent, ProductDialogComponent]
  
})
export class ProductModule { }
