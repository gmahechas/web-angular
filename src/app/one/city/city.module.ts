import { NgModule } from '@angular/core';

import { StoreModule } from '@ngrx/store';
import { reducers, effects } from '@app/app/one/city/store';
import { EffectsModule } from '@ngrx/effects';

import { SharedModule } from '@app/app/shared/shared.module';
import { CityRoutingModule } from '@app/app/one/city/city-routing.module';
import { EstateModule } from '@app/app/one/estate/estate.module';

import * as fromContainers from '@app/app/one/city/containers';
import * as fromComponents from '@app/app/one/city/components';
import * as fromShared from '@app/app/one/city/shared';

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
