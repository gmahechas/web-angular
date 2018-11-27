import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from '@web/app/auth/guards/auth.guard';
import { HaveOfficeCoreGuard } from '@web/app/core/guards/have-office-core.guard';

import { NotFoundCoreComponent } from '@web/app/core/components/not-found-core/not-found-core.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/dashboard',
    pathMatch: 'full',
    canLoad: [AuthGuard, HaveOfficeCoreGuard]
  },
  {
    path: 'dashboard',
    loadChildren: '@web/app/dashboard/dashboard.module#DashboardModule',
    canLoad: [AuthGuard, HaveOfficeCoreGuard]
  },
  {
    path: 'country',
    loadChildren: '@web/app/features/a/country/country.module#CountryModule',
    canLoad: [AuthGuard, HaveOfficeCoreGuard]
  },
  {
    path: 'estate',
    loadChildren: '@web/app/features/a/estate/estate.module#EstateModule',
    canLoad: [AuthGuard, HaveOfficeCoreGuard]
  },
  {
    path: 'city',
    loadChildren: '@web/app/features/a/city/city.module#CityModule',
    canLoad: [AuthGuard, HaveOfficeCoreGuard]
  },
  {
    path: 'company',
    loadChildren: '@web/app/features/b/company/company.module#CompanyModule',
    canLoad: [AuthGuard, HaveOfficeCoreGuard]
  },
  {
    path: 'office',
    loadChildren: '@web/app/features/b/office/office.module#OfficeModule',
    canLoad: [AuthGuard, HaveOfficeCoreGuard]
  },
  {
    path: 'person',
    loadChildren: '@web/app/features/c/person/person.module#PersonModule',
    canLoad: [AuthGuard, HaveOfficeCoreGuard]
  },
  {
    path: 'profile',
    loadChildren: '@web/app/features/c/profile/profile.module#ProfileModule',
    canLoad: [AuthGuard, HaveOfficeCoreGuard]
  },
  {
    path: 'user',
    loadChildren: '@web/app/features/c/user/user.module#UserModule',
    canLoad: [AuthGuard, HaveOfficeCoreGuard]
  },
  {
    path: 'user-office',
    loadChildren: '@web/app/features/c/user-office/user-office.module#UserOfficeModule',
    canLoad: [AuthGuard]
  },
  {
    path: 'macroproject',
    loadChildren: '@web/app/features/d/macroproject/macroproject.module#MacroprojectModule',
    canLoad: [AuthGuard, HaveOfficeCoreGuard]
  },
  {
    path: 'project',
    loadChildren: '@web/app/features/d/project/project.module#ProjectModule',
    canLoad: [AuthGuard, HaveOfficeCoreGuard]
  },
  {
    path: 'workflow',
    loadChildren: '@web/app/features/e/workflow/workflow.module#WorkflowModule',
    canLoad: [AuthGuard, HaveOfficeCoreGuard]
  },
  {
    path: 'not-found',
    component: NotFoundCoreComponent,
    canActivate: [AuthGuard, HaveOfficeCoreGuard]
  },
  {
    path: '**',
    redirectTo: 'not-found',
    canActivate: [AuthGuard, HaveOfficeCoreGuard]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
})

export class AppRoutingModule { }
