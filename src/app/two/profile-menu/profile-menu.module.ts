import { NgModule } from '@angular/core';

import { SharedModule } from '../../shared/shared.module';
import { ProfileMenuRoutingModule } from './profile-menu-routing.module';

import * as fromContainers from './containers';

@NgModule({
  imports: [
    SharedModule,
    ProfileMenuRoutingModule
  ],
  declarations: [
    ...fromContainers.containers
  ],
  providers: []
})
export class ProfileMenuModule { }
