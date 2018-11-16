import { NgModule } from '@angular/core';

import { StoreModule } from '@ngrx/store';
import { reducers, effects } from '@web/app/features/c/profile/store';
import { EffectsModule } from '@ngrx/effects';

import { SharedModule } from '@web/app/shared/shared.module';
import { ProfileRoutingModule } from '@web/app/features/c/profile/profile-routing.module';

import * as fromContainers from '@web/app/features/c/profile/containers';
import * as fromComponents from '@web/app/features/c/profile/components';
import * as fromShared from '@web/app/features/c/profile/shared';

@NgModule({
  imports: [
    SharedModule,
    ProfileRoutingModule,
    StoreModule.forFeature('profile', reducers),
    EffectsModule.forFeature(effects),
  ],
  declarations: [
    ...fromContainers.containers,
    ...fromComponents.components,
    ...fromShared.shared
  ],
  exports: [
    ...fromShared.shared
  ]
})
export class ProfileModule { }
