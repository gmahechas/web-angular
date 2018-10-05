import { NgModule } from '@angular/core';

import { StoreModule } from '@ngrx/store';
import { reducers, effects } from '@web/app/two/person/store';
import { EffectsModule } from '@ngrx/effects';

import { SharedModule } from '@web/app/shared/shared.module';
import { PersonRoutingModule } from '@web/app/two/person/person-routing.module';
import { CityModule } from '@web/app/one/city/city.module';

import * as fromContainers from '@web/app/two/person/containers';
import * as fromComponents from '@web/app/two/person/components';
import * as fromShared from '@web/app/two/person/shared';

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
    ...fromShared.shared
  ],
  exports: [
    ...fromShared.shared
  ]
})
export class PersonModule { }
