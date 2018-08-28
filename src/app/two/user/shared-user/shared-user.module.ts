import { NgModule } from '@angular/core';

import { StoreModule } from '@ngrx/store';
import { reducers, effects } from './../store';
import { EffectsModule } from '@ngrx/effects';

import { SharedModule } from './../../../shared/shared.module';

import * as fromContainers from './containers';

@NgModule({
  imports: [
    SharedModule,
    StoreModule.forFeature('user', reducers),
    EffectsModule.forFeature(effects)
  ],
  declarations: [
    ...fromContainers.containers
  ],
  exports: [
    ...fromContainers.containers
  ]
})
export class SharedUserModule { }
