import { NgModule } from '@angular/core';

import { StoreModule } from '@ngrx/store';
import { reducers, effects } from './store';
import { EffectsModule } from '@ngrx/effects';

import { SharedModule } from '../../shared/shared.module';
import { ProfileRoutingModule } from './profile-routing.module';

import * as fromContainers from './containers';
import * as fromComponents from './components';
import * as fromGuards from './guards';

@NgModule({
  imports: [
    SharedModule,
    ProfileRoutingModule,
    StoreModule.forFeature('profile', reducers),
    EffectsModule.forFeature(effects),
  ],
  declarations: [
    ...fromContainers.containers,
    ...fromComponents.components
  ],
  providers: [
    ...fromGuards.guards
  ]
})
export class ProfileModule { }
