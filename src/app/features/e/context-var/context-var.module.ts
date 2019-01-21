import { NgModule } from '@angular/core';

import { StoreModule } from '@ngrx/store';
import { reducers, effects } from '@web/app/features/e/context-var/store';
import { EffectsModule } from '@ngrx/effects';

import { SharedModule } from '@web/app/shared/shared.module';
import { ContextVarRoutingModule } from '@web/app/features/e/context-var/context-var-routing.module';

import * as fromShared from '@web/app/features/e/context-var/shared';

@NgModule({
  imports: [
    SharedModule,
    ContextVarRoutingModule,
    StoreModule.forFeature('context_var', reducers),
    EffectsModule.forFeature(effects),
  ],
  declarations: [
    ...fromShared.shared
  ],
  exports: [
    ...fromShared.shared
  ]
})
export class ContextVarModule { }
