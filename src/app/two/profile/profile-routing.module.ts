import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import * as fromContainers from '@app/app/two/profile/containers';
import { ProfileExistGuard } from '@app/app/two/profile/guards/profile-exist.guard';

export const routes: Routes = [
  {
    path: '', component: fromContainers.IndexPageProfileComponent,
    children: [
      { path: 'create', component: fromContainers.FormPageProfileComponent },
      {
        path: ':profile_id', component: fromContainers.FormPageProfileComponent, canActivate: [ProfileExistGuard], children: [
          {
            path: 'profile-menu',
            loadChildren: '@app/app/two/profile-menu/profile-menu.module#ProfileMenuModule',
            outlet: 'router-outlet-profile-menu'
          }
        ]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfileRoutingModule { }
