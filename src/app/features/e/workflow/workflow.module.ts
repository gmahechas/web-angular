import { NgModule } from '@angular/core';

import { StoreModule } from '@ngrx/store';
import { reducers, effects } from '@web/app/features/e/workflow/store';
import { EffectsModule } from '@ngrx/effects';

import { SharedModule } from '@web/app/shared/shared.module';
import { WorkflowRoutingModule } from '@web/app/features/e/workflow/workflow-routing.module';

import * as fromContainers from '@web/app/features/e/workflow/containers';
import * as fromComponents from '@web/app/features/e/workflow/components';
import * as fromShared from '@web/app/features/e/workflow/shared';

@NgModule({
  imports: [
    SharedModule,
    WorkflowRoutingModule,
    StoreModule.forFeature('workflow', reducers),
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
export class WorkflowModule { }
