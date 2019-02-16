import { NgModule } from '@angular/core';

import { StoreModule } from '@ngrx/store';
import { reducers, effects } from '@web/app/features/f/schedule-day/store';
import { EffectsModule } from '@ngrx/effects';

import { SharedModule } from '@web/app/shared/shared.module';
import { ScheduleDayRoutingModule } from '@web/app/features/f/schedule-day/schedule-day-routing.module';

import * as fromContainers from '@web/app/features/f/schedule-day/containers';
import * as fromComponents from '@web/app/features/f/schedule-day/components';
import * as fromShared from '@web/app/features/f/schedule-day/shared';

@NgModule({
  imports: [
    SharedModule,
    ScheduleDayRoutingModule,
    StoreModule.forFeature('schedule_day', reducers),
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
export class ScheduleDayModule { }
