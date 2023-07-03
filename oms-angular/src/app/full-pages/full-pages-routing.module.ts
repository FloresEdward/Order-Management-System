import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthGuard } from '../shared/auth-guard.service';
import { CategoryComponent } from './category/category.component';
import { CreateOrderComponent } from './create-order/create-order.component';
import { ManageOrderComponent } from './manage-order/manage-order.component';
import { UsersComponent } from './users/users.component';
import { ProductComponent } from './product/product.component';

const routes: Routes = [
  {
    path: "",
    children: [
      {
        path: "dashboard",
        component: DashboardComponent,
        data: {
          title: "Dashboard",
        },
        canActivate: [AuthGuard]
      },
      {
        path: "category",
        component: CategoryComponent,
        data: {
          title: "Category",
        },
        canActivate: [AuthGuard]
      },
      {
        path: "product",
        component: ProductComponent,
        data: {
          title: "Product",
        },
        canActivate: [AuthGuard]
      },
      {
        path: "create-order",
        component: CreateOrderComponent,
        data: {
          title: "Create Order",
        },
        canActivate: [AuthGuard]
      },
      {
        path: "manage-order",
        component: ManageOrderComponent,
        data: {
          title: "Manage Order",
        },
        canActivate: [AuthGuard]
      },
      {
        path: "users",
        component: UsersComponent,
        data: {
          title: "Users",
        },
        canActivate: [AuthGuard]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FullPagesRoutingModule { }
