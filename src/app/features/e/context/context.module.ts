import { NgModule } from '@angular/core';

import { StoreModule } from '@ngrx/store';
import { reducers, effects } from '@web/app/features/e/context/store';
import { EffectsModule } from '@ngrx/effects';

import { SharedModule } from '@web/app/shared/shared.module';
import { ContextRoutingModule } from '@web/app/features/e/context/context-routing.module';

import * as fromShared from '@web/app/features/e/context/shared';

@NgModule({
  imports: [
    SharedModule,
    ContextRoutingModule,
    StoreModule.forFeature('context', reducers),
    EffectsModule.forFeature(effects),
  ],
  declarations: [
    ...fromShared.shared
  ],
  exports: [
    ...fromShared.shared
  ]
})
export class ContextModule { }
