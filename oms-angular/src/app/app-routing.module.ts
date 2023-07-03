import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './content-pages/home/home.component';
import { FullComponent } from './layouts/full/full.component';
import { CONTENT_ROUTES } from './content-pages/content-pages.routes';
import { FULL_ROUTES } from './full-pages/full-pages.routes';
import { AuthGuard } from './shared/auth-guard.service';
import { ContentComponent } from './layouts/content/home.component';
import { ContentPagesModule } from './content-pages/content-pages.module';

const routes: Routes = [
  {
    path: '',
    component: ContentPagesModule,
    children: CONTENT_ROUTES,
  },
  {
    path: '',
    component: FullComponent,
    children: FULL_ROUTES,
    canActivate: [AuthGuard]
  },
  { path: '**', redirectTo: '/login', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

// { path: '', component: HomeComponent },
// {
//   path: 'app',
//   component: FullComponent,
//   children: [
//     {
//       path: '',
//       redirectTo: '/app/dashboard',
//       pathMatch: 'full',
//     },
//     {
//       path: '',
//       loadChildren:
//         () => import('./material-component/material.module').then(m => m.MaterialComponentsModule),  // lazy
//     },
//     {
//       path: 'dashboard',
//       loadChildren: () => import('./full-pages/dashboard/dashboard.module').then(m => m.DashboardModule), // lazy
//     },
//     {
//       path: 'category',
//       loadChildren: () => import('./full-pages/category/category.module').then(m => m.CategoryModule), // lazy
//     },
//     {
//       path: 'product',
//       loadChildren: () => import('./product/product.module').then(m => m.ProductModule), // lazy
//     },
//     {
//       path: 'manage-order',
//       loadChildren: () => import('./full-pages/manage-order/manage-order.module').then(m => m.ManageOrderModule), // lazy
//     },
//     {
//       path: 'create-order',
//       loadChildren: () => import('./full-pages/create-order/create-order.module').then(m => m.CreateOrderModule), // lazy
//     },
//     {
//       path: 'users',
//       loadChildren: () => import('./full-pages/users/users.module').then(m => m.UsersModule), // lazy
//     },

//   ],
//   canActivate: [AuthGuard],
// },
// { path: '**', component: HomeComponent }