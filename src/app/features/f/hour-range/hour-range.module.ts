import { NgModule } from '@angular/core';

import { StoreModule } from '@ngrx/store';
import { reducers, effects } from '@web/app/features/f/hour-range/store';
import { EffectsModule } from '@ngrx/effects';

import { SharedModule } from '@web/app/shared/shared.module';
import { HourRangeRoutingModule } from '@web/app/features/f/hour-range/hour-range-routing.module';

import * as fromContainers from '@web/app/features/f/hour-range/containers';
import * as fromComponents from '@web/app/features/f/hour-range/components';
import * as fromShared from '@web/app/features/f/hour-range/shared';

@NgModule({
  imports: [
    SharedModule,
    HourRangeRoutingModule,
    StoreModule.forFeature('hour_range', reducers),
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
export class HourRangeModule { }
