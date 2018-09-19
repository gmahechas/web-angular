import { NgModule } from '@angular/core';

import { StoreModule } from '@ngrx/store';
import { reducers, effects } from './store';
import { EffectsModule } from '@ngrx/effects';

import { SharedModule } from '../../shared/shared.module';
import { ProjectRoutingModule } from './project-routing.module';
import { MacroprojectModule } from './../macroproject/macroproject.module';

import * as fromContainers from './containers';
import * as fromComponents from './components';
import * as fromSharedContainers from './shared/containers';

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
    ...fromSharedContainers.containers
  ],
  exports: [
    ...fromSharedContainers.containers
  ]
})
export class ProjectModule { }
