import { NgModule } from '@angular/core';

import { StoreModule } from '@ngrx/store';
import { reducers, effects } from '@web/app/one/estate/store';
import { EffectsModule } from '@ngrx/effects';

import { SharedModule } from '@web/app/shared/shared.module';
import { EstateRoutingModule } from '@web/app/one/estate/estate-routing.module';
import { CountryModule } from '@web/app/one/country/country.module';

import * as fromContainers from '@web/app/one/estate/containers';
import * as fromComponents from '@web/app/one/estate/components';
import * as fromShared from '@web/app/one/estate/shared';

@NgModule({
  imports: [
    SharedModule,
    EstateRoutingModule,
    StoreModule.forFeature('estate', reducers),
    EffectsModule.forFeature(effects),
    CountryModule
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
export class EstateModule { }
