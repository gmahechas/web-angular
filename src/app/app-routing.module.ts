import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from '@app/app/auth/guards/auth.guard';
import { NotFoundCoreComponent } from '@app/app/core/components/not-found-core/not-found-core.component';

export const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', loadChildren: '@app/app/zero/dashboard/dashboard.module#DashboardModule', canLoad: [/* AuthGuard */] },
  { path: 'country', loadChildren: '@app/app/one/country/country.module#CountryModule', canLoad: [/* AuthGuard */] },
  { path: 'estate', loadChildren: '@app/app/one/estate/estate.module#EstateModule', canLoad: [/* AuthGuard */] },
  { path: 'city', loadChildren: '@app/app/one/city/city.module#CityModule', canLoad: [/* AuthGuard */] },
  { path: 'company', loadChildren: '@app/app/one/company/company.module#CompanyModule', canLoad: [/* AuthGuard */] },
  { path: 'office', loadChildren: '@app/app/one/office/office.module#OfficeModule', canLoad: [/* AuthGuard */] },
  { path: 'person', loadChildren: '@app/app/two/person/person.module#PersonModule', canLoad: [/* AuthGuard */] },
  { path: 'profile', loadChildren: '@app/app/two/profile/profile.module#ProfileModule', canLoad: [/* AuthGuard */] },
  { path: 'user', loadChildren: '@app/app/two/user/user.module#UserModule', canLoad: [/* AuthGuard */] },
  { path: 'macroproject', loadChildren: '@app/app/three/macroproject/macroproject.module#MacroprojectModule', canLoad: [/* AuthGuard */] },
  { path: 'project', loadChildren: '@app/app/three/project/project.module#ProjectModule', canLoad: [/* AuthGuard */] },
  { path: 'not-found', component: NotFoundCoreComponent },
  { path: '**', redirectTo: 'not-found' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})

export class AppRoutingModule { }
