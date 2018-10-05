import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import * as fromContainers from '@app/app/two/user/containers';
import { UserExistGuard } from '@app/app/two/user/guards/user-exist.guard';

export const routes: Routes = [
  {
    path: '', component: fromContainers.IndexPageUserComponent,
    children: [
      { path: 'create', component: fromContainers.FormPageUserComponent },
      {
        path: ':user_id', component: fromContainers.FormPageUserComponent, canActivate: [UserExistGuard], children: [
          {
            path: 'user-office',
            loadChildren: '@app/app/two/user-office/user-office.module#UserOfficeModule',
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
export class UserRoutingModule { }
