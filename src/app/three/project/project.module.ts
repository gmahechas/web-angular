import { NgModule } from '@angular/core';

import { StoreModule } from '@ngrx/store';
import { reducers, effects } from '@web/app/three/project/store';
import { EffectsModule } from '@ngrx/effects';

import { SharedModule } from '@web/app/shared/shared.module';
import { ProjectRoutingModule } from '@web/app/three/project/project-routing.module';
import { MacroprojectModule } from '@web/app/three/macroproject/macroproject.module';

import * as fromContainers from '@web/app/three/project/containers';
import * as fromComponents from '@web/app/three/project/components';
import * as fromShared from '@web/app/three/project/shared';

@NgModule({
  imports: [
    SharedModule,
    ProjectRoutingModule,
    StoreModule.forFeature('project', reducers),
    EffectsModule.forFeature(effects),
    MacroprojectModule
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
export class ProjectModule { }
