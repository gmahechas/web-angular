import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import * as fromContainers from '@app/app/three/macroproject/containers';
import { MacroprojectExistGuard } from '@app/app/three/macroproject/guards/macroproject-exist.guard';

export const routes: Routes = [
  {
    path: '', component: fromContainers.IndexPageMacroprojectComponent,
    children: [
      { path: 'create', component: fromContainers.FormPageMacroprojectComponent },
      { path: ':macroproject_id', component: fromContainers.FormPageMacroprojectComponent, canActivate: [MacroprojectExistGuard] }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MacroprojectRoutingModule { }
