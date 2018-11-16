import { NgModule } from '@angular/core';

import { StoreModule } from '@ngrx/store';
import { reducers, effects } from '@web/app/features/b/city/store';
import { EffectsModule } from '@ngrx/effects';

import { SharedModule } from '@web/app/shared/shared.module';
import { CityRoutingModule } from '@web/app/features/b/city/city-routing.module';
import { EstateModule } from '@web/app/features/b/estate/estate.module';

import * as fromContainers from '@web/app/features/b/city/containers';
import * as fromComponents from '@web/app/features/b/city/components';
import * as fromShared from '@web/app/features/b/city/shared';

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
