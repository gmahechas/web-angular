import { NgModule } from '@angular/core';

import { StoreModule } from '@ngrx/store';
import { reducers, effects } from './store';
import { EffectsModule } from '@ngrx/effects';

import { SharedModule } from '../../shared/shared.module';
import { CityRoutingModule } from './city-routing.module';
import { SharedEstateModule } from '../estate/shared-estate/shared-estate.module';

import * as fromContainers from './containers';
import * as fromComponents from './components';
import * as fromGuards from './guards';

@NgModule({
  imports: [
    SharedModule,
    CityRoutingModule,
    StoreModule.forFeature('city', reducers),
    EffectsModule.forFeature(effects),
    SharedEstateModule,
  ],
  declarations: [
    ...fromContainers.containers,
    ...fromComponents.components
  ],
  providers: [
    ...fromGuards.guards
  ]
})
export class CityModule { }
