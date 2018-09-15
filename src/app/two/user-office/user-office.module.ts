import { NgModule } from '@angular/core';

import { StoreModule } from '@ngrx/store';
import { reducers, effects } from './store';
import { EffectsModule } from '@ngrx/effects';

import { SharedModule } from '../../shared/shared.module';
import { UserOfficeRoutingModule } from './user-office-routing.module';

import * as fromContainers from './containers';

@NgModule({
  imports: [
    SharedModule,
    UserOfficeRoutingModule,
    StoreModule.forFeature('user_office', reducers),
    EffectsModule.forFeature(effects)
  ],
  declarations: [
    ...fromContainers.containers
  ]
})
export class UserOfficeModule { }
