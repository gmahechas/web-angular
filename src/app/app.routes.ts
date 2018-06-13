import { Routes } from '@angular/router';

import { AuthGuard } from './auth/guards/auth.guard';
import { NotFoundCoreComponent } from './core/components/not-found-core/not-found-core.component';

export const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  {
    path: 'dashboard',
    loadChildren: './zero/dashboard/dashboard.module#DashboardModule',
    canLoad: [/* AuthGuard */]
  },
  {
    path: 'country',
    loadChildren: './one/country/country.module#CountryModule',
    canLoad: [/* AuthGuard */]
  },
  {
    path: 'estate',
    loadChildren: './one/estate/estate.module#EstateModule',
    canLoad: [/* AuthGuard */]
  },
  {
    path: 'not-found',
    component: NotFoundCoreComponent
  },
  { path: '**', redirectTo: 'not-found' },
];
