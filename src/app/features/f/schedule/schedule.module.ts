import { NgModule } from '@angular/core';

import { StoreModule } from '@ngrx/store';
import { reducers, effects } from '@web/app/features/f/schedule/store';
import { EffectsModule } from '@ngrx/effects';

import { SharedModule } from '@web/app/shared/shared.module';
import { ScheduleRoutingModule } from '@web/app/features/f/schedule/schedule-routing.module';

import * as fromContainers from '@web/app/features/f/schedule/containers';
import * as fromComponents from '@web/app/features/f/schedule/components';
import * as fromShared from '@web/app/features/f/schedule/shared';

@NgModule({
  imports: [
    SharedModule,
    ScheduleRoutingModule,
    StoreModule.forFeature('schedule', reducers),
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
export class ScheduleModule { }
