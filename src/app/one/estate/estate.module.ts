import { NgModule } from '@angular/core';

import { StoreModule } from '@ngrx/store';
import { reducers, effects } from '@app/app/one/estate/store';
import { EffectsModule } from '@ngrx/effects';

import { SharedModule } from '@app/app/shared/shared.module';
import { EstateRoutingModule } from '@app/app/one/estate/estate-routing.module';
import { CountryModule } from '@app/app/one/country/country.module';

import * as fromContainers from '@app/app/one/estate/containers';
import * as fromComponents from '@app/app/one/estate/components';
import * as fromShared from '@app/app/one/estate/shared';

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
