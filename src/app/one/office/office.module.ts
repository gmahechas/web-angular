import { NgModule } from '@angular/core';

import { StoreModule } from '@ngrx/store';
import { reducers, effects } from './store';
import { EffectsModule } from '@ngrx/effects';

import { SharedModule } from '../../shared/shared.module';
import { OfficeRoutingModule } from './office-routing.module';
import { SharedCityModule } from '../city/shared-city/shared-city.module';

import * as fromContainers from './containers';
import * as fromComponents from './components';
import * as fromGuards from './guards';


@NgModule({
  imports: [
    SharedModule,
    OfficeRoutingModule,
    StoreModule.forFeature('office', reducers),
    EffectsModule.forFeature(effects),
    SharedCityModule
  ],
  declarations: [
    ...fromContainers.containers,
    ...fromComponents.components
  ],
  providers: [
    ...fromGuards.guards
  ]
})
export class OfficeModule { }
