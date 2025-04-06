import { Routes } from '@angular/router';
import { RouteCheckComponent } from './pages/route-check/route-check.component';
import { LoginComponent } from './pages/login/login.component';
import { InstallPageComponent } from './pages/install/install-page.component';

export const routes: Routes = [   // <-- deve essere "routes"
  { path: '', redirectTo: 'route-check', pathMatch: 'full' },
  { path: 'route-check', component: RouteCheckComponent },
  { path: 'login', component: LoginComponent },
  { path: 'install', component: InstallPageComponent },
  { path: '**', redirectTo: 'route-check' }
];
