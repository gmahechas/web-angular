import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import * as fromContainers from './containers';
import { ProfileMenuExistGuard } from './guards/profile-menu-exist.guard';

export const routes: Routes = [
  {
    path: ':profile_id', component: fromContainers.IndexPageProfileMenuComponent, canActivate: [ProfileMenuExistGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfileMenuRoutingModule { }
