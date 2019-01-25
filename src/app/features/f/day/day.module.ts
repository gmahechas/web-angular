import { NgModule } from '@angular/core';

import { StoreModule } from '@ngrx/store';
import { reducers, effects } from '@web/app/features/f/day/store';
import { EffectsModule } from '@ngrx/effects';

import { SharedModule } from '@web/app/shared/shared.module';

import * as fromShared from '@web/app/features/f/day/shared';

@NgModule({
  imports: [
    SharedModule,
    StoreModule.forFeature('day', reducers),
    EffectsModule.forFeature(effects),
  ],
  declarations: [
    ...fromShared.shared
  ],
  exports: [
    ...fromShared.shared
  ]
})
export class DayModule { }
