import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from './auth/guards/auth.guard';
import { NotFoundCoreComponent } from './core/components/not-found-core/not-found-core.component';

export const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', loadChildren: './zero/dashboard/dashboard.module#DashboardModule', canLoad: [/* AuthGuard */] },
  { path: 'country', loadChildren: './one/country/country.module#CountryModule', canLoad: [/* AuthGuard */] },
  { path: 'estate', loadChildren: './one/estate/estate.module#EstateModule', canLoad: [AuthGuard] },
  { path: 'city', loadChildren: './one/city/city.module#CityModule', canLoad: [/* AuthGuard */] },
  { path: 'company', loadChildren: './one/company/company.module#CompanyModule', canLoad: [/* AuthGuard */] },
  { path: 'office', loadChildren: './one/office/office.module#OfficeModule', canLoad: [/* AuthGuard */] },
  { path: 'person', loadChildren: './two/person/person.module#PersonModule', canLoad: [/* AuthGuard */] },
  { path: 'profile', loadChildren: './two/profile/profile.module#ProfileModule', canLoad: [/* AuthGuard */] },
  { path: 'user', loadChildren: './two/user/user.module#UserModule', canLoad: [/* AuthGuard */] },
  { path: 'macroproject', loadChildren: './three/macroproject/macroproject.module#MacroprojectModule', canLoad: [/* AuthGuard */] },
  { path: 'project', loadChildren: './three/project/project.module#ProjectModule', canLoad: [/* AuthGuard */] },
  { path: 'not-found', component: NotFoundCoreComponent },
  { path: '**', redirectTo: 'not-found' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})

export class AppRoutingModule { }
