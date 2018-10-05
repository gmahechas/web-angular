import { NgModule } from '@angular/core';

import { StoreModule } from '@ngrx/store';
import { reducers, effects } from '@app/app/three/project/store';
import { EffectsModule } from '@ngrx/effects';

import { SharedModule } from '@app/app/shared/shared.module';
import { ProjectRoutingModule } from '@app/app/three/project/project-routing.module';
import { MacroprojectModule } from '@app/app/three/macroproject/macroproject.module';

import * as fromContainers from '@app/app/three/project/containers';
import * as fromComponents from '@app/app/three/project/components';
import * as fromShared from '@app/app/three/project/shared';

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
