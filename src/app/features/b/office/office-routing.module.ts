import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import * as fromContainers from '@web/app/features/b/office/containers';
import { OfficeExistGuard } from '@web/app/features/b/office/guards/office-exist.guard';

export const routes: Routes = [
  {
    path: '', component: fromContainers.IndexPageOfficeComponent,
    children: [
      { path: 'create', component: fromContainers.FormPageOfficeComponent },
      {
        path: ':office_id', component: fromContainers.FormPageOfficeComponent, canActivate: [OfficeExistGuard], children: [
          {
            path: 'user-office',
            loadChildren: () => {
              return import('@web/app/features/c/user-office/user-office.module').then(m => m.UserOfficeModule);
            },
            outlet: 'router-outlet-user-office'
          },
          {
            path: 'office-department',
            loadChildren: () => {
              return import('@web/app/features/b/office-department/office-department.module').then(m => m.OfficeDepartmentModule);
            },
            outlet: 'router-outlet-user-department'
          }
        ]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OfficeRoutingModule { }
