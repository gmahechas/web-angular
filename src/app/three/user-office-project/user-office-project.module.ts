import { NgModule } from '@angular/core';

import { SharedModule } from '@web/app/shared/shared.module';
import { UserOfficeProjectRoutingModule } from '@web/app/three/user-office-project/user-office-project-routing.module';

import * as fromContainers from '@web/app/three/user-office-project/containers';

@NgModule({
  imports: [
    SharedModule,
    UserOfficeProjectRoutingModule
  ],
  declarations: [
    ...fromContainers.containers
  ]
})
export class UserOfficeProjectModule { }
