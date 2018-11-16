import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from '@web/app/auth/guards/auth.guard';
import { NotFoundCoreComponent } from '@web/app/core/components/not-found-core/not-found-core.component';

export const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full', canLoad: [AuthGuard] },
  { path: 'dashboard', loadChildren: '@web/app/dashboard/dashboard.module#DashboardModule', canLoad: [AuthGuard] },
  { path: 'country', loadChildren: '@web/app/features/b/country/country.module#CountryModule', canLoad: [AuthGuard] },
  { path: 'estate', loadChildren: '@web/app/features/b/estate/estate.module#EstateModule', canLoad: [AuthGuard] },
  { path: 'city', loadChildren: '@web/app/features/b/city/city.module#CityModule', canLoad: [AuthGuard] },
  { path: 'company', loadChildren: '@web/app/features/b/company/company.module#CompanyModule', canLoad: [AuthGuard] },
  { path: 'office', loadChildren: '@web/app/features/b/office/office.module#OfficeModule', canLoad: [AuthGuard] },
  { path: 'person', loadChildren: '@web/app/features/c/person/person.module#PersonModule', canLoad: [AuthGuard] },
  { path: 'profile', loadChildren: '@web/app/features/c/profile/profile.module#ProfileModule', canLoad: [AuthGuard] },
  { path: 'user', loadChildren: '@web/app/features/c/user/user.module#UserModule', canLoad: [AuthGuard] },
  { path: 'macroproject', loadChildren: '@web/app/features/d/macroproject/macroproject.module#MacroprojectModule', canLoad: [AuthGuard] },
  { path: 'project', loadChildren: '@web/app/features/d/project/project.module#ProjectModule', canLoad: [AuthGuard] },
  { path: 'not-found', component: NotFoundCoreComponent, canActivate: [AuthGuard] },
  { path: '**', redirectTo: 'not-found', canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
})

export class AppRoutingModule { }
