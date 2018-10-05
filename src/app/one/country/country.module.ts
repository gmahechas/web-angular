import { NgModule } from '@angular/core';

import { StoreModule } from '@ngrx/store';
import { reducers, effects } from '@web/app/one/country/store';
import { EffectsModule } from '@ngrx/effects';

import { SharedModule } from '@web/app/shared/shared.module';
import { CountryRoutingModule } from '@web/app/one/country/country-routing.module';

import * as fromContainers from '@web/app/one/country/containers';
import * as fromComponents from '@web/app/one/country/components';
import * as fromShared from '@web/app/one/country/shared';

@NgModule({
  imports: [
    SharedModule,
    CountryRoutingModule,
    StoreModule.forFeature('country', reducers),
    EffectsModule.forFeature(effects),
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
export class CountryModule { }
