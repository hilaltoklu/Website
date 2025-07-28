import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'add',
    loadComponent: () => import('./pages/add.page').then((m) => m.AddPage),
  },
  {
    path: 'list',
    loadComponent: () => import('./pages/list.page').then((m) => m.ListPage),
  },
  {
    path: '',
    redirectTo: 'list', // Direkt olarak list sayfasına yönlendir
    pathMatch: 'full',
  },
];