import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import * as fromContainers from '@web/app/features/b/office-department/containers';

export const routes: Routes = [
  {
    path: 'office/:office_id', component: fromContainers.IndexPageOfficeDepartmentComponent
  },
  {
    path: 'department/:department_id', component: fromContainers.IndexPageOfficeDepartmentComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OfficeDepartmentRoutingModule { }
