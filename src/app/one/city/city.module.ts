import { NgModule } from '@angular/core';

import { StoreModule } from '@ngrx/store';
import { reducers, effects } from '@web/app/one/city/store';
import { EffectsModule } from '@ngrx/effects';

import { SharedModule } from '@web/app/shared/shared.module';
import { CityRoutingModule } from '@web/app/one/city/city-routing.module';
import { EstateModule } from '@web/app/one/estate/estate.module';

import * as fromContainers from '@web/app/one/city/containers';
import * as fromComponents from '@web/app/one/city/components';
import * as fromShared from '@web/app/one/city/shared';

@NgModule({
  imports: [
    SharedModule,
    CityRoutingModule,
    StoreModule.forFeature('city', reducers),
    EffectsModule.forFeature(effects),
    EstateModule,
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
export class CityModule { }
