import { NgModule } from '@angular/core';

import { StoreModule } from '@ngrx/store';
import { reducers, effects } from '@web/app/features/f/day/store';
import { EffectsModule } from '@ngrx/effects';

import { SharedModule } from '@web/app/shared/shared.module';
import { DayRoutingModule } from '@web/app/features/f/day/day-routing.module';

import * as fromContainers from '@web/app/features/f/day/containers';
import * as fromComponents from '@web/app/features/f/day/components';
import * as fromShared from '@web/app/features/f/day/shared';

@NgModule({
  imports: [
    SharedModule,
    DayRoutingModule,
    StoreModule.forFeature('day', reducers),
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
export class DayModule { }
