import { NgModule } from '@angular/core';

import { StoreModule } from '@ngrx/store';
import { reducers, effects } from './store';
import { EffectsModule } from '@ngrx/effects';

import { AuthRoutingModule } from './auth-routing.module';
import { SharedModule } from './../shared/shared.module';

import * as fromContainers from './containers';
import * as fromComponents from './components';

@NgModule({
  imports: [
    SharedModule,
    AuthRoutingModule,
    StoreModule.forFeature('auth', reducers),
    EffectsModule.forFeature(effects)
  ],
  declarations: [
    ...fromContainers.containers,
    ...fromComponents.components
  ]
})
export class AuthModule { }
