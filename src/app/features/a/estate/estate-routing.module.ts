import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import * as fromContainers from '@web/app/features/a/estate/containers';
import { EstateExistGuard } from '@web/app/features/a/estate/guards/estate-exist.guard';

export const routes: Routes = [
  {
    path: '', component: fromContainers.IndexPageEstateComponent,
    children: [
      { path: 'create', component: fromContainers.FormPageEstateComponent },
      { path: ':estate_id', component: fromContainers.FormPageEstateComponent, canActivate: [EstateExistGuard] }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EstateRoutingModule { }
