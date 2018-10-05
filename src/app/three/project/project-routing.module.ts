import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import * as fromContainers from '@app/app/three/project/containers';
import { ProjectExistGuard } from '@app/app/three/project/guards/project-exist.guard';

export const routes: Routes = [
  {
    path: '', component: fromContainers.IndexPageProjectComponent,
    children: [
      { path: 'create', component: fromContainers.FormPageProjectComponent },
      { path: ':project_id', component: fromContainers.FormPageProjectComponent, canActivate: [ProjectExistGuard] }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProjectRoutingModule { }
