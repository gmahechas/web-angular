import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from '@web/app/auth/guards/auth.guard';
import { NotFoundCoreComponent } from '@web/app/core/components/not-found-core/not-found-core.component';

export const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', loadChildren: '@web/app/zero/dashboard/dashboard.module#DashboardModule', canLoad: [AuthGuard] },
  { path: 'country', loadChildren: '@web/app/one/country/country.module#CountryModule', canLoad: [AuthGuard] },
  { path: 'estate', loadChildren: '@web/app/one/estate/estate.module#EstateModule', canLoad: [AuthGuard] },
  { path: 'city', loadChildren: '@web/app/one/city/city.module#CityModule', canLoad: [AuthGuard] },
  { path: 'company', loadChildren: '@web/app/one/company/company.module#CompanyModule', canLoad: [AuthGuard] },
  { path: 'office', loadChildren: '@web/app/one/office/office.module#OfficeModule', canLoad: [AuthGuard] },
  { path: 'person', loadChildren: '@web/app/two/person/person.module#PersonModule', canLoad: [AuthGuard] },
  { path: 'profile', loadChildren: '@web/app/two/profile/profile.module#ProfileModule', canLoad: [AuthGuard] },
  { path: 'user', loadChildren: '@web/app/two/user/user.module#UserModule', canLoad: [AuthGuard] },
  { path: 'macroproject', loadChildren: '@web/app/three/macroproject/macroproject.module#MacroprojectModule', canLoad: [AuthGuard] },
  { path: 'project', loadChildren: '@web/app/three/project/project.module#ProjectModule', canLoad: [AuthGuard] },
  { path: 'not-found', component: NotFoundCoreComponent, canActivate: [AuthGuard] },
  { path: '**', redirectTo: 'not-found', canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})

export class AppRoutingModule { }
