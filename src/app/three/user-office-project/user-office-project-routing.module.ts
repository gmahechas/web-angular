import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import * as fromContainers from '@app/app/three/user-office-project/containers';

const routes: Routes = [
  {
    path: '', component: fromContainers.IndexPageUserOfficeProjectComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserOfficeProjectRoutingModule { }
