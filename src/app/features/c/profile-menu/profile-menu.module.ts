import { NgModule } from '@angular/core';

import { StoreModule } from '@ngrx/store';
import { reducers, effects } from '@web/app/features/c/profile-menu/store';
import { EffectsModule } from '@ngrx/effects';

import { SharedModule } from '@web/app/shared/shared.module';
import { ProfileMenuRoutingModule } from '@web/app/features/c/profile-menu/profile-menu-routing.module';

import * as fromContainers from '@web/app/features/c/profile-menu/containers';

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
