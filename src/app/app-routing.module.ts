import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from '@web/app/auth/guards/auth.guard';
import { HaveUserOfficeCoreGuard } from '@web/app/core/guards/have-user-office-core.guard';

import { NotFoundCoreComponent } from '@web/app/core/components/not-found-core/not-found-core.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/dashboard',
    pathMatch: 'full'
  },
  {
    path: 'dashboard',
    loadChildren: () => {
      return import('@web/app/dashboard/dashboard.module').then(m => m.DashboardModule);
    },
    canLoad: [AuthGuard, HaveUserOfficeCoreGuard]
  },
  /* A */
  {
    path: 'country',
    loadChildren: () => {
      return import('@web/app/features/a/country/country.module').then(m => m.CountryModule);
    },
    canLoad: [AuthGuard, HaveUserOfficeCoreGuard]
  },
  {
    path: 'estate',
    loadChildren: () => {
      return import('@web/app/features/a/estate/estate.module').then(m => m.EstateModule);
    },
    canLoad: [AuthGuard, HaveUserOfficeCoreGuard]
  },
  {
    path: 'city',
    loadChildren: () => {
      return import('@web/app/features/a/city/city.module').then(m => m.CityModule);
    },
    canLoad: [AuthGuard, HaveUserOfficeCoreGuard]
  },
  /* B */
  {
    path: 'company',
    loadChildren: () => {
      return import('@web/app/features/b/company/company.module').then(m => m.CompanyModule);
    },
    canLoad: [AuthGuard, HaveUserOfficeCoreGuard]
  },
  {
    path: 'office',
    loadChildren: () => {
      return import('@web/app/features/b/office/office.module').then(m => m.OfficeModule);
    },
    canLoad: [AuthGuard, HaveUserOfficeCoreGuard]
  },
  {
    path: 'department',
    loadChildren: () => {
      return import('@web/app/features/b/department/department.module').then(m => m.DepartmentModule);
    },
    canLoad: [AuthGuard, HaveUserOfficeCoreGuard]
  },
  /* C */
  {
    path: 'type-person',
    loadChildren: () => {
      return import('@web/app/features/c/type-person/type-person.module').then(m => m.TypePersonModule);
    },
    canLoad: [AuthGuard, HaveUserOfficeCoreGuard]
  },
  {
    path: 'type-person-identification',
    loadChildren: () => {
      // tslint:disable-next-line:max-line-length
      return import('@web/app/features/c/type-person-identification/type-person-identification.module').then(m => m.TypePersonIdentificationModule);
    },
    canLoad: [AuthGuard, HaveUserOfficeCoreGuard]
  },
  {
    path: 'person',
    loadChildren: () => {
      return import('@web/app/features/c/person/person.module').then(m => m.PersonModule);
    },
    canLoad: [AuthGuard, HaveUserOfficeCoreGuard]
  },
  {
    path: 'profile',
    loadChildren: () => {
      return import('@web/app/features/c/profile/profile.module').then(m => m.ProfileModule);
    },
    canLoad: [AuthGuard, HaveUserOfficeCoreGuard]
  },
  {
    path: 'user',
    loadChildren: () => {
      return import('@web/app/features/c/user/user.module').then(m => m.UserModule);
    },
    canLoad: [AuthGuard, HaveUserOfficeCoreGuard]
  },
  {
    path: 'user-office',
    loadChildren: () => {
      return import('@web/app/features/c/user-office/user-office.module').then(m => m.UserOfficeModule);
    },
    canLoad: [AuthGuard]
  },
  /* D */
  {
    path: 'macroproject',
    loadChildren: () => {
      return import('@web/app/features/d/macroproject/macroproject.module').then(m => m.MacroprojectModule);
    },
    canLoad: [AuthGuard, HaveUserOfficeCoreGuard]
  },
  {
    path: 'project',
    loadChildren: () => {
      return import('@web/app/features/d/project/project.module').then(m => m.ProjectModule);
    },
    canLoad: [AuthGuard, HaveUserOfficeCoreGuard]
  },
  {
    path: 'user-office-project',
    loadChildren: () => {
      return import('@web/app/features/d/user-office-project/user-office-project.module').then(m => m.UserOfficeProjectModule);
    },
    canLoad: [AuthGuard, HaveUserOfficeCoreGuard]
  },
  /* E */
  {
    path: 'workflow',
    loadChildren: () => {
      return import('@web/app/features/e/workflow/workflow.module').then(m => m.WorkflowModule);
    },
    canLoad: [AuthGuard, HaveUserOfficeCoreGuard]
  },
  /* F */
  {
    path: 'day',
    loadChildren: () => {
      return import('@web/app/features/f/day/day.module').then(m => m.DayModule);
    },
    canLoad: [AuthGuard, HaveUserOfficeCoreGuard]
  },
  {
    path: 'schedule',
    loadChildren: () => {
      return import('@web/app/features/f/schedule/schedule.module').then(m => m.ScheduleModule);
    },
    canLoad: [AuthGuard, HaveUserOfficeCoreGuard]
  },
  {
    path: 'hour-range',
    loadChildren: () => {
      return import('@web/app/features/f/hour-range/hour-range.module').then(m => m.HourRangeModule);
    },
    canLoad: [AuthGuard, HaveUserOfficeCoreGuard]
  },
  {
    path: 'not-found',
    component: NotFoundCoreComponent,
    canActivate: [AuthGuard, HaveUserOfficeCoreGuard]
  },
  {
    path: '**',
    redirectTo: '/not-found',
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { useHash: true })
  ],
  exports: [RouterModule],
})

export class AppRoutingModule { }
