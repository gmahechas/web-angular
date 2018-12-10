import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import * as fromContainers from '@web/app/features/c/type-person-identification/containers';
import {
  TypePersonIdentificationExistGuard
} from '@web/app/features/c/type-person-identification/guards/type-person-identification-exist.guard';

export const routes: Routes = [
  {
    path: '', component: fromContainers.IndexPageTypePersonIdentificationComponent,
    children: [
      { path: 'create', component: fromContainers.FormPageTypePersonIdentificationComponent },
      {
        path: ':type_person_identification_id',
        component: fromContainers.FormPageTypePersonIdentificationComponent,
        canActivate: [TypePersonIdentificationExistGuard]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TypePersonIdentificationRoutingModule { }
