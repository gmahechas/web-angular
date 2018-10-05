import { NgModule } from '@angular/core';

import { StoreModule } from '@ngrx/store';
import { reducers, effects } from '@web/app/auth/store';
import { EffectsModule } from '@ngrx/effects';

import { AuthRoutingModule } from '@web/app/auth/auth-routing.module';
import { SharedModule } from '@web/app/shared/shared.module';

import * as fromContainers from '@web/app/auth/containers';
import * as fromComponents from '@web/app/auth/components';

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
