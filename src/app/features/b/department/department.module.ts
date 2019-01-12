import { NgModule } from '@angular/core';

import { StoreModule } from '@ngrx/store';
import { reducers, effects } from '@web/app/features/b/department/store';
import { EffectsModule } from '@ngrx/effects';

import { SharedModule } from '@web/app/shared/shared.module';
import { DepartmentRoutingModule } from '@web/app/features/b/department/department-routing.module';

import * as fromContainers from '@web/app/features/b/department/containers';
import * as fromComponents from '@web/app/features/b/department/components';
import * as fromShared from '@web/app/features/b/department/shared';

@NgModule({
  imports: [
    SharedModule,
    DepartmentRoutingModule,
    StoreModule.forFeature('department', reducers),
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
export class DepartmentModule { }
