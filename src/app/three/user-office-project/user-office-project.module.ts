import { NgModule } from '@angular/core';

import { SharedModule } from '../../shared/shared.module';
import { UserOfficeProjectRoutingModule } from './user-office-project-routing.module';

import * as fromContainers from './containers';

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
