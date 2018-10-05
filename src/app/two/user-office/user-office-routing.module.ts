import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import * as fromContainers from '@app/app/two/user-office/containers';

const routes: Routes = [
  { path: 'user/:user_id', component: fromContainers.IndexPageUserOfficeComponent },
  { path: 'office/:office_id', component: fromContainers.IndexPageUserOfficeComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserOfficeRoutingModule { }
