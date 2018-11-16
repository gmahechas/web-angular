import { NgModule } from '@angular/core';

import { StoreModule } from '@ngrx/store';
import { reducers, effects } from '@web/app/features/c/user/store';
import { EffectsModule } from '@ngrx/effects';

import { SharedModule } from '@web/app/shared/shared.module';
import { UserRoutingModule } from '@web/app/features/c/user/user-routing.module';
import { PersonModule } from '@web/app/features/c/person/person.module';
import { ProfileModule } from '@web/app/features/c/profile/profile.module';

import * as fromContainers from '@web/app/features/c/user/containers';
import * as fromComponents from '@web/app/features/c/user/components';
import * as fromShared from '@web/app/features/c/user/shared';

@NgModule({
  imports: [
    SharedModule,
    UserRoutingModule,
    StoreModule.forFeature('user', reducers),
    EffectsModule.forFeature(effects),
    PersonModule,
    ProfileModule
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
export class UserModule { }
