import { NgModule } from '@angular/core';

import { StoreModule } from '@ngrx/store';
import { reducers, effects } from '@web/app/features/b/country/store';
import { EffectsModule } from '@ngrx/effects';

import { SharedModule } from '@web/app/shared/shared.module';
import { CountryRoutingModule } from '@web/app/features/b/country/country-routing.module';

import * as fromContainers from '@web/app/features/b/country/containers';
import * as fromComponents from '@web/app/features/b/country/components';
import * as fromShared from '@web/app/features/b/country/shared';

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
