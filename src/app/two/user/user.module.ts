import { NgModule } from '@angular/core';

import { StoreModule } from '@ngrx/store';
import { reducers, effects } from '@app/app/two/user/store';
import { EffectsModule } from '@ngrx/effects';

import { SharedModule } from '@app/app/shared/shared.module';
import { UserRoutingModule } from '@app/app/two/user/user-routing.module';
import { PersonModule } from '@app/app/two/person/person.module';
import { ProfileModule } from '@app/app/two/profile/profile.module';

import * as fromContainers from '@app/app/two/user/containers';
import * as fromComponents from '@app/app/two/user/components';
import * as fromShared from '@app/app/two/user/shared';

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
