import { NgModule } from '@angular/core';

import { StoreModule } from '@ngrx/store';
import { reducers, effects } from '@web/app/features/c/person/store';
import { EffectsModule } from '@ngrx/effects';

import { SharedModule } from '@web/app/shared/shared.module';
import { PersonRoutingModule } from '@web/app/features/c/person/person-routing.module';
import { CityModule } from '@web/app/features/b/city/city.module';

import * as fromContainers from '@web/app/features/c/person/containers';
import * as fromComponents from '@web/app/features/c/person/components';
import * as fromShared from '@web/app/features/c/person/shared';

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
