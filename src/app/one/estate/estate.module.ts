import { NgModule } from '@angular/core';

import { StoreModule } from '@ngrx/store';
import { reducers, effects } from './store';
import { EffectsModule } from '@ngrx/effects';

import { SharedModule } from '../../shared/shared.module';
import { EstateRoutingModule } from './estate-routing.module';
import { CountryModule } from '../country/country.module';

import * as fromContainers from './containers';
import * as fromComponents from './components';
import * as fromSharedContainers from './shared/containers';

@NgModule({
  imports: [
    SharedModule,
    EstateRoutingModule,
    StoreModule.forFeature('estate', reducers),
    EffectsModule.forFeature(effects),
    CountryModule
  ],
  declarations: [
    ...fromContainers.containers,
    ...fromComponents.components,
    ...fromSharedContainers.containers
  ],
  exports: [
    ...fromSharedContainers.containers
  ]
})
export class EstateModule { }
