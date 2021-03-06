import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import * as fromContainers from '@web/app/features/d/project/containers';
import { ProjectExistGuard } from '@web/app/features/d/project/guards/project-exist.guard';

export const routes: Routes = [
  {
    path: '', component: fromContainers.IndexPageProjectComponent,
    children: [
      { path: 'create', component: fromContainers.FormPageProjectComponent },
      {
        path: ':project_id', component: fromContainers.FormPageProjectComponent, canActivate: [ProjectExistGuard], children: [
          {
            path: 'user-office-project',
            loadChildren: () => {
              return import('@web/app/features/d/user-office-project/user-office-project.module').then(m => m.UserOfficeProjectModule);
            },
            outlet: 'router-outlet-user-office-project'
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
export class ProjectRoutingModule { }
