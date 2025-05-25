import { Routes } from '@angular/router';

export const appRoutes: Routes = [
  {
    path: '',
    loadComponent: () => import('./features/redirect-page/redirect-page.component').then(m => m.RedirectPageComponent)
  },
  {
    path: 'home',
    loadComponent: () => import('./features/home/home.component').then(m => m.HomeComponent)
  },
  {
    path: 'install',
    loadComponent: () => import('./features/install-button/install-button.component').then(m => m.InstallButtonComponent)
  }
];
