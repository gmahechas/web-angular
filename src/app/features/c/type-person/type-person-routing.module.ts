import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import * as fromContainers from '@web/app/features/c/type-person/containers';
import { TypePersonExistGuard } from '@web/app/features/c/type-person/guards/type-person-exist.guard';

export const routes: Routes = [
  {
    path: '', component: fromContainers.IndexPageTypePersonComponent,
    children: [
      { path: 'create', component: fromContainers.FormPageTypePersonComponent },
      { path: ':type_person_id', component: fromContainers.FormPageTypePersonComponent, canActivate: [TypePersonExistGuard] }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TypePersonRoutingModule { }
