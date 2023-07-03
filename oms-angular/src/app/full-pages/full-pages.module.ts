import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FullPagesRoutingModule } from './full-pages-routing.module';
import { MaterialModule } from '../shared/material-module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CategoryComponent } from './category/category.component';
import { CreateOrderComponent } from './create-order/create-order.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ManageOrderComponent } from './manage-order/manage-order.component';
import { UsersComponent } from './users/users.component';
import { ProductComponent } from './product/product.component';
import { UserDialogComponent } from './users/user-dialog/user-dialog.component';
import { AddProductDialogComponent } from './product/dialogs/add-product-dialog/add-product-dialog.component';
import { AddCategoryDialogComponent } from './category/dialogs/add-category-dialog/add-category-dialog.component';


@NgModule({
  imports: [
    CommonModule,
    FullPagesRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    MaterialModule,
  ],
  declarations: [
    CategoryComponent,
    AddCategoryDialogComponent,
    ProductComponent,
    AddProductDialogComponent,
    CreateOrderComponent,
    DashboardComponent,
    ManageOrderComponent,
    UsersComponent,
    UserDialogComponent,
  ],
  providers: [],
})
export class FullPagesModule { }
