import { NgModule } from '@angular/core';

import { StoreModule } from '@ngrx/store';
import { reducers, effects } from './store';
import { EffectsModule } from '@ngrx/effects';

import { SharedModule } from '../../shared/shared.module';
import { PersonRoutingModule } from './person-routing.module';
import { CityModule } from '../../one/city/city.module';

import * as fromContainers from './containers';
import * as fromComponents from './components';
import * as fromSharedContainers from './shared/containers';
import * as fromGuards from './guards';

@NgModule({
  imports: [
    SharedModule,
    PersonRoutingModule,
    StoreModule.forFeature('person', reducers),
    EffectsModule.forFeature(effects),
    CityModule
  ],
  declarations: [
    ...fromContainers.containers,
    ...fromComponents.components,
    ...fromSharedContainers.containers
  ],
  providers: [
    ...fromGuards.guards
  ],
  exports: [
    ...fromSharedContainers.containers
  ]
})
export class PersonModule { }
