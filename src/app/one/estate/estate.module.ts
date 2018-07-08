import { NgModule } from '@angular/core';

import { StoreModule } from '@ngrx/store';
import { reducers, effects } from './store';
import { EffectsModule } from '@ngrx/effects';

import { SharedModule } from '../../shared/shared.module';
import { EstateRoutingModule } from './estate-routing.module';
import { SharedCountryModule } from '../country/shared-country/shared-country.module';

import * as fromContainers from './containers';
import * as fromComponents from './components';
import * as fromGuards from './guards';


@NgModule({
  imports: [
    SharedModule,
    EstateRoutingModule,
    StoreModule.forFeature('estate', reducers),
    EffectsModule.forFeature(effects),
    SharedCountryModule
  ],
  declarations: [
    ...fromContainers.containers,
    ...fromComponents.components
  ],
  providers: [
    ...fromGuards.guards
  ]
})
export class EstateModule { }
