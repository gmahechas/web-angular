import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import * as fromContainers from './containers';
import { ProfileExistGuard } from './guards/profile-exist.guard';

export const routes: Routes = [
  {
    path: '', component: fromContainers.IndexPageProfileComponent,
    children: [
      { path: 'create', component: fromContainers.FormPageProfileComponent },
      { path: ':profile_id', component: fromContainers.FormPageProfileComponent, canActivate: [ProfileExistGuard] }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfileRoutingModule { }
