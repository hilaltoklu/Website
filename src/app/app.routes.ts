import { Routes } from '@angular/router';
import { LoadingResolver } from 'src/app/pages/services/loading.resolver';

export const routes: Routes = [
  {
    path: 'add',
    loadComponent: () => import('./pages/add.page').then((m) => m.AddPage),
     resolve: {
      data: LoadingResolver
    }
  },
  {
    path: 'list',
    loadComponent: () => import('./pages/list.page').then((m) => m.ListPage),
     resolve: {
      data: LoadingResolver
    }
  },
  {
    path: '',
    redirectTo: 'list', // Direkt olarak list sayfasına yönlendir
    pathMatch: 'full',
  },

  {
    path: 'article/:id',
    loadComponent: () => import('./pages/article.detail/article.detail.page').then( m => m.ArticleDetailPage),
     resolve: {
      data: LoadingResolver
    }
  },

  {
    path: 'login',
    loadComponent: () => import('./pages/login/login.page').then( m => m.LoginPage),
       resolve: {
      data: LoadingResolver
    }
  },

  {
    path: 'girisyap',
    loadComponent: () => import('./pages/list.page').then((m) => m.ListPage),
     resolve: {
      data: LoadingResolver
    }

  },
  {
    path: 'list2',
    loadComponent: () => import('./pages/list2.page').then((m) => m.List2Page),
     resolve: {
      data: LoadingResolver
    }
  },

  {
    path: 'kayitol',
    loadComponent: () => import('./pages/signup/signup.page').then( m => m.SignupPage),
     resolve: {
      data: LoadingResolver
    }
  },
{
    path: 'interests',
    loadComponent: () => import('./pages/interests/interests.page').then( m => m.InterestsPage),
    resolve: {
      data: LoadingResolver
    }
  },

  {
    path: 'update',
    loadComponent: () => import('./pages/updates/update.page').then( m => m.UpdatePage)
  },

];


