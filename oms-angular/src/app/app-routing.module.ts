import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { FullComponent } from './layouts/full/full.component';

const routes: Routes = [
  { path: '', component: HomeComponent},
  {
    path: 'cafe',
    component: FullComponent,
    children: [
      {
        path: '',
        redirectTo: '/cafe/dashboard',
        pathMatch: 'full',
      },
      {
        path: '',
        loadChildren:
          () => import('./material-component/material.module').then(m => m.MaterialComponentsModule),  // lazy
      },
      {
        path: 'dashboard',
        loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule), // lazy
      },
      {
        path: 'category',
        loadChildren: () => import('./category/category.module').then(m => m.CategoryModule), // lazy
      },
      {
        path: 'product',
        loadChildren: () => import('./product/product.module').then(m => m.ProductModule), // lazy
      },
      {
        path: 'order',
        loadChildren: () => import('./order/order.module').then(m => m.OrderModule), // lazy
      },
      {
        path: 'create-order',
        loadChildren: () => import('./create-order/create-order.module').then(m => m.CreateOrderModule), // lazy
      },
      {
        path: 'users',
        loadChildren: () => import('./users/users.module').then(m => m.UsersModule), // lazy
      },
      
    ]
  },
  { path: '**', component: HomeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
