import { Routes } from '@angular/router';

export const FULL_ROUTES: Routes = [
    {
      path: 'app',
      loadChildren: () => import('./full-pages.module').then(m => m.FullPagesModule)
    }
];