import { NgModule } from '@angular/core';

import { StoreModule } from '@ngrx/store';
import { reducers, effects } from '@app/app/two/person/store';
import { EffectsModule } from '@ngrx/effects';

import { SharedModule } from '@app/app/shared/shared.module';
import { PersonRoutingModule } from '@app/app/two/person/person-routing.module';
import { CityModule } from '@app/app/one/city/city.module';

import * as fromContainers from '@app/app/two/person/containers';
import * as fromComponents from '@app/app/two/person/components';
import * as fromShared from '@app/app/two/person/shared';

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
