import { NgModule } from '@angular/core';

import { StoreModule } from '@ngrx/store';
import { reducers, effects } from '@web/app/features/f/schedule-day-hour-range/store';
import { EffectsModule } from '@ngrx/effects';

import { SharedModule } from '@web/app/shared/shared.module';
import { ScheduleDayHourRangeRoutingModule } from '@web/app/features/f/schedule-day-hour-range/schedule-day-hour-range-routing.module';
import { ScheduleDayModule } from '@web/app/features/f/schedule-day/schedule-day.module';
import { HourRangeModule } from '@web/app/features/f/hour-range/hour-range.module';

import * as fromContainers from '@web/app/features/f/schedule-day-hour-range/containers';
import * as fromComponents from '@web/app/features/f/schedule-day-hour-range/components';
import * as fromShared from '@web/app/features/f/schedule-day-hour-range/shared';

@NgModule({
  imports: [
    SharedModule,
    ScheduleDayHourRangeRoutingModule,
    StoreModule.forFeature('schedule_day_hour_range', reducers),
    EffectsModule.forFeature(effects),
    ScheduleDayModule,
    HourRangeModule
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
export class ScheduleDayHourRangeModule { }
