import { NgModule } from '@angular/core';

import { StoreModule } from '@ngrx/store';
import { reducers, effects } from '@app/app/one/country/store';
import { EffectsModule } from '@ngrx/effects';

import { SharedModule } from '@app/app/shared/shared.module';
import { CountryRoutingModule } from '@app/app/one/country/country-routing.module';

import * as fromContainers from '@app/app/one/country/containers';
import * as fromComponents from '@app/app/one/country/components';
import * as fromShared from '@app/app/one/country/shared';

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
