import { NgModule } from '@angular/core';

import { StoreModule } from '@ngrx/store';
import { reducers, effects } from './store';
import { EffectsModule } from '@ngrx/effects';

import { SharedModule } from '../../shared/shared.module';
import { ProfileMenuRoutingModule } from './profile-menu-routing.module';

import * as fromContainers from './containers';

@NgModule({
  imports: [
    SharedModule,
    ProfileMenuRoutingModule,
    StoreModule.forFeature('profile_menu', reducers),
    EffectsModule.forFeature(effects)
  ],
  declarations: [
    ...fromContainers.containers
  ],
  providers: []
})
export class ProfileMenuModule { }
