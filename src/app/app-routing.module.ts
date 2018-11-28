import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from '@web/app/auth/guards/auth.guard';
import { HaveUserOfficeCoreGuard } from '@web/app/core/guards/have-user-office-core.guard';

import { NotFoundCoreComponent } from '@web/app/core/components/not-found-core/not-found-core.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/dashboard',
    pathMatch: 'full',
    canLoad: [AuthGuard, HaveUserOfficeCoreGuard]
  },
  {
    path: 'dashboard',
    loadChildren: '@web/app/dashboard/dashboard.module#DashboardModule',
    canLoad: [AuthGuard, HaveUserOfficeCoreGuard]
  },
  {
    path: 'country',
    loadChildren: '@web/app/features/a/country/country.module#CountryModule',
    canLoad: [AuthGuard, HaveUserOfficeCoreGuard]
  },
  {
    path: 'estate',
    loadChildren: '@web/app/features/a/estate/estate.module#EstateModule',
    canLoad: [AuthGuard, HaveUserOfficeCoreGuard]
  },
  {
    path: 'city',
    loadChildren: '@web/app/features/a/city/city.module#CityModule',
    canLoad: [AuthGuard, HaveUserOfficeCoreGuard]
  },
  {
    path: 'company',
    loadChildren: '@web/app/features/b/company/company.module#CompanyModule',
    canLoad: [AuthGuard, HaveUserOfficeCoreGuard]
  },
  {
    path: 'office',
    loadChildren: '@web/app/features/b/office/office.module#OfficeModule',
    canLoad: [AuthGuard, HaveUserOfficeCoreGuard]
  },
  {
    path: 'person',
    loadChildren: '@web/app/features/c/person/person.module#PersonModule',
    canLoad: [AuthGuard, HaveUserOfficeCoreGuard]
  },
  {
    path: 'profile',
    loadChildren: '@web/app/features/c/profile/profile.module#ProfileModule',
    canLoad: [AuthGuard, HaveUserOfficeCoreGuard]
  },
  {
    path: 'user',
    loadChildren: '@web/app/features/c/user/user.module#UserModule',
    canLoad: [AuthGuard, HaveUserOfficeCoreGuard]
  },
  {
    path: 'user-office',
    loadChildren: '@web/app/features/c/user-office/user-office.module#UserOfficeModule',
    canLoad: [AuthGuard]
  },
  {
    path: 'macroproject',
    loadChildren: '@web/app/features/d/macroproject/macroproject.module#MacroprojectModule',
    canLoad: [AuthGuard, HaveUserOfficeCoreGuard]
  },
  {
    path: 'project',
    loadChildren: '@web/app/features/d/project/project.module#ProjectModule',
    canLoad: [AuthGuard, HaveUserOfficeCoreGuard]
  },
  {
    path: 'workflow',
    loadChildren: '@web/app/features/e/workflow/workflow.module#WorkflowModule',
    canLoad: [AuthGuard, HaveUserOfficeCoreGuard]
  },
  {
    path: 'not-found',
    component: NotFoundCoreComponent,
    canActivate: [AuthGuard, HaveUserOfficeCoreGuard]
  },
  {
    path: '**',
    redirectTo: 'not-found',
    canActivate: [AuthGuard, HaveUserOfficeCoreGuard]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
})

export class AppRoutingModule { }
