import { NgModule } from '@angular/core';

import { StoreModule } from '@ngrx/store';
import { reducers, effects } from '@app/app/two/profile-menu/store';
import { EffectsModule } from '@ngrx/effects';

import { SharedModule } from '@app/app/shared/shared.module';
import { ProfileMenuRoutingModule } from '@app/app/two/profile-menu/profile-menu-routing.module';

import * as fromContainers from '@app/app/two/profile-menu/containers';

@NgModule({
  imports: [
    SharedModule,
    ProfileMenuRoutingModule,
    StoreModule.forFeature('profile_menu', reducers),
    EffectsModule.forFeature(effects)
  ],
  declarations: [
    ...fromContainers.containers
  ]
})
export class ProfileMenuModule { }
