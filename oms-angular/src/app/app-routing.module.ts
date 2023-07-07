import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { FullComponent } from './layouts/full/full.component';
import { ErrorComponent } from './error/error.component';
import { LoginComponent } from './landing/login/login.component';
import { SignupComponent } from './landing/signup/signup.component';
import { ForgotPasswordComponent } from './landing/forgot-password/forgot-password.component';
import { SetNewPasswordComponent } from './landing/set-new-password/set-new-password.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: '', component: HomeComponent, children: [
      { path: 'login', component: LoginComponent },
      { path: 'signup', component: SignupComponent },
      { path: 'reset-password', component: ForgotPasswordComponent },
      { path: 'set-new-password', component: SetNewPasswordComponent },
    ]
  },
  {
    path: 'app',
    component: FullComponent,
    children: [
      {
        path: '',
        redirectTo: '/app/dashboard',
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
        path: 'manage-order',
        loadChildren: () => import('./order/manage-order/manage-order.module').then(m => m.ManageOrderModule), // lazy
      },
      {
        path: 'create-order',
        loadChildren: () => import('./order/create-order/create-order.module').then(m => m.CreateOrderModule), // lazy
      },
      {
        path: 'order-history',
        loadChildren: () => import('./order/order-history/order-history.module').then(m => m.OrderHistoryModule)
      },
      {
        path: 'users',
        loadChildren: () => import('./users/users.module').then(m => m.UsersModule), // lazy
      },
      
      

    ],
    // canActivate: [AuthGuard],
  },
  { path: '**', component: ErrorComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
