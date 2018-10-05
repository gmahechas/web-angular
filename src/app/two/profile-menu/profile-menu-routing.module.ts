import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import * as fromContainers from '@web/app/two/profile-menu/containers';

export const routes: Routes = [
  {
    path: ':profile_id', component: fromContainers.IndexPageProfileMenuComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfileMenuRoutingModule { }
