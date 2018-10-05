import { NgModule } from '@angular/core';

import { StoreModule } from '@ngrx/store';
import { reducers, effects } from '@app/app/two/profile/store';
import { EffectsModule } from '@ngrx/effects';

import { SharedModule } from '@app/app/shared/shared.module';
import { ProfileRoutingModule } from '@app/app/two/profile/profile-routing.module';

import * as fromContainers from '@app/app/two/profile/containers';
import * as fromComponents from '@app/app/two/profile/components';
import * as fromShared from '@app/app/two/profile/shared';

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
