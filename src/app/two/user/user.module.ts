import { NgModule } from '@angular/core';

import { StoreModule } from '@ngrx/store';
import { reducers, effects } from './store';
import { EffectsModule } from '@ngrx/effects';

import { SharedModule } from '../../shared/shared.module';
import { UserRoutingModule } from './user-routing.module';
import { SharedPersonModule } from '../person/shared-person/shared-person.module';
import { SharedProfileModule } from '../profile/shared-profile/shared-profile.module';

import * as fromContainers from './containers';
import * as fromComponents from './components';
import * as fromGuards from './guards';

@NgModule({
  imports: [
    SharedModule,
    UserRoutingModule,
    StoreModule.forFeature('user', reducers),
    EffectsModule.forFeature(effects),
    SharedPersonModule,
    SharedProfileModule
  ],
  declarations: [
    ...fromContainers.containers,
    ...fromComponents.components
  ],
  providers: [
    ...fromGuards.guards
  ]
})
export class UserModule { }
