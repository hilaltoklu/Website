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

  {
    path: 'article/:id',
    loadComponent: () => import('./pages/article.detail/article.detail.page').then( m => m.ArticleDetailPage)
  },

  {
    path: 'login',
    loadComponent: () => import('./pages/login/login.page').then( m => m.LoginPage)
  },

  {
    path: 'girisyap',
    loadComponent: () => import('./pages/list.page').then((m) => m.ListPage),
  },


];


