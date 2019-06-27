import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import * as fromContainers from '@web/app/features/c/user-office/containers';

const routes: Routes = [
  { path: 'select-office', component: fromContainers.SelectOfficePageUserOfficeComponent },
  {
    path: 'user/:user_id', component: fromContainers.IndexPageUserOfficeComponent, children: [
      {
        path: 'user-office-project',
        loadChildren: () => {
          return import('@web/app/features/d/user-office-project/user-office-project.module').then(m => m.UserOfficeProjectModule);
        },
        outlet: 'router-outlet-user-office-project'
      }
    ]
  },
  {
    path: 'office/:office_id', component: fromContainers.IndexPageUserOfficeComponent, children: [
      {
        path: 'user-office-project',
        loadChildren: () => {
          return import('@web/app/features/d/user-office-project/user-office-project.module').then(m => m.UserOfficeProjectModule);
        },
        outlet: 'router-outlet-user-office-project'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserOfficeRoutingModule { }
