import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import * as fromContainers from '@web/app/one/office/containers';
import { OfficeExistGuard } from '@web/app/one/office/guards/office-exist.guard';

export const routes: Routes = [
  {
    path: '', component: fromContainers.IndexPageOfficeComponent,
    children: [
      { path: 'create', component: fromContainers.FormPageOfficeComponent },
      {
        path: ':office_id', component: fromContainers.FormPageOfficeComponent, canActivate: [OfficeExistGuard], children: [
          {
            path: 'user-office',
            loadChildren: '@web/app/two/user-office/user-office.module#UserOfficeModule',
            outlet: 'router-outlet-user-office'
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
