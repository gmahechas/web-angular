import { NgModule } from '@angular/core';

import { StoreModule } from '@ngrx/store';
import { reducers, effects } from './store';
import { EffectsModule } from '@ngrx/effects';

import { SharedModule } from '../../shared/shared.module';
import { PersonRoutingModule } from './person-routing.module';
import { SharedCityModule } from '../../one/city/shared-city/shared-city.module';

import * as fromContainers from './containers';
import * as fromComponents from './components';
import * as fromGuards from './guards';

@NgModule({
  imports: [
    SharedModule,
    PersonRoutingModule,
    StoreModule.forFeature('person', reducers),
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
export class PersonModule { }
