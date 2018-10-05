import { NgModule } from '@angular/core';

import { StoreModule } from '@ngrx/store';
import { reducers, effects } from '@app/app/auth/store';
import { EffectsModule } from '@ngrx/effects';

import { AuthRoutingModule } from '@app/app/auth/auth-routing.module';
import { SharedModule } from '@app/app/shared/shared.module';

import * as fromContainers from '@app/app/auth/containers';
import * as fromComponents from '@app/app/auth/components';

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
